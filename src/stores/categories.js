import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({ baseURL: API_BASE_URL })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data (remove when backend ready) ──────────────────
  const mockCategories = [
    {
      id: '1',
      name: 'Développement',
      slug: 'developpement',
      icon: '💻',
      subcategories: [
        { id: '1-1', name: 'Développement Web', slug: 'developpement-web' },
        { id: '1-2', name: 'Mobile (iOS & Android)', slug: 'mobile' },
        { id: '1-3', name: 'Python', slug: 'python' },
        { id: '1-4', name: 'Data Science', slug: 'data-science' },
      ],
    },
    {
      id: '2',
      name: 'Design',
      slug: 'design',
      icon: '🎨',
      subcategories: [
        { id: '2-1', name: 'UI/UX Design', slug: 'ui-ux' },
        { id: '2-2', name: 'Graphic Design', slug: 'graphic-design' },
      ],
    },
    {
      id: '3',
      name: 'Business',
      slug: 'business',
      icon: '📊',
      subcategories: [
        { id: '3-1', name: 'Entrepreneuriat', slug: 'entrepreneuriat' },
        { id: '3-2', name: 'Finance', slug: 'finance' },
      ],
    },
    {
      id: '4',
      name: 'Marketing',
      slug: 'marketing',
      icon: '📣',
      subcategories: [
        { id: '4-1', name: 'Marketing Digital', slug: 'marketing-digital' },
        { id: '4-2', name: 'SEO', slug: 'seo' },
        { id: '4-3', name: 'Réseaux sociaux', slug: 'reseaux-sociaux' },
      ],
    },
    {
      id: '5',
      name: 'Photographie',
      slug: 'photographie',
      icon: '📸',
      subcategories: [],
    },
    {
      id: '6',
      name: 'Musique',
      slug: 'musique',
      icon: '🎵',
      subcategories: [],
    },
    {
      id: '7',
      name: 'Développement personnel',
      slug: 'developpement-personnel',
      icon: '🌱',
      subcategories: [],
    },
    {
      id: '8',
      name: 'Santé & Bien-être',
      slug: 'sante',
      icon: '🏥',
      subcategories: [],
    },
  ]

  async function fetchCategories() {
    if (categories.value.length > 0) return // cache — don't refetch
    loading.value = true
    error.value = null
    try {
      // ── Real API call (uncomment when backend ready) ────────
      // const response = await api.get('/categories')
      // categories.value = response.data.data

      // ── Mock ────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 300))
      categories.value = mockCategories
    } catch (err) {
      error.value = 'Erreur lors du chargement des catégories'
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, error, fetchCategories }
})
