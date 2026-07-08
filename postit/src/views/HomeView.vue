<script setup>
import Card from '../components/card.vue'
import { usePostits } from '../composables/usePostits'

const isDev = import.meta.env.DEV
const { seedFakePostits } = usePostits()
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div v-if="isDev" class="mb-4 flex justify-end">
      <button
        type="button"
        @click="seedFakePostits(100)"
        class="text-xs px-3 py-1.5 rounded-md border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700 transition"
      >
        [dev] Générer 100 post-it fictifs
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <Card />
    </div>
  </div>
</template>
