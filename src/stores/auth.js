import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// ============================================================
// Configuration — swap to real URL when backend is ready
// ============================================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Attach bearer token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ============================================================
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    try {
      // ── Real API call (uncomment when backend ready) ──────
      // const response = await api.post('/auth/login', credentials)
      // token.value = response.data.token
      // user.value = response.data.user
      // localStorage.setItem('token', token.value)

      // ── Mock (remove when backend is integrated) ──────────
      await new Promise((resolve) => setTimeout(resolve, 700))
      token.value = 'mock-jwt-token'
      user.value = {
        id: 1,
        name: credentials.name || 'Utilisateur Test',
        email: credentials.email,
        role: 'student',
        avatar: `https://i.pravatar.cc/150?u=${credentials.email}`,
      }
      localStorage.setItem('token', token.value)
    } catch (error) {
      const message = error.response?.data?.message || 'Identifiants incorrects'
      throw new Error(message)
    }
  }

  async function register(credentials) {
    try {
      // ── Real API call (uncomment when backend ready) ──────
      // const response = await api.post('/auth/register', credentials)
      // token.value = response.data.token
      // user.value = response.data.user
      // localStorage.setItem('token', token.value)

      // ── Mock ──────────────────────────────────────────────
      await login(credentials)
    } catch (error) {
      const message = error.response?.data?.message || "Erreur lors de l'inscription"
      throw new Error(message)
    }
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      // ── Real API call (uncomment when backend ready) ──────
      // const response = await api.get('/auth/me')
      // user.value = response.data

      // ── Mock ──────────────────────────────────────────────
      user.value = {
        id: 1,
        name: 'Utilisateur Test',
        email: 'test@stratinka.com',
        role: 'student',
        avatar: 'https://i.pravatar.cc/150?u=test@stratinka.com',
      }
    } catch (error) {
      logout()
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { user, token, isAuthenticated, login, register, logout, fetchUser }
})
