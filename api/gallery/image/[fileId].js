import { streamImage } from '../../_gallery.mjs'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).end()
  }
  try {
    return await streamImage(request.query.fileId, response)
  } catch (error) {
    console.error('Gallery image error:', error)
    return response.status(404).end()
  }
}
