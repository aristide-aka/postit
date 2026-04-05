<script setup>
import { ref, onMounted } from 'vue'

// Données
const postits = ref([])

// Charger au démarrage
onMounted(() => {
  const saved = localStorage.getItem('postits')
  if (saved) postits.value = JSON.parse(saved)
})
</script>


<template>        
         <div 
            v-for="postit in postits" 
            :key="postit.id"
            class="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-24">
            <div class="my-4">
                <h2 class="text-white text-2xl font-bold pb-2"> {{ postit.title }} </h2>
                <p class="text-gray-300 py-1"> {{ postit.content }}</p>
                 <p v-if="postit.date" class="text-gray-500 text-xs mt-2">{{ postit.date }}</p>
            </div>

            <div class="flex justify-end">
                <button class="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800">
                    <RouterLink :to="{ name: 'detail', params: { id: postit.id } }">
                        Voir
                    </RouterLink>
                </button>
            </div>
        </div>
</template>