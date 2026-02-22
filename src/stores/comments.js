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

export const useCommentStore = defineStore('comments', () => {
  const comments = ref([]) // list of comments for current course
  const loading = ref(false)
  const submitting = ref(false)
  const error = ref(null)

  // ── Mock data ────────────────────────────────────────────────
  const mockComments = [
    {
      id: 'c1',
      user: { name: 'Marie Curie', avatar: 'https://i.pravatar.cc/150?u=marie' },
      content:
        "Excellent cours ! Les explications sont claires et les exemples pratiques m'ont beaucoup aidé.",
      rating: 5,
      parentId: null,
      createdAt: '2026-02-10T14:30:00Z',
      replies: [
        {
          id: 'c1-r1',
          user: { name: 'Formateur', avatar: 'https://i.pravatar.cc/150?u=instructor' },
          content: 'Merci beaucoup Marie ! Ravi que le cours vous ait aidé 😊',
          rating: null,
          parentId: 'c1',
          createdAt: '2026-02-10T18:00:00Z',
          replies: [],
        },
      ],
    },
    {
      id: 'c2',
      user: { name: 'Jean-Baptiste Kaboré', avatar: 'https://i.pravatar.cc/150?u=jb' },
      content:
        "Très bien structuré. J'aurais aimé plus d'exercices pratiques mais le contenu est top.",
      rating: 4,
      parentId: null,
      createdAt: '2026-02-14T09:15:00Z',
      replies: [],
    },
    {
      id: 'c3',
      user: { name: 'Amina Diallo', avatar: 'https://i.pravatar.cc/150?u=amina' },
      content: 'Est-ce que ce cours couvre aussi la version 4 ?',
      rating: null,
      parentId: null,
      createdAt: '2026-02-18T11:00:00Z',
      replies: [],
    },
  ]

  async function fetchComments(courseSlug) {
    loading.value = true
    error.value = null
    try {
      // ── Real API call (uncomment when backend ready) ────────
      // const response = await api.get(`/courses/${courseSlug}/comments`)
      // comments.value = response.data.data

      // ── Mock ────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 400))
      comments.value = mockComments
    } catch (err) {
      error.value = 'Erreur lors du chargement des commentaires'
    } finally {
      loading.value = false
    }
  }

  async function postComment(courseSlug, { content, rating = null, parentId = null }) {
    submitting.value = true
    try {
      // ── Real API call (uncomment when backend ready) ────────
      // const response = await api.post(`/courses/${courseSlug}/comments`, { content, rating, parentId })
      // const newComment = response.data.data

      // ── Mock ────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 600))
      const newComment = {
        id: `c${Date.now()}`,
        user: { name: 'Moi', avatar: `https://i.pravatar.cc/150?u=me` },
        content,
        rating,
        parentId,
        createdAt: new Date().toISOString(),
        replies: [],
      }

      if (parentId) {
        const parent = comments.value.find((c) => c.id === parentId)
        if (parent) parent.replies.push(newComment)
      } else {
        comments.value.unshift(newComment)
      }
      return newComment
    } catch (err) {
      throw new Error("Impossible d'envoyer le commentaire")
    } finally {
      submitting.value = false
    }
  }

  function clearComments() {
    comments.value = []
  }

  return { comments, loading, submitting, error, fetchComments, postComment, clearComments }
})
