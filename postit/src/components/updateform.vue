<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Données
const route = useRoute()
const router = useRouter()
const postits = ref([])
const title = ref('')
const content = ref('')
const editingId = ref(null)

// Charger au démarrage
onMounted(() => {
  const saved = localStorage.getItem('postits')
  if (saved) {
    postits.value = JSON.parse(saved)
    const postit = postits.value.find(p => String(p.id) === String(route.params.id))
    if (postit) {
      title.value = postit.title
      content.value = postit.content
      editingId.value = postit.id
    }
  }
})

// Sauvegarder
const save = () => {
  localStorage.setItem('postits', JSON.stringify(postits.value))
}

// Modifier
const update = () => {
  if (!title.value || !content.value) return
  const index = postits.value.findIndex(p => String(p.id) === String(editingId.value))
  if (index !== -1) {
    postits.value[index] = {
      ...postits.value[index],
      title: title.value,
      content: content.value,
      date: `Modifié le ${new Date().toLocaleString()}`
    }
    
    save()
    router.push('/')
  }
}
</script>

<template>
  <form @submit.prevent="add">
    <div class="w-lg m-auto mt-3">
      <h1 class="text-xl font-bold mb-2">ADD POSTIT +</h1>
      <div class="flex flex-col gap-2">
        <input v-model="title" type="text" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2" placeholder="Entre le Nom" />
        <textarea v-model="content" rows="4" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base block w-full p-3.5" placeholder="Write your thoughts here..."></textarea>
        <div class="flex gap-2">
        <button @click="update" class="bg-gray-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
        <button @click="$router.back()" class="bg-gray-600 text-white px-4 py-2 rounded">
          Annuler
        </button>
      </div>
      </div>
    </div>
  </form>
</template>