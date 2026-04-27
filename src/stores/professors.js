import { defineStore } from 'pinia'
import { ref } from 'vue'

import { api } from '@/api'

const fallbackProfessors = [
  {
    id: 1,
    name: 'Aminata Traoré',
    specialty: 'Trading & discipline de marché',
    avatar: 'https://i.pravatar.cc/240?img=32',
    bio: 'Ancienne analyste de marché, elle accompagne les étudiants sur une méthode progressive.',
    plans: [
      {
        id: 11,
        name: 'Pack Essentiel',
        price: 25000,
        durationDays: 30,
        features: ['courses'],
      },
      {
        id: 12,
        name: 'Pack Trader Pro',
        price: 60000,
        durationDays: 30,
        features: ['courses', 'lives', 'books'],
      },
    ],
  },
  {
    id: 2,
    name: 'Samuel Nguessan',
    specialty: 'Psychologie du trading',
    avatar: 'https://i.pravatar.cc/240?img=14',
    bio: "Il aide les étudiants à construire une routine d'exécution durable.",
    plans: [
      {
        id: 21,
        name: 'Pack Focus',
        price: 18000,
        durationDays: 30,
        features: ['courses', 'books'],
      },
    ],
  },
]

export const useProfessorStore = defineStore('professors', () => {
  const list = ref([])
  const current = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchProfessors = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/professors')
      list.value = Array.isArray(data) ? data : []
    } catch (err) {
      list.value = fallbackProfessors
      error.value = null
    } finally {
      loading.value = false
    }
  }

  const fetchProfessor = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/professors/${id}`)
      current.value = data
    } catch (err) {
      current.value = fallbackProfessors.find((professor) => professor.id === Number(id)) || null
      error.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    current,
    loading,
    error,
    fetchProfessors,
    fetchProfessor,
  }
})
