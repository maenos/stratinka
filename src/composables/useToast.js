import { reactive, readonly } from 'vue'

const state = reactive({
  items: [],
})

let seed = 0

export function useToast() {
  const push = ({ title, message, tone = 'info', timeout = 3200 }) => {
    const id = ++seed
    state.items.push({ id, title, message, tone })
    if (timeout > 0) {
      window.setTimeout(() => remove(id), timeout)
    }
  }

  const remove = (id) => {
    const index = state.items.findIndex((item) => item.id === id)
    if (index >= 0) {
      state.items.splice(index, 1)
    }
  }

  return {
    items: readonly(state.items),
    push,
    remove,
  }
}
