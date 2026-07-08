const COLORS = [
  { bg: 'bg-yellow-200', accent: 'bg-yellow-300' },
  { bg: 'bg-pink-200', accent: 'bg-pink-300' },
  { bg: 'bg-sky-200', accent: 'bg-sky-300' },
  { bg: 'bg-green-200', accent: 'bg-green-300' },
  { bg: 'bg-orange-200', accent: 'bg-orange-300' },
  { bg: 'bg-purple-200', accent: 'bg-purple-300' },
]

const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']

// Hash simple et stable pour dériver une couleur/rotation d'un id,
// afin qu'un post-it garde toujours le même style, quelle que soit sa position dans la liste.
function hashId(id) {
  const str = String(id)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function colorForId(id) {
  return COLORS[hashId(id) % COLORS.length]
}

export function rotationForId(id) {
  return ROTATIONS[hashId(id) % ROTATIONS.length]
}
