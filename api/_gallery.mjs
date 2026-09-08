import { google } from 'googleapis'

const cacheMs = 15 * 60 * 1000
const imageMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
let galleryCache = { expiresAt: 0, data: null }

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

function getDrive() {
  return google.drive({
    version: 'v3',
    auth: new google.auth.JWT({
      email: requiredEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
      key: requiredEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    }),
  })
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
  const drive = getDrive()
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
      'id,name,mimeType',
    )
    return {
      id: folder.id,
      name: folder.name,
      images: files
        .filter((file) => imageMimeTypes.has(file.mimeType))
        .map((file) => ({ id: file.id, name: file.name, src: `/api/gallery/image/${file.id}` })),
    }
  }))
  const data = { categories, fetchedAt: new Date().toISOString() }
  galleryCache = { data, expiresAt: Date.now() + cacheMs }
  return data
}

export async function streamImage(fileId, response) {
  const drive = getDrive()
  const metadata = await drive.files.get({ fileId, fields: 'mimeType,name' })
  if (!imageMimeTypes.has(metadata.data.mimeType)) {
    response.status(404).end()
    return
  }
  response.setHeader('Cache-Control', 'public, max-age=900, stale-while-revalidate=3600')
  response.setHeader('Content-Type', metadata.data.mimeType)
  const file = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' })
  file.data.on('error', () => response.destroy())
  file.data.pipe(response)
}
