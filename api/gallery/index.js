import { getGallery } from '../_gallery.mjs'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed.' })
  }
  try {
    return response.status(200).json(await getGallery())
  } catch (error) {
    console.error('Gallery API error:', error)
    return response.status(500).json({ error: 'Gallery is temporarily unavailable.' })
  }
}
