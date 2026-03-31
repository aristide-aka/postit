
<script setup>
</script>

<template>
 
<form>
    <div class="w-lg m-auto mt-3">
    <h1 class=" text-xl font-bold mb-2">ADD POSTIT +</h1>
    <div class="flex flex-col gap-2">
        <input type="text" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Entre le Nom" />
        <textarea id="message" rows="4" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Write your thoughts here..."></textarea>
        <button
        class="rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        >
        Ajouter
        </button>
    </div>
</div>
</form>
</template>
