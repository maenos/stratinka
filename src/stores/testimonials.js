import { defineStore } from 'pinia'
import { ref } from 'vue'

import { api } from '@/api'

export const useTestimonialStore = defineStore('testimonials', () => {
  const loading = ref(false)

  const submit = async (payload) => {
    loading.value = true
    try {
      const { data } = await api.post('/testimonials', payload)
      return data
    } finally {
      loading.value = false
    }
  }

  return { loading, submit }
})
