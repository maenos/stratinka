import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { api } from '@/api'

const fallbackSubscriptions = [
  {
    id: 10,
    professorId: 1,
    planId: 12,
    status: 'active',
    startsAt: '2026-04-01T09:00:00Z',
    endsAt: '2026-05-01T09:00:00Z',
    plan: {
      id: 12,
      name: 'Pack Trader Pro',
      features: ['courses', 'lives', 'books'],
    },
    professor: {
      id: 1,
      name: 'Aminata Traoré',
    },
  },
]

export const useSubscriptionStore = defineStore('subscriptions', () => {
  const list = ref([])
  const loading = ref(false)
  const error = ref(null)

  const active = computed(() => list.value.filter((subscription) => subscription.status === 'active'))

  const fetchMy = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/subscriptions')
      list.value = Array.isArray(data) ? data : []
    } catch (err) {
      list.value = fallbackSubscriptions
      error.value = null
    } finally {
      loading.value = false
    }
  }

  const subscribe = async ({ planId, paymentRef = null }) => {
    const { data } = await api.post('/subscriptions', { planId, paymentRef })
    list.value.unshift(data)
    return data
  }

  const cancel = async (id) => {
    await api.delete(`/subscriptions/${id}`)
    list.value = list.value.filter((subscription) => subscription.id !== id)
  }

  return {
    list,
    active,
    loading,
    error,
    fetchMy,
    subscribe,
    cancel,
  }
})
