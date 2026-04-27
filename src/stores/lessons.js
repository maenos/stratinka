import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useLessonStore = defineStore('lessons', () => {
  const lessons = ref([])
  const currentLesson = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockLessons = [
    {
      id: 1,
      chapterId: 1,
      title: 'Présentation de Vue',
      type: 'video',
      duration: '5:00',
      order: 1,
      content: 'Contenu vidéo...',
    },
    {
      id: 2,
      chapterId: 1,
      title: 'Création du premier projet',
      type: 'article',
      duration: '10:00',
      order: 2,
      content: 'Contenu textuel...',
    },
    {
      id: 3,
      chapterId: 2,
      title: 'Comprendre les composants',
      type: 'video',
      duration: '15:00',
      order: 1,
      content: 'Vidéo sur les composants...',
    },
  ]

  async function fetchLessons(chapterId = null) {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const params = chapterId ? { 'chapter.id': chapterId } : {}
      // const response = await api.get('/lessons', { params })
      // lessons.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      let results = [...mockLessons]
      if (chapterId) {
        results = results.filter((l) => l.chapterId === chapterId)
      }
      lessons.value = results
    } catch (err) {
      error.value = 'Erreur lors du chargement des leçons'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchLessonById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/lessons/${id}`)
      // currentLesson.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentLesson.value = mockLessons.find((l) => l.id === Number(id)) || null
    } catch (err) {
      error.value = 'Erreur lors du chargement de la leçon'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { lessons, currentLesson, loading, error, fetchLessons, fetchLessonById }
})
