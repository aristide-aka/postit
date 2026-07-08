<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostits } from '../composables/usePostits'
import { colorForId, rotationForId } from '../utils/postitStyle'
import Pagination from './Pagination.vue'

const PAGE_SIZE = 12

const route = useRoute()
const router = useRouter()
const { state } = usePostits()

const currentPage = computed({
  get() {
    const page = Number(route.query.page)
    return Number.isInteger(page) && page > 0 ? page : 1
  },
  set(page) {
    router.push({ query: { ...route.query, page: page > 1 ? page : undefined } })
  },
})

const totalPages = computed(() => Math.max(1, Math.ceil(state.postits.length / PAGE_SIZE)))

const paginatedPostits = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return state.postits.slice(start, start + PAGE_SIZE)
})

// Si on supprime des post-it et que la page courante n'existe plus, on revient à la dernière page valide.
watch(totalPages, (total) => {
  if (currentPage.value > total) currentPage.value = total
})
</script>

<template>
  <div v-if="state.loading && !state.postits.length" class="col-span-full text-center text-stone-400 py-16">
    Chargement des post-it...
  </div>

  <div v-else-if="state.error" class="col-span-full text-center text-red-500 py-16">
    {{ state.error }}
  </div>

  <div
    v-else-if="!state.postits.length"
    class="col-span-full flex flex-col items-center gap-4 border-2 border-dashed border-stone-300 rounded-2xl py-16 text-stone-500"
  >
    <p>Aucun post-it pour l'instant.</p>
    <RouterLink
      :to="{ name: 'ajouter' }"
      class="rounded-md bg-amber-400 hover:bg-amber-300 px-4 py-2 text-sm font-semibold text-stone-900 transition"
    >
      Ajouter mon premier post-it
    </RouterLink>
  </div>

  <template v-else>
    <RouterLink
      v-for="postit in paginatedPostits"
      :key="postit.id"
      :to="{ name: 'detail', params: { id: postit.id } }"
      class="block p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 hover:rotate-0 transition-all duration-200"
      :class="[colorForId(postit.id).bg, rotationForId(postit.id)]"
    >
      <h2 class="text-stone-900 text-lg font-bold pb-2 break-words line-clamp-2">{{ postit.title }}</h2>
      <p class="text-stone-800/80 text-sm py-1 line-clamp-4 whitespace-pre-wrap break-words">{{ postit.content }}</p>
      <p class="text-stone-700/60 text-xs mt-3">
        {{ new Date(postit.updatedAt ?? postit.createdAt).toLocaleString() }}
      </p>
    </RouterLink>

    <div class="col-span-full flex flex-col items-center gap-2 mt-4">
      <Pagination v-model:current-page="currentPage" :total-pages="totalPages" />
      <p class="text-xs text-stone-400">{{ state.postits.length }} post-it au total</p>
    </div>
  </template>
</template>
