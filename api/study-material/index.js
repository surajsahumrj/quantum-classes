import { getStudyMaterial } from '../_study-material.mjs'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed.' })
  }
  try {
    return response.status(200).json(await getStudyMaterial())
  } catch (error) {
    console.error('Study material API error:', error)
    return response.status(500).json({ error: 'Study material is temporarily unavailable.' })
  }
}
