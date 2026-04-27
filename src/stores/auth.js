import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { authApi, clientApi, fetchSanctumCsrfCookie } from '@/services/api'

const persistedToken = localStorage.getItem('client_token')

export const useAuthStore = defineStore('auth', () => {
  const student = ref(null)
  const token = ref(persistedToken)
  const initialized = ref(false)
  const initializing = ref(false)
  const loginError = ref(null)
  let pendingInit = null

  if (token.value) {
    clientApi.defaults.headers.common.Authorization = `Bearer ${token.value}`
    authApi.defaults.headers.common.Authorization = `Bearer ${token.value}`
  }

  const isAuthenticated = computed(() => !!student.value || !!token.value)

  const applyToken = (nextToken) => {
    token.value = nextToken || null
    if (nextToken) {
      localStorage.setItem('client_token', nextToken)
      clientApi.defaults.headers.common.Authorization = `Bearer ${nextToken}`
      authApi.defaults.headers.common.Authorization = `Bearer ${nextToken}`
    } else {
      localStorage.removeItem('client_token')
      delete clientApi.defaults.headers.common.Authorization
      delete authApi.defaults.headers.common.Authorization
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const { data } = await clientApi.get('/user')
      student.value = data
      return data
    } catch (error) {
      student.value = null
      if (!token.value) return null
      applyToken(null)
      return null
    }
  }

  const initialize = async () => {
    if (initialized.value) return
    if (pendingInit) return pendingInit

    initializing.value = true
    pendingInit = fetchCurrentUser()
      .catch(() => null)
      .finally(() => {
        initialized.value = true
        initializing.value = false
        pendingInit = null
      })

    return pendingInit
  }

  const login = async ({ email, password }) => {
    loginError.value = null
    await fetchSanctumCsrfCookie()
    const response = await authApi.post('/login', { email, password })
    const nextToken = response.data?.token || null
    applyToken(nextToken)
    await fetchCurrentUser()
  }

  const register = async (payload) => {
    loginError.value = null
    await fetchSanctumCsrfCookie()
    const response = await authApi.post('/register', payload)
    const nextToken = response.data?.token || null
    applyToken(nextToken)
    if (!nextToken) {
      await login({ email: payload.email, password: payload.password })
      return
    }
    await fetchCurrentUser()
  }

  const logout = async () => {
    try {
      await authApi.post('/logout')
    } catch (error) {
      // Clear local state even if the backend session is already gone.
    } finally {
      student.value = null
      applyToken(null)
    }
  }

  return {
    student,
    token,
    initialized,
    initializing,
    loginError,
    isAuthenticated,
    initialize,
    fetchCurrentUser,
    login,
    register,
    logout,
  }
})
