import 'dotenv/config'
import express from 'express'
import { google } from 'googleapis'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = Number(process.env.PORT || 8787)
const cacheMs = 15 * 60 * 1000
const imageMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
let galleryCache = { expiresAt: 0, data: null }

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

function getDrive() {
  const auth = new google.auth.JWT({
    email: requiredEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
    key: requiredEnv('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })
  return google.drive({ version: 'v3', auth })
}

async function listAllFiles(drive, query, fields) {
  const files = []
  let pageToken
  do {
    const response = await drive.files.list({
      q: query,
      fields: `nextPageToken, files(${fields})`,
      pageSize: 1000,
      pageToken,
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      orderBy: 'name_natural',
    })
    files.push(...(response.data.files || []))
    pageToken = response.data.nextPageToken
  } while (pageToken)
  return files
}

async function loadGallery() {
  const drive = getDrive()
  const rootFolderId = requiredEnv('GOOGLE_DRIVE_ROOT_FOLDER_ID')
  const folders = await listAllFiles(
    drive,
    `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    'id,name',
  )
  const categories = await Promise.all(folders.map(async (folder) => {
    const files = await listAllFiles(
      drive,
      `'${folder.id}' in parents and trashed = false`,
      'id,name,mimeType,thumbnailLink,webContentLink,webViewLink',
    )
    return {
      id: folder.id,
      name: folder.name,
      images: files
        .filter((file) => imageMimeTypes.has(file.mimeType))
        .map((file) => ({
          id: file.id,
          name: file.name,
          thumbnailLink: file.thumbnailLink || null,
          webContentLink: file.webContentLink || null,
          viewLink: file.webViewLink || null,
          src: `/api/gallery/image/${file.id}`,
        })),
    }
  }))
  return { categories, fetchedAt: new Date().toISOString() }
}

app.get('/api/gallery', async (_request, response) => {
  try {
    if (galleryCache.data && galleryCache.expiresAt > Date.now()) {
      return response.json(galleryCache.data)
    }
    const data = await loadGallery()
    galleryCache = { data, expiresAt: Date.now() + cacheMs }
    return response.json(data)
  } catch (error) {
    console.error('Gallery API error:', error)
    return response.status(500).json({ error: 'Gallery is temporarily unavailable.' })
  }
})

app.get('/api/gallery/image/:fileId', async (request, response) => {
  try {
    const drive = getDrive()
    const metadata = await drive.files.get({ fileId: request.params.fileId, fields: 'mimeType,name' })
    if (!imageMimeTypes.has(metadata.data.mimeType)) return response.status(404).end()
    response.setHeader('Cache-Control', 'public, max-age=900, stale-while-revalidate=3600')
    response.setHeader('Content-Type', metadata.data.mimeType)
    const file = await drive.files.get({ fileId: request.params.fileId, alt: 'media' }, { responseType: 'stream' })
    file.data.on('error', () => response.destroy())
    file.data.pipe(response)
  } catch (error) {
    console.error('Gallery image error:', error)
    response.status(404).end()
  }
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist')
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath))
  app.use((_request, response) => response.sendFile(path.join(distPath, 'index.html')))
}

app.listen(port, () => console.log(`Quantum gallery API listening on http://localhost:${port}`))
