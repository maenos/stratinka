import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const usePurchaseStore = defineStore('purchases', () => {
  const purchases = ref([])
  const currentPurchase = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockPurchases = [
    {
      id: 1,
      userId: 1,
      courseId: 1,
      amount: 49.99,
      status: 'completed',
      date: '2023-10-15T14:30:00Z',
    },
    { id: 2, userId: 2, courseId: 3, amount: 0, status: 'completed', date: '2023-11-20T09:15:00Z' },
  ]

  async function fetchPurchases() {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const response = await api.get('/purchases')
      // purchases.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      purchases.value = mockPurchases
    } catch (err) {
      error.value = 'Erreur lors du chargement des achats'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchPurchaseById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/purchases/${id}`)
      // currentPurchase.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentPurchase.value = mockPurchases.find((p) => p.id === Number(id)) || null
    } catch (err) {
      error.value = "Erreur lors du chargement de l'achat"
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { purchases, currentPurchase, loading, error, fetchPurchases, fetchPurchaseById }
})
