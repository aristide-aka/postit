<script setup>
import NavBar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-stone-100 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] bg-[length:20px_20px]">
    <header>
      <NavBar />
    </header>
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <Toast />
  </div>
</template>
