import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useChapterStore = defineStore('chapters', () => {
  const chapters = ref([])
  const currentChapter = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Mock data ──────────────────────────────
  const mockChapters = [
    { id: 1, courseId: 1, title: 'Introduction au cours', order: 1 },
    { id: 2, courseId: 1, title: 'Les bases de Vue', order: 2 },
    { id: 3, courseId: 2, title: 'Installation et Configuration', order: 1 },
  ]

  async function fetchChapters(courseId = null) {
    loading.value = true
    error.value = null
    try {
      // ── Real API call ──
      // const params = courseId ? { 'course.id': courseId } : {}
      // const response = await api.get('/chapters', { params })
      // chapters.value = response.data.member || response.data

      // ── Mock ──
      await new Promise((resolve) => setTimeout(resolve, 300))
      let results = [...mockChapters]
      if (courseId) {
        results = results.filter((c) => c.courseId === courseId)
      }
      chapters.value = results
    } catch (err) {
      error.value = 'Erreur lors du chargement des chapitres'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchChapterById(id) {
    loading.value = true
    error.value = null
    try {
      // const response = await api.get(`/chapters/${id}`)
      // currentChapter.value = response.data
      await new Promise((resolve) => setTimeout(resolve, 300))
      currentChapter.value = mockChapters.find((c) => c.id === Number(id)) || null
    } catch (err) {
      error.value = 'Erreur lors du chargement du chapitre'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { chapters, currentChapter, loading, error, fetchChapters, fetchChapterById }
})
