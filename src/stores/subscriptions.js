import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useSubscriptionStore = defineStore('subscriptions', () => {
  const subscriptions = ref([])
  const currentSubscription = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockSubscriptions = [
    {
      id: 1,
      userId: 1,
      planId: 2,
      status: 'active',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    },
    {
      id: 2,
      userId: 2,
      planId: 1,
      status: 'canceled',
      startDate: '2023-05-01',
      endDate: '2023-06-01',
    },
  ]

  async function fetchSubscriptions() {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const response = await api.get('/subscriptions')
      // subscriptions.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      subscriptions.value = mockSubscriptions
    } catch (err) {
      error.value = 'Erreur lors du chargement des abonnements'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchSubscriptionById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/subscriptions/${id}`)
      // currentSubscription.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentSubscription.value = mockSubscriptions.find((s) => s.id === Number(id)) || null
    } catch (err) {
      error.value = "Erreur lors du chargement de l'abonnement"
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    subscriptions,
    currentSubscription,
    loading,
    error,
    fetchSubscriptions,
    fetchSubscriptionById,
  }
})
