import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useNewsletterStore = defineStore('newsletters', () => {
  const newsletters = ref([])
  const currentNewsletter = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockNewsletters = [
    { id: 1, subject: 'Nouveautés de la semaine', status: 'sent', sentAt: '2023-11-01T10:00:00Z' },
    { id: 2, subject: 'Promotion Black Friday', status: 'draft', sentAt: null },
  ]

  async function fetchNewsletters() {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const response = await api.get('/newsletters')
      // newsletters.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      newsletters.value = mockNewsletters
    } catch (err) {
      error.value = 'Erreur lors du chargement des newsletters'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchNewsletterById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/newsletters/${id}`)
      // currentNewsletter.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentNewsletter.value = mockNewsletters.find((n) => n.id === Number(id)) || null
    } catch (err) {
      error.value = 'Erreur lors du chargement de la newsletter'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { newsletters, currentNewsletter, loading, error, fetchNewsletters, fetchNewsletterById }
})
