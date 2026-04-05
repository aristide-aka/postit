<script setup>
import { ref, onMounted } from 'vue'

// Données
const postits = ref([])
const title = ref('')
const content = ref('')
const showMessage = ref(false)
const messageText = ref('')

// Charger au démarrage
onMounted(() => {
  const saved = localStorage.getItem('postits')
  if (saved) postits.value = JSON.parse(saved)
})

// Sauvegarder
const save = () => {
  localStorage.setItem('postits', JSON.stringify(postits.value))
}

const AddMessage = (title) => {
  showMessage.value = true
  messageText.value = `Postit "${title}" ajouté avec succès !`
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}

// Ajouter
const add = () => {
  if (!title.value || !content.value){
    alert("remplissez tous les champs")
    return
  }
  postits.value.unshift({
    id: Date.now(),
    title: title.value,
    content: content.value,
    date: new Date().toLocaleString()
  })
  save()
  title.value = ''
  content.value = ''
  showMessage.value = true
  AddMessage(title.value)
}

</script>

<template>
      <div 
      v-if="showMessage"
      class="rounded-lg shadow-lg bg-green-200 text-slate-700 font-semibold animate-fade-in flex justify-center"
    >
      {{ messageText}}
    </div>
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