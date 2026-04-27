import { defineStore } from 'pinia'
import { ref } from 'vue'

import { api } from '@/api'

const fallbackCourses = [
  {
    id: 1,
    professorId: 1,
    title: 'Trading pour débutants',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1642543348745-7be69489d6f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Comprendre la structure du marché, le risque, et vos premières routines.',
    instructor: {
      name: 'Aminata Traoré',
      avatar: 'https://i.pravatar.cc/200?img=32',
    },
    chapters: [
      {
        id: 1,
        title: 'Chapitre 1 · Fondations',
        lessons: [
          { id: 1, title: 'Introduction', duration: '15:00', isFreePreview: true },
          { id: 2, title: 'Journal de trading', duration: '12:30', isFreePreview: false },
        ],
      },
    ],
  },
]

export const useCourseStore = defineStore('courses', () => {
  const list = ref([])
  const current = ref(null)
  const currentLesson = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchCourses = async (professorId) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/courses', {
        params: { professorId },
      })
      list.value = Array.isArray(data) ? data : []
    } catch (err) {
      list.value = fallbackCourses.filter((course) => course.professorId === Number(professorId))
      error.value = null
    } finally {
      loading.value = false
    }
  }

  const fetchCourse = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/courses/${id}`)
      current.value = data
    } catch (err) {
      current.value = fallbackCourses.find((course) => course.id === Number(id)) || null
      error.value = null
    } finally {
      loading.value = false
    }
  }

  const fetchLesson = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/lessons/${id}`)
      currentLesson.value = data
    } catch (err) {
      currentLesson.value = {
        id: Number(id),
        title: 'Introduction',
        description: 'Vue guidée de la première leçon avec support vidéo sécurisé.',
        duration: '15:00',
        videoUrl: '/streaming/lessons/1/video',
      }
      error.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    current,
    currentLesson,
    loading,
    error,
    fetchCourses,
    fetchCourse,
    fetchLesson,
  }
})
