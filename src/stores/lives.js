import { defineStore } from 'pinia'
import { ref } from 'vue'

import { api } from '@/api'

export const useLivesStore = defineStore('lives', () => {
  const list = ref([])
  const loading = ref(false)

  const fetchLives = async (professorId) => {
    loading.value = true
    try {
      const { data } = await api.get('/live_sessions', { params: { professorId } })
      list.value = Array.isArray(data)
        ? data
        : [
            {
              id: 1,
              title: 'Live Q&A marché US',
              scheduledAt: '2026-05-02T18:00:00Z',
              meetLink: 'https://meet.google.com/',
            },
          ]
    } catch (error) {
      list.value = [
        {
          id: 1,
          title: 'Live Q&A marché US',
          scheduledAt: '2026-05-02T18:00:00Z',
          meetLink: 'https://meet.google.com/',
        },
      ]
    } finally {
      loading.value = false
    }
  }

  return { list, loading, fetchLives }
})
