import { google } from 'googleapis'

const cacheMs = 15 * 60 * 1000
let studyMaterialCache = { expiresAt: 0, data: null }

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env: ${name}`)
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

function formatSize(bytes) {
  if (!bytes) return ''
  const n = parseInt(bytes, 10)
  if (isNaN(n)) return ''
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`
  if (n >= 1024) return `${Math.round(n / 1024)} KB`
  return `${n} B`
}

export async function getStudyMaterial() {
  if (studyMaterialCache.data && studyMaterialCache.expiresAt > Date.now()) {
    return studyMaterialCache.data
  }

  const { drive } = getDriveClient()
  const rootFolderId = requiredEnv('GOOGLE_STUDY_MATERIAL_FOLDER_ID')

  // Discover class folders (e.g. "Class 8", "Class 9", ...)
  const classFolders = await listAllFiles(
    drive,
    `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    'id,name',
  )

  const classes = await Promise.all(
    classFolders.map(async (classFolder) => {
      // Discover subject folders within each class
      const subjectFolders = await listAllFiles(
        drive,
        `'${classFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        'id,name',
      )

      const subjects = await Promise.all(
        subjectFolders.map(async (subjectFolder) => {
          // Only PDFs inside each subject folder
          const files = await listAllFiles(
            drive,
            `'${subjectFolder.id}' in parents and mimeType = 'application/pdf' and trashed = false`,
            'id,name,size',
          )

          return {
            id: subjectFolder.id,
            name: subjectFolder.name,
            files: files.map((f) => ({
              id: f.id,
              name: f.name.replace(/\.pdf$/i, '').trim(),
              size: formatSize(f.size),
            })),
          }
        }),
      )

      return {
        id: classFolder.id,
        name: classFolder.name,
        subjects,
      }
    }),
  )

  const data = { classes, fetchedAt: new Date().toISOString() }
  studyMaterialCache = { data, expiresAt: Date.now() + cacheMs }
  return data
}

export async function streamPdf(fileId, response, download = false) {
  console.log(`[study-material/file] fileId=${fileId} download=${download}`)

  const { drive } = getDriveClient()

  // Fetch metadata — verify it is actually a PDF
  let metadata
  try {
    metadata = await drive.files.get({
      fileId,
      fields: 'mimeType,name',
      supportsAllDrives: true,
    })
    console.log(`[study-material/file] metadata ok — name=${metadata.data.name} mimeType=${metadata.data.mimeType}`)
  } catch (err) {
    console.error(`[study-material/file] metadata failed: ${err.message}`)
    response.status(404).end()
    return
  }

  // Reject anything that is not a PDF
  if (metadata.data.mimeType !== 'application/pdf') {
    console.log(`[study-material/file] rejected — not a PDF (mimeType=${metadata.data.mimeType})`)
    response.status(403).end()
    return
  }

  // Download via stream and collect into a Buffer (required for Vercel serverless)
  let streamRes
  try {
    streamRes = await drive.files.get(
      { fileId, alt: 'media', supportsAllDrives: true },
      { responseType: 'stream' },
    )
  } catch (err) {
    console.error(`[study-material/file] Drive download failed: ${err.message}`)
    response.status(502).end()
    return
  }

  const body = await new Promise((resolve, reject) => {
    const chunks = []
    streamRes.data.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    streamRes.data.on('end', () => resolve(Buffer.concat(chunks)))
    streamRes.data.on('error', reject)
  })

  const safeName = (metadata.data.name || 'file.pdf').replace(/[^\w\s.\-]/g, '_')
  const disposition = download
    ? `attachment; filename="${safeName}"`
    : `inline; filename="${safeName}"`

  console.log(`[study-material/file] responding 200 bytes=${body.length} disposition=${disposition}`)

  response.setHeader('Content-Type', 'application/pdf')
  response.setHeader('Content-Disposition', disposition)
  response.setHeader('Cache-Control', 'private, max-age=900')
  response.setHeader('Content-Length', body.length)
  response.status(200).send(body)
}
