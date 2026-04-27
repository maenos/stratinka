import axios from 'axios'

const rawBase = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '')
const versionBase = rawBase.endsWith('/client') ? rawBase.slice(0, -7) : rawBase
const clientBase = `${versionBase}/client`
const apiOrigin = versionBase.replace(/\/api\/v\d+$/, '')

const sharedConfig = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

export const authApi = axios.create({
  baseURL: apiOrigin,
  ...sharedConfig,
})

export const clientApi = axios.create({
  baseURL: clientBase,
  ...sharedConfig,
})

const attachAuthIfPresent = (config) => {
  const token = localStorage.getItem('client_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

authApi.interceptors.request.use(attachAuthIfPresent)
clientApi.interceptors.request.use(attachAuthIfPresent)

const isProtectedPath = (path) =>
  path.startsWith('/tableau-de-bord') ||
  path.startsWith('/mes-abonnements') ||
  path.startsWith('/mon-profil') ||
  /^\/professeurs\/[^/]+\/(cours|lives|livres)/.test(path)

const handleError = (error) => {
  const status = error.response?.status
  const code = error.response?.data?.code
  const professorId = error.response?.data?.professorId || error.response?.data?.professor_id
  const path = window.location.pathname

  if (
    status === 401 &&
    isProtectedPath(path) &&
    !path.startsWith('/connexion') &&
    !path.startsWith('/inscription')
  ) {
    localStorage.removeItem('client_token')
    window.location.assign('/connexion')
  }

  if (status === 403 && code === 'SUBSCRIPTION_REQUIRED') {
    const target = professorId ? `/professeurs/${professorId}` : '/mes-abonnements'
    window.location.assign(target)
  }

  return Promise.reject(error)
}

authApi.interceptors.response.use((response) => response, handleError)
clientApi.interceptors.response.use((response) => response, handleError)

export const fetchSanctumCsrfCookie = async () => {
  try {
    await authApi.get('/sanctum/csrf-cookie')
  } catch (error) {
    // Some environments may not require this endpoint, so we fail softly.
  }
}

export const buildClientStreamUrl = (path) => {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  return `${clientBase}${path.startsWith('/') ? path : `/${path}`}`
}

export const getApiBases = () => ({
  rawBase,
  versionBase,
  clientBase,
  apiOrigin,
})

export default clientApi
