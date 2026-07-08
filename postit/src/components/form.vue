<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostits } from '../composables/usePostits'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { addPostit } = usePostits()
const { show } = useToast()

const title = ref('')
const content = ref('')
const submitting = ref(false)

const add = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    show('Merci de remplir tous les champs.', 'error')
    return
  }

  submitting.value = true
  try {
    const postit = await addPostit(title.value, content.value)
    title.value = ''
    content.value = ''
    show(`Post-it "${postit.title}" ajouté avec succès !`)
    router.push('/')
  } catch (err) {
    console.error(err)
    show("Impossible d'enregistrer le post-it.", 'error')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="add" class="w-full max-w-lg mx-auto mt-8 px-4">
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <h1 class="text-xl font-bold text-stone-800 mb-6">Nouveau post-it</h1>

      <div class="flex flex-col gap-4">
        <div>
          <label for="postit-title" class="block text-sm font-medium text-stone-600 mb-1">Titre</label>
          <input
            id="postit-title"
            v-model="title"
            type="text"
            class="w-full bg-stone-50 placeholder:text-stone-400 text-stone-800 text-sm border border-stone-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="Titre du post-it"
          />
        </div>

        <div>
          <label for="postit-content" class="block text-sm font-medium text-stone-600 mb-1">Contenu</label>
          <textarea
            id="postit-content"
            v-model="content"
            rows="5"
            class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-md p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="Écris ton idée ici..."
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="rounded-md bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed py-2 px-4 text-sm font-semibold text-stone-900 transition"
        >
          {{ submitting ? 'Ajout...' : 'Ajouter le post-it' }}
        </button>
      </div>
    </div>
  </form>
</template>
