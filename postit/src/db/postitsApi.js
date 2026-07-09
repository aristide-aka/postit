// Accès aux post-it via l'API Netlify Functions (backée par Netlify Blobs).
// Remplace l'ancien stockage IndexedDB : les données sont désormais
// partagées entre tous les visiteurs du site, pas propres à un navigateur.

const API_BASE = '/api/postits'

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, options)
  if (!res.ok) {
    throw new Error(`Erreur API post-it (${res.status})`)
  }
  return res
}

export async function getAllPostits() {
  const res = await request('')
  return res.json()
}

export async function putPostit(postit) {
  await request(`/${postit.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postit),
  })
  return postit
}

export async function deletePostit(id) {
  await request(`/${id}`, { method: 'DELETE' })
}
