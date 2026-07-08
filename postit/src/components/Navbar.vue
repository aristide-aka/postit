<script setup>
</script>

<template>
  <nav class="bg-stone-900 text-white py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
    <RouterLink to="/" class="flex items-center gap-2 font-bold text-lg">
      <span class="inline-block w-3 h-3 rounded-sm bg-amber-400"></span>
      My Postit
    </RouterLink>
    <div class="flex items-center gap-1">
      <RouterLink
        to="/"
        class="text-sm px-3 py-2 leading-none rounded-full hover:bg-stone-700 transition"
        active-class="bg-stone-800 text-amber-400"
      >
        Accueil
      </RouterLink>
      <RouterLink
        :to="{ name: 'ajouter' }"
        class="text-sm px-3 py-2 leading-none rounded-full bg-amber-400 text-stone-900 font-semibold hover:bg-amber-300 transition"
      >
        Ajouter +
      </RouterLink>
    </div>
  </nav>
</template>
