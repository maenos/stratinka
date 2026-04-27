import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/public/HomePage.vue'),
      },
      {
        path: 'catalogue',
        name: 'catalogue',
        component: () => import('@/pages/public/CataloguePage.vue'),
      },
      {
        path: 'professeurs/:id',
        name: 'professor',
        component: () => import('@/pages/public/ProfessorPage.vue'),
        props: true,
      },
      {
        path: 'temoignages',
        name: 'testimonials',
        component: () => import('@/pages/public/TestimonialsPage.vue'),
      },
      {
        path: 'connexion',
        name: 'login',
        component: () => import('@/pages/public/LoginPage.vue'),
        meta: { guest: true },
      },
      {
        path: 'inscription',
        name: 'register',
        component: () => import('@/pages/public/RegisterPage.vue'),
        meta: { guest: true },
      },
      {
        path: 'tableau-de-bord',
        name: 'dashboard',
        component: () => import('@/pages/private/DashboardPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'mes-abonnements',
        name: 'subscriptions',
        component: () => import('@/pages/private/MySubscriptionsPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'mon-profil',
        name: 'profile',
        component: () => import('@/pages/private/profile/ProfilePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'professeurs/:profId/cours',
        name: 'prof-courses',
        component: () => import('@/pages/private/courses/CoursesPage.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'professeurs/:profId/cours/:id',
        name: 'course-detail',
        component: () => import('@/pages/private/courses/CourseDetailPage.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'professeurs/:profId/cours/:id/lecons/:lessonId',
        name: 'module',
        component: () => import('@/pages/private/courses/ModulePage.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'professeurs/:profId/lives',
        name: 'prof-lives',
        component: () => import('@/pages/private/lives/LivesPage.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'professeurs/:profId/livres',
        name: 'prof-books',
        component: () => import('@/pages/private/books/BooksPage.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/public/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.initialized && !authStore.initializing) {
    await authStore.initialize()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guest && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
