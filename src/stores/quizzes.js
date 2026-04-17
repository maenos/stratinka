import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useQuizStore = defineStore('quizzes', () => {
  const quizzes = ref([])
  const currentQuiz = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockQuizzes = [
    { id: 1, chapterId: 2, title: 'Quiz sur les bases de Vue', questionsCount: 5, passScore: 80 },
  ]

  async function fetchQuizzes(chapterId = null) {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const params = chapterId ? { 'chapter.id': chapterId } : {}
      // const response = await api.get('/api/quizzes', { params })
      // quizzes.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      let results = [...mockQuizzes]
      if (chapterId) {
        results = results.filter((q) => q.chapterId === chapterId)
      }
      quizzes.value = results
    } catch (err) {
      error.value = 'Erreur lors du chargement des quiz'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchQuizById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/api/quizzes/${id}`)
      // currentQuiz.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentQuiz.value = mockQuizzes.find((q) => q.id === Number(id)) || null
    } catch (err) {
      error.value = 'Erreur lors du chargement du quiz'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { quizzes, currentQuiz, loading, error, fetchQuizzes, fetchQuizById }
})
