import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL_PROD || 'http://127.0.0.1:8000/api'

// Instance Axios configurée pour l'API
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // Header recommandé pour API Platform (Hydra)
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour injecter le token d'authentification dans chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Intercepteur pour gérer les erreurs de réponse communes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs 401 (Non autorisé)
    if (error.response && error.response.status === 401) {
      console.warn('Non autorisé : le token est peut-être expiré.')
      // Vous pourriez par exemple rediriger vers la page de login ou supprimer le token ici
      // localStorage.removeItem('token')
    }
    return Promise.reject(error)
  },
)

export default api
