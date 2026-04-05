<script setup>
import { ref, onMounted } from 'vue'

// Données
const postits = ref([])
const title = ref('')
const content = ref('')

// Charger au démarrage
onMounted(() => {
  const saved = localStorage.getItem('postits')
  if (saved) postits.value = JSON.parse(saved)
})

// Sauvegarder
const save = () => {
  localStorage.setItem('postits', JSON.stringify(postits.value))
}

// Ajouter
const add = () => {
  if (!title.value || !content.value) return
  postits.value.unshift({
    id: Date.now(),
    title: title.value,
    content: content.value,
    date: new Date().toLocaleString()
  })
  save()
  title.value = ''
  content.value = ''
}

// Supprimer
const remove = (id) => {
  postits.value = postits.value.filter(p => p.id !== id)
  save()
}
</script>

<template>
  <form @submit.prevent="add">
    <div class="w-lg m-auto mt-3">
      <h1 class="text-xl font-bold mb-2">ADD POSTIT +</h1>
      <div class="flex flex-col gap-2">
        <input v-model="title" type="text" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2" placeholder="Entre le Nom" />
        <textarea v-model="content" rows="4" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base block w-full p-3.5" placeholder="Write your thoughts here..."></textarea>
        <button type="submit" class="rounded bg-slate-800 py-1 px-2.5 text-sm text-white">Ajouter</button>
      </div>
    </div>
  </form>
</template>