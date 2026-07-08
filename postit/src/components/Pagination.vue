<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['update:currentPage'])

function go(page) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('update:currentPage', page)
}

// Construit la liste des numéros de page à afficher, avec des "..."
// pour ne pas afficher 100 boutons quand il y a beaucoup de pages.
const pages = computed(() => {
  const { totalPages: total, currentPage: current } = props
  const range = []
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      range.push(i)
    } else if (range[range.length - 1] !== '…') {
      range.push('…')
    }
  }
  return range
})
</script>

<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-1 flex-wrap" aria-label="Pagination">
    <button
      type="button"
      :disabled="currentPage === 1"
      @click="go(currentPage - 1)"
      class="w-9 h-9 rounded-md text-sm font-medium bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      aria-label="Page précédente"
    >
      ‹
    </button>

    <template v-for="(p, i) in pages" :key="i">
      <span v-if="p === '…'" class="w-9 h-9 flex items-center justify-center text-stone-400 text-sm">…</span>
      <button
        v-else
        type="button"
        @click="go(p)"
        class="w-9 h-9 rounded-md text-sm font-medium transition"
        :class="
          p === currentPage
            ? 'bg-stone-800 text-white'
            : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
        "
        :aria-current="p === currentPage ? 'page' : undefined"
      >
        {{ p }}
      </button>
    </template>

    <button
      type="button"
      :disabled="currentPage === totalPages"
      @click="go(currentPage + 1)"
      class="w-9 h-9 rounded-md text-sm font-medium bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      aria-label="Page suivante"
    >
      ›
    </button>
  </nav>
</template>
