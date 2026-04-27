import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useSubscriberStore = defineStore('subscribers', () => {
  const subscribers = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockSubscribers = [
    { id: 1, email: 'john@example.com', subscribedAt: '2023-10-01T08:00:00Z' },
    { id: 2, email: 'jane@example.com', subscribedAt: '2023-11-05T12:30:00Z' },
  ]

  async function fetchSubscribers() {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const response = await api.get('/subscribers')
      // subscribers.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      subscribers.value = mockSubscribers
    } catch (err) {
      error.value = 'Erreur lors du chargement des abonnés'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function subscribe(email) {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // await api.post('/subscribers', { email })

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      subscribers.value.push({
        id: Date.now(),
        email,
        subscribedAt: new Date().toISOString(),
      })
    } catch (err) {
      error.value = "Erreur lors de l'inscription à la newsletter"
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return { subscribers, loading, error, fetchSubscribers, subscribe }
})
