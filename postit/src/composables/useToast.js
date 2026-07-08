import { reactive } from 'vue'

const state = reactive({
  message: '',
  type: 'success', // 'success' | 'error'
  visible: false,
})

let timer = null

function show(message, type = 'success', duration = 3000) {
  state.message = message
  state.type = type
  state.visible = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    state.visible = false
  }, duration)
}

export function useToast() {
  return { state, show }
}
