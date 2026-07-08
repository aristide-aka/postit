<script setup>
</script>

<template>
  <footer class="bg-stone-900 text-stone-400 py-4 px-4 sm:px-6 mt-16">
    <div class="container mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
      <p>Copyright 2026 &copy; My Postit — All Rights Reserved</p>
      <ul class="flex gap-4">
        <li><RouterLink to="/" class="hover:text-white transition">Accueil</RouterLink></li>
        <li><RouterLink :to="{ name: 'ajouter' }" class="hover:text-white transition">Ajouter un post-it</RouterLink></li>
      </ul>
    </div>
  </footer>
</template>
