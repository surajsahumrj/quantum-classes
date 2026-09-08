import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getGallery, streamImage } from '../api/_gallery.mjs'

const app = express()
const port = Number(process.env.PORT || 8787)

app.get('/api/gallery', async (_request, response) => {
  try {
    return response.status(200).json(await getGallery())
  } catch (error) {
    console.error('Gallery API error:', error)
    return response.status(500).json({ error: 'Gallery is temporarily unavailable.' })
  }
})

app.get('/api/gallery/image/:fileId', async (request, response) => {
  try {
    return await streamImage(request.params.fileId, response, request.query.preview === '1')
  } catch (error) {
    console.error('Gallery image error:', error)
    return response.status(404).end()
  }
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist')
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath))
  app.use((_request, response) => response.sendFile(path.join(distPath, 'index.html')))
}

app.listen(port, () => console.log(`Quantum gallery API listening on http://localhost:${port}`))
