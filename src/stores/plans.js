import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const usePlanStore = defineStore('plans', () => {
  const plans = ref([])
  const currentPlan = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 9.99,
      interval: 'month',
      features: ['Accès à 10 cours', 'Support email'],
    },
    {
      id: 2,
      name: 'Pro',
      price: 19.99,
      interval: 'month',
      features: ['Accès illimité', 'Support prioritaire', 'Certificats'],
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 199.99,
      interval: 'year',
      features: ['Accès illimité', 'Support 24/7', 'Mentorat privé'],
    },
  ]

  async function fetchPlans() {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const response = await api.get('/plans')
      // plans.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      plans.value = mockPlans
    } catch (err) {
      error.value = 'Erreur lors du chargement des plans'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchPlanById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/plans/${id}`)
      // currentPlan.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentPlan.value = mockPlans.find((p) => p.id === Number(id)) || null
    } catch (err) {
      error.value = 'Erreur lors du chargement du plan'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { plans, currentPlan, loading, error, fetchPlans, fetchPlanById }
})
