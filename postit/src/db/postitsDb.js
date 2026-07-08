// Accès bas niveau à IndexedDB pour les post-it.
// IndexedDB est une vraie base de données transactionnelle du navigateur
// (contrairement à localStorage qui n'est qu'un stockage clé/valeur synchrone).

const DB_NAME = 'postit-db'
const DB_VERSION = 1
const STORE_NAME = 'postits'

let dbPromise = null

function openDb() {
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  return dbPromise
}

function runTransaction(mode, executor) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode)
        const store = tx.objectStore(STORE_NAME)
        let result

        try {
          const request = executor(store)
          if (request) request.onsuccess = () => (result = request.result)
        } catch (err) {
          reject(err)
          return
        }

        tx.oncomplete = () => resolve(result)
        tx.onerror = () => reject(tx.error)
        tx.onabort = () => reject(tx.error)
      }),
  )
}

export function getAllPostits() {
  return runTransaction('readonly', (store) => store.getAll())
}

export function putPostit(postit) {
  return runTransaction('readwrite', (store) => store.put(postit))
}

export function deletePostit(id) {
  return runTransaction('readwrite', (store) => store.delete(id))
}
