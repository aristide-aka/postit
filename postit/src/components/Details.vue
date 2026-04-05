<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const postit = ref(null)

onMounted(() => {
    const saved = localStorage.getItem('postits')
    if (saved) {
        const allPostits = JSON.parse(saved)
        postit.value = allPostits.find(p => String(p.id) === String(route.params.id))
    }
})
// supprimer
const remove = () => {
    if (!postit.value) return
    if (confirm("Supprimer ce postit ?")) {
        const allPostits = JSON.parse(localStorage.getItem('postits'))
        const filtered = allPostits.filter(p => String(p.id) !== String(postit.value.id))
        localStorage.setItem('postits', JSON.stringify(filtered))
        router.push('/')
    }
}
</script>

<template>
    <div class="min-h-screen from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
        <div v-if="postit" class="w-full max-w-2xl lg:max-w-3xl">
            <button @click="$router.back()" class="text-gray-400 hover:text-white mb-4 inline-flex items-center gap-1 transition">
                ← Retour
            </button>
            
            <div class="bg-gray-900 rounded-2xl border border-gray-800 p-6 sm:p-8">
                <h1 class="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 break-words">
                    {{ postit.title }}
                </h1>
                <p class="text-gray-500 text-xs sm:text-sm mb-6">
                    {{ postit.date }}
                </p>
                <div class="border-t border-gray-800 my-6"></div>
                <div class="bg-gray-800/50 rounded-xl p-4 sm:p-6 mb-6">
                    <p class="text-gray-300 text-sm sm:text-base lg:text-lg whitespace-pre-wrap break-words">
                        {{ postit.content }}
                    </p>
                </div>
                <div class="text-gray-500 text-xs sm:text-sm space-y-1">
                    <p>{{ postit.content.length }} caractères</p>
                    <p>{{ postit.id }}</p>
                </div>
                <div class="flex justify-end gap-2 sm:gap-3 mt-6 pt-4 border-t border-gray-800">
                    <button class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-500 transition">
                        <RouterLink :to="{ name: 'modifier', params: { id: postit.id } }">
                        Modifier
                        </RouterLink>
                    </button>
                    <button @click="remove(postit.id)" class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-500 transition">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>