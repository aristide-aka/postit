<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostits } from '../composables/usePostits'
import { useToast } from '../composables/useToast'

const route = useRoute()
const router = useRouter()
const { state, getById, updatePostit } = usePostits()
const { show } = useToast()

const title = ref('')
const content = ref('')
const submitting = ref(false)
const notFound = ref(false)

function loadPostit() {
  const postit = getById(route.params.id)
  if (postit) {
    title.value = postit.title
    content.value = postit.content
    notFound.value = false
  } else if (state.ready) {
    notFound.value = true
  }
}

onMounted(loadPostit)
// Les données arrivent de façon asynchrone depuis IndexedDB : on réessaie
// de préremplir le formulaire dès que le store est prêt.
watch(() => state.ready, loadPostit)

const update = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    show('Merci de remplir tous les champs.', 'error')
    return
  }

  submitting.value = true
  try {
    await updatePostit(route.params.id, title.value, content.value)
    show('Post-it modifié avec succès !')
    router.push('/')
  } catch (err) {
    console.error(err)
    show('Impossible de modifier le post-it.', 'error')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="update" class="w-full max-w-lg mx-auto mt-8 px-4">
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <h1 class="text-xl font-bold text-stone-800 mb-6">Modifier le post-it</h1>

      <p v-if="notFound" class="text-sm text-stone-500">Ce post-it est introuvable.</p>

      <div v-else class="flex flex-col gap-4">
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

        <div class="flex gap-2">
          <button
            type="submit"
            :disabled="submitting"
            class="rounded-md bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold text-stone-900 transition"
          >
            {{ submitting ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
          <button
            type="button"
            @click="router.back()"
            class="rounded-md bg-stone-200 hover:bg-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
