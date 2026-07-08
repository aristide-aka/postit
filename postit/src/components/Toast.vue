<script setup>
import { useToast } from '../composables/useToast'

const { state } = useToast()
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="state.visible"
      class="fixed top-4 right-4 z-50 max-w-xs rounded-lg px-4 py-3 text-sm font-medium shadow-lg"
      :class="
        state.type === 'error'
          ? 'bg-red-100 text-red-800 border border-red-200'
          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
      "
      role="status"
    >
      {{ state.message }}
    </div>
  </Transition>
</template>
