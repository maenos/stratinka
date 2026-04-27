import { defineStore } from 'pinia'
import { ref } from 'vue'

import { api } from '@/api'

export const useBooksStore = defineStore('books', () => {
  const list = ref([])
  const loading = ref(false)

  const fetchBooks = async () => {
    loading.value = true
    try {
      const { data } = await api.get('/books')
      list.value = Array.isArray(data)
        ? data
        : [{ id: 1, title: 'Ebook Trading', coverImage: 'https://picsum.photos/seed/book/600/800' }]
    } catch (error) {
      list.value = [{ id: 1, title: 'Ebook Trading', coverImage: 'https://picsum.photos/seed/book/600/800' }]
    } finally {
      loading.value = false
    }
  }

  return { list, loading, fetchBooks }
})
