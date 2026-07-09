// API des post-it, adossée à Netlify Blobs (stockage clé/valeur partagé
// entre tous les visiteurs du site, contrairement à IndexedDB qui est
// local à chaque navigateur). Un blob par post-it, clé = id du post-it.
import { getStore } from '@netlify/blobs'

function idFromUrl(req) {
  const { pathname } = new URL(req.url)
  const last = pathname.split('/').filter(Boolean).pop()
  return last && last !== 'postits' ? last : null
}

export default async (req) => {
  const store = getStore('postits')
  const id = idFromUrl(req)

  if (req.method === 'GET' && !id) {
    const { blobs } = await store.list()
    const postits = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    return Response.json(postits.filter(Boolean))
  }

  if (req.method === 'PUT' && id) {
    const postit = await req.json()
    await store.setJSON(id, postit)
    return new Response(null, { status: 204 })
  }

  if (req.method === 'DELETE' && id) {
    await store.delete(id)
    return new Response(null, { status: 204 })
  }

  return new Response('Not found', { status: 404 })
}
