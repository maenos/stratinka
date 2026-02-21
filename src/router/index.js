import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/CoursesView.vue')
    },
    {
      path: '/course/:slug',
      name: 'course-detail',
      component: () => import('../views/CourseDetailView.vue')
    },
    {
      path: '/my-courses',
      name: 'my-courses',
      component: () => import('../views/MyCoursesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/course/:slug/learn',
      name: 'course-learn',
      component: () => import('../views/CourseLearnView.vue'),
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return { top: 0 }
    }
  }
})

export default router
