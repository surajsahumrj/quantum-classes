import { google } from 'googleapis'

const cacheMs = 15 * 60 * 1000
const imageMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'])
let galleryCache = { expiresAt: 0, data: null }

const mimeFromExtension = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
}

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

function getDriveClient() {
  const auth = new google.auth.JWT({
    email: requiredEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
    key: requiredEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })
  return { auth, drive: google.drive({ version: 'v3', auth }) }
}

function isSupportedImage(file) {
  const extension = file.name ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase() : ''
  return imageMimeTypes.has(file.mimeType) || imageExtensions.has(extension)
}

function resolvedMimeType(file) {
  if (file.mimeType && imageMimeTypes.has(file.mimeType)) return file.mimeType
  const extension = file.name ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase() : ''
  return mimeFromExtension[extension] || 'image/jpeg'
}

function isHeic(mimeType) {
  return mimeType === 'image/heic' || mimeType === 'image/heif'
}

async function listAllFiles(drive, query, fields) {
  const files = []
  let pageToken
  do {
    const result = await drive.files.list({
      q: query,
      fields: `nextPageToken, files(${fields})`,
      pageSize: 1000,
      pageToken,
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      orderBy: 'name_natural',
    })
    files.push(...(result.data.files || []))
    pageToken = result.data.nextPageToken
  } while (pageToken)
  return files
}

export async function getGallery() {
  if (galleryCache.data && galleryCache.expiresAt > Date.now()) return galleryCache.data
  const { drive } = getDriveClient()
  const rootFolderId = requiredEnv('GOOGLE_DRIVE_FOLDER_ID')
  const folders = await listAllFiles(
    drive,
    `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    'id,name',
  )
  const categories = await Promise.all(folders.map(async (folder) => {
    const files = await listAllFiles(
      drive,
      `'${folder.id}' in parents and trashed = false`,
      'id,name,mimeType,thumbnailLink',
    )
    return {
      id: folder.id,
      name: folder.name,
      images: files
        .filter(isSupportedImage)
        .map((file) => ({ id: file.id, name: file.name, src: `/api/gallery/image/${file.id}` })),
    }
  }))
  const data = { categories, fetchedAt: new Date().toISOString() }
  galleryCache = { data, expiresAt: Date.now() + cacheMs }
  return data
}

export async function streamImage(fileId, response, preview = false) {
  // --- Safe logging: never log credentials or tokens ---
  console.log(`[gallery/image] fileId=${fileId} preview=${preview}`)

  const { drive } = getDriveClient()

  // Fetch metadata to determine MIME type
  let metadata
  try {
    metadata = await drive.files.get({
      fileId,
      fields: 'mimeType,name,thumbnailLink',
      supportsAllDrives: true,
    })
    console.log(`[gallery/image] metadata ok — name=${metadata.data.name} mimeType=${metadata.data.mimeType}`)
  } catch (err) {
    console.error(`[gallery/image] metadata request failed: ${err.message}`)
    response.status(404).end()
    return
  }

  if (!isSupportedImage(metadata.data)) {
    console.log(`[gallery/image] unsupported format — rejecting`)
    response.status(404).end()
    return
  }

  const detectedMime = resolvedMimeType(metadata.data)
  console.log(`[gallery/image] detectedMime=${detectedMime}`)

  let body
  let contentType

  if (isHeic(detectedMime) || preview) {
    // --- HEIC / HEIF: use Google's thumbnail URL (public, no auth needed) ---
    const thumbnailLink = metadata.data.thumbnailLink
    if (!thumbnailLink) {
      console.error(`[gallery/image] no thumbnailLink available for HEIC file`)
      response.status(404).end()
      return
    }
    // Scale up thumbnail quality for full view, keep smaller for grid
    const thumbnailUrl = preview
      ? thumbnailLink.replace(/=s\d+$/, '=s1600')
      : thumbnailLink.replace(/=s\d+$/, '=s800')

    // NOTE: thumbnailLink is a pre-signed Google URL — do NOT send auth headers
    let thumbnailRes
    try {
      thumbnailRes = await fetch(thumbnailUrl)
    } catch (err) {
      console.error(`[gallery/image] thumbnail fetch failed: ${err.message}`)
      response.status(502).end()
      return
    }

    if (!thumbnailRes.ok) {
      console.error(`[gallery/image] thumbnail fetch status=${thumbnailRes.status}`)
      response.status(502).end()
      return
    }

    body = Buffer.from(await thumbnailRes.arrayBuffer())
    contentType = thumbnailRes.headers.get('content-type') || 'image/jpeg'
    console.log(`[gallery/image] thumbnail ok — contentType=${contentType} bytes=${body.length}`)
  } else {
    // --- JPG / PNG / WEBP: download raw binary via Drive API ---
    let streamRes
    try {
      streamRes = await drive.files.get(
        { fileId, alt: 'media', supportsAllDrives: true },
        { responseType: 'stream' },
      )
    } catch (err) {
      console.error(`[gallery/image] Drive download failed: ${err.message}`)
      response.status(502).end()
      return
    }

    // Collect stream chunks into a Buffer — required for Vercel serverless
    body = await new Promise((resolve, reject) => {
      const chunks = []
      streamRes.data.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      streamRes.data.on('end', () => resolve(Buffer.concat(chunks)))
      streamRes.data.on('error', reject)
    })

    contentType = detectedMime
    console.log(`[gallery/image] download ok — contentType=${contentType} bytes=${body.length}`)
  }

  response.setHeader('Cache-Control', 'public, max-age=900, stale-while-revalidate=3600')
  response.setHeader('Content-Type', contentType)
  response.setHeader('Content-Length', body.length)
  console.log(`[gallery/image] responding 200 Content-Type=${contentType}`)
  response.status(200).send(body)
}
