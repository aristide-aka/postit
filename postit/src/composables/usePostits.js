import { reactive } from 'vue'
import { getAllPostits, putPostit, deletePostit } from '../db/postitsApi'

// État partagé (singleton) : tous les composants lisent/écrivent
// la même source de vérité au lieu de dupliquer la logique de persistance.
const state = reactive({
  postits: [],
  loading: false,
  error: null,
  ready: false,
})

let readyPromise = null

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function sortByDateDesc(list) {
  return [...list].sort((a, b) => (b.updatedAt ?? b.createdAt) - (a.updatedAt ?? a.createdAt))
}

// Reprend les données existantes d'une ancienne version basée sur localStorage,
// pour ne pas perdre les post-it déjà créés par l'utilisateur.
async function migrateLegacyData() {
  const legacy = localStorage.getItem('postits')
  if (!legacy) return

  try {
    const parsed = JSON.parse(legacy)
    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        const createdAt = Number(item.id) || Date.now()
        await putPostit({
          id: generateId(),
          title: String(item.title ?? ''),
          content: String(item.content ?? ''),
          createdAt,
          updatedAt: null,
        })
      }
    }
  } catch (err) {
    console.error('Migration localStorage -> IndexedDB impossible :', err)
  } finally {
    localStorage.removeItem('postits')
  }
}

async function refresh() {
  state.loading = true
  state.error = null
  try {
    const all = await getAllPostits()
    state.postits = sortByDateDesc(all)
  } catch (err) {
    console.error(err)
    state.error = 'Impossible de charger les post-it depuis la base locale.'
  } finally {
    state.loading = false
  }
}

function ensureReady() {
  if (!readyPromise) {
    readyPromise = migrateLegacyData()
      .then(refresh)
      .then(() => {
        state.ready = true
      })
  }
  return readyPromise
}

async function addPostit(title, content) {
  const postit = {
    id: generateId(),
    title: title.trim(),
    content: content.trim(),
    createdAt: Date.now(),
    updatedAt: null,
  }
  await putPostit(postit)
  await refresh()
  return postit
}

async function updatePostit(id, title, content) {
  const existing = state.postits.find((p) => String(p.id) === String(id))
  if (!existing) return null

  const updated = {
    ...existing,
    title: title.trim(),
    content: content.trim(),
    updatedAt: Date.now(),
  }
  await putPostit(updated)
  await refresh()
  return updated
}

async function removePostit(id) {
  await deletePostit(id)
  await refresh()
}

function getById(id) {
  return state.postits.find((p) => String(p.id) === String(id)) ?? null
}

const FAKE_TITLES = [
  'Idée de projet',
  'Liste de courses',
  'Rappel important',
  'Citation du jour',
  'Note de réunion',
  'Anniversaire à ne pas oublier',
  'Recette à essayer',
  'Livre à lire',
  'Film à voir',
  'Tâche urgente',
  'Pense-bête',
  'Objectif du mois',
]

const FAKE_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua',
]

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomSentence(minWords, maxWords) {
  const count = minWords + Math.floor(Math.random() * (maxWords - minWords))
  return Array.from({ length: count }, () => randomFrom(FAKE_WORDS)).join(' ')
}

// Utilitaire de développement pour peupler la base avec des post-it fictifs
// et pouvoir tester la pagination sans les créer un par un.
async function seedFakePostits(count = 100) {
  const now = Date.now()
  for (let i = 0; i < count; i++) {
    await putPostit({
      id: generateId(),
      title: `${randomFrom(FAKE_TITLES)} #${i + 1}`,
      content: randomSentence(6, 25),
      createdAt: now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    })
  }
  await refresh()
}

export function usePostits() {
  ensureReady()
  return { state, addPostit, updatePostit, removePostit, getById, refresh, seedFakePostits }
}
