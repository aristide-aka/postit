<script setup>
import NavBar from '../components/Navbar.vue';
import Form from '../components/form.vue';
import Footer from '../components/Footer.vue';
import Card from '../components/card.vue';
</script>

<template>
	<div class="container mx-auto px-4">
		<div class="text-sm px-4 py-2 leading-none rounded-full hover:text-gray-800"><RouterLink to="/a-propos">Add Postit +</RouterLink></div>
		<div class="grid grid-cols-6 gap-4">
			<Card/>
    	</div>
	</div>
	
</template>