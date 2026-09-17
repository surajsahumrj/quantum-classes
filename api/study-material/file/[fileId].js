import { streamPdf } from '../../_study-material.mjs'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).end()
  }
  try {
    const download = request.query.download === '1'
    return await streamPdf(request.query.fileId, response, download)
  } catch (error) {
    console.error('Study material file error:', error)
    return response.status(404).end()
  }
}
