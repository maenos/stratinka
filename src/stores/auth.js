import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios' // We'll assume a tailored axios instance usually, but raw for now is okay or import from services

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    // Mock login for now or real API call
    // const response = await axios.post('/api/login', credentials)
    // token.value = response.data.token
    // user.value = response.data.user
    
    // Simulating login
    token.value = 'fake-jwt-token'
    user.value = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    }
    localStorage.setItem('token', token.value)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  async function fetchUser() {
    if (!token.value) return
    try {
        // const response = await axios.get('/api/user')
        // user.value = response.data
        
        // Mock
        user.value = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
        }
    } catch (error) {
        logout()
    }
  }

  return { user, token, isAuthenticated, login, logout, fetchUser }
})
