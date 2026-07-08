<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostits } from '../composables/usePostits'
import { useToast } from '../composables/useToast'
import { colorForId } from '../utils/postitStyle'

const route = useRoute()
const router = useRouter()
const { state, getById, removePostit } = usePostits()
const { show } = useToast()

const postit = computed(() => getById(route.params.id))
const color = computed(() => (postit.value ? colorForId(postit.value.id) : null))

const remove = async () => {
  if (!postit.value) return
  if (!confirm('Supprimer ce post-it ?')) return

  try {
    await removePostit(postit.value.id)
    show('Post-it supprimé.')
    router.push('/')
  } catch (err) {
    console.error(err)
    show('Impossible de supprimer le post-it.', 'error')
  }
}
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center p-4">
    <div v-if="!state.ready" class="text-stone-400">Chargement...</div>

    <div v-else-if="!postit" class="text-center">
      <p class="text-stone-500 mb-4">Ce post-it est introuvable.</p>
      <RouterLink to="/" class="text-amber-600 hover:text-amber-500 font-medium">← Retour à l'accueil</RouterLink>
    </div>

    <div v-else class="w-full max-w-2xl lg:max-w-3xl py-6">
      <button
        type="button"
        @click="router.back()"
        class="text-stone-500 hover:text-stone-800 mb-4 inline-flex items-center gap-1.5 transition text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Retour
      </button>

      <div class="relative rounded-2xl shadow-lg p-6 sm:p-10 overflow-hidden" :class="color.bg">
        <!-- coin qui se décolle, pour l'effet "vrai post-it" -->
        <div
          class="absolute top-0 right-0 w-10 h-10 bg-white/50 shadow-md"
          style="clip-path: polygon(100% 0, 0 0, 100% 100%)"
        ></div>

        <h1 class="text-stone-900 text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 break-words pr-8">
          {{ postit.title }}
        </h1>

        <p class="text-stone-700/70 text-xs sm:text-sm mb-6 inline-flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          {{ postit.updatedAt ? 'Modifié le ' : 'Créé le ' }}{{ new Date(postit.updatedAt ?? postit.createdAt).toLocaleString() }}
        </p>

        <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 border border-black/5">
          <p class="text-stone-800 text-sm sm:text-base lg:text-lg whitespace-pre-wrap break-words">
            {{ postit.content }}
          </p>
        </div>

        <p class="text-stone-700/60 text-xs sm:text-sm">{{ postit.content.length }} caractères</p>

        <div class="flex justify-end gap-2 sm:gap-3 mt-6 pt-4 border-t border-black/10">
          <RouterLink
            :to="{ name: 'modifier', params: { id: postit.id } }"
            class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Modifier
          </RouterLink>
          <button
            type="button"
            @click="remove"
            class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-500 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
            </svg>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
