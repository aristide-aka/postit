<script setup>
</script>

<template>
<nav class="bg-gray-800 text-white py-3 px-4 flex items-center justify-between">
    <div class="text-sm px-4 py-2 leading-none rounded-full"><RouterLink to="/">My Postit</RouterLink></div>
    <div class="flex items-center">
        <div class="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"><RouterLink to="/">Accueil</RouterLink></div>
        <div class="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"><RouterLink to="/a-propos">Add Postit +</RouterLink></div>
    </div>
</nav>
</template>
