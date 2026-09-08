import { google } from 'googleapis'

const cacheMs = 15 * 60 * 1000
const imageMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'])
let galleryCache = { expiresAt: 0, data: null }

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
  const { auth, drive } = getDriveClient()
  const metadata = await drive.files.get({ fileId, fields: 'mimeType,name,thumbnailLink' })
  if (!isSupportedImage(metadata.data)) {
    response.status(404).end()
    return
  }
  let body
  let contentType = metadata.data.mimeType
  if (metadata.data.mimeType === 'image/heic' || metadata.data.mimeType === 'image/heif' || preview) {
    if (!metadata.data.thumbnailLink) {
      response.status(404).end()
      return
    }
    const thumbnailUrl = preview ? metadata.data.thumbnailLink.replace(/=s\d+$/, '=s1600') : metadata.data.thumbnailLink
    const thumbnail = await fetch(thumbnailUrl, { headers: await auth.getRequestHeaders() })
    if (!thumbnail.ok) throw new Error(`Drive thumbnail request failed: ${thumbnail.status}`)
    body = Buffer.from(await thumbnail.arrayBuffer())
    contentType = thumbnail.headers.get('content-type') || 'image/jpeg'
  } else {
    const file = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' })
    body = Buffer.from(file.data)
  }
  response.setHeader('Cache-Control', 'public, max-age=900, stale-while-revalidate=3600')
  response.setHeader('Content-Type', contentType)
  response.setHeader('Content-Length', body.length)
  response.status(200).send(body)
}
