import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCourseStore = defineStore('courses', () => {
  const courses = ref([])
  const currentCourse = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Mock data for MVP
  const mockCourses = [
    {
        id: 1,
        slug: 'vuejs-3-masterclass',
        title: 'Vue.js 3 Masterclass: De Zéro à Héros',
        description: 'Maîtrisez Vue 3, Composition API, Pinia et Vue Router.',
        thumbnail: 'https://picsum.photos/seed/vue/800/450',
        author: { name: 'Evan You', avatar: 'https://i.pravatar.cc/150?u=evan' },
        rating: 4.8,
        students: 12500,
        price: 49.99,
        category: 'Développement Web',
        level: 'Intermédiaire',
        duration: '20h'
    },
    {
        id: 2,
        slug: 'tailwindcss-design',
        title: 'Design Moderne avec Tailwind CSS',
        description: 'Créez des interfaces magnifiques sans sortir de votre HTML.',
        thumbnail: 'https://picsum.photos/seed/tailwind/800/450',
        author: { name: 'Adam Wathan', avatar: 'https://i.pravatar.cc/150?u=adam' },
        rating: 4.9,
        students: 8300,
        price: 39.99,
        category: 'Design',
        level: 'Débutant',
        duration: '10h'
    },
     {
        id: 3,
        slug: 'python-data-science',
        title: 'Python pour la Data Science',
        description: 'Analysez des données complexes avec Pandas et NumPy.',
        thumbnail: 'https://picsum.photos/seed/python/800/450',
        author: { name: 'Guido V.', avatar: 'https://i.pravatar.cc/150?u=guido' },
        rating: 4.7,
        students: 5600,
        price: 0,
        category: 'Data Science',
        level: 'Avancé',
        duration: '35h'
    }
  ]

  async function fetchCourses(filters = {}) {
    loading.value = true
    error.value = null
    try {
        // Simulation API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        let results = [...mockCourses]

        if (filters.search) {
            const query = filters.search.toLowerCase()
            results = results.filter(c => 
                c.title.toLowerCase().includes(query) || 
                c.description.toLowerCase().includes(query)
            )
        }

        if (filters.category && filters.category.length > 0) {
            results = results.filter(c => filters.category.includes(c.category))
        }

        if (filters.level && filters.level.length > 0) {
            results = results.filter(c => filters.level.includes(c.level))
        }

        if (filters.price) { // 'free' or 'paid'
            if (filters.price === 'free') {
                results = results.filter(c => c.price === 0)
            } else if (filters.price === 'paid') {
                results = results.filter(c => c.price > 0)
            }
        }

        courses.value = results
    } catch (err) {
        error.value = 'Erreur lors du chargement des cours'
    } finally {
        loading.value = false
    }
  }

  async function fetchCourseBySlug(slug) {
    loading.value = true
    error.value = null
    try {
        await new Promise(resolve => setTimeout(resolve, 500))
        currentCourse.value = mockCourses.find(c => c.slug === slug) || null
        
        // Mock detailed content if needed (sections, lessons)
        if (currentCourse.value && !currentCourse.value.sections) {
             currentCourse.value.sections = [
                {
                    title: 'Introduction',
                    lessons: [
                        { id: 1, title: 'Bienvenue dans le cours', type: 'video', duration: '2:30', completed: false },
                        { id: 2, title: 'Configuration de l\'environnement', type: 'article', duration: '5:00', completed: false }
                    ]
                },
                 {
                    title: 'Les bases',
                    lessons: [
                        { id: 3, title: 'Votre premier composant', type: 'video', duration: '8:45', completed: false },
                        { id: 4, title: 'Comprendre les props', type: 'video', duration: '6:20', completed: false },
                        { id: 5, title: 'Quiz : Les bases', type: 'quiz', duration: '10:00', completed: false }
                    ]
                }
             ]
             
             currentCourse.value.whatYouWillLearn = [
                 'Comprendre les fondamentaux',
                 'Créer des applications réactives',
                 'Maîtriser les outils modernes',
                 'Déployer vos projets'
             ]
        }
        
    } catch (err) {
        error.value = 'Erreur lors du chargement du cours'
    } finally {
        loading.value = false
    }
  }

  return { courses, currentCourse, loading, error, fetchCourses, fetchCourseBySlug }
})
