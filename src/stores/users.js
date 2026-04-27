import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useUserStore = defineStore('users', () => {
  const users = ref([])
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockUsers = [
    { id: 1, email: 'admin@strata.com', name: 'Admin User', role: 'admin' },
    { id: 2, email: 'student@example.com', name: 'John Doe', role: 'student' },
  ]

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const response = await api.get('/users')
      // users.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      users.value = mockUsers
    } catch (err) {
      error.value = 'Erreur lors du chargement des utilisateurs'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchUserById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/users/${id}`)
      // currentUser.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentUser.value = mockUsers.find((u) => u.id === Number(id)) || null
    } catch (err) {
      error.value = "Erreur lors du chargement de l'utilisateur"
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { users, currentUser, loading, error, fetchUsers, fetchUserById }
})
