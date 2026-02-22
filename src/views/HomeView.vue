<script setup>
import { onMounted } from 'vue'
import { useCourseStore } from '../stores/courses'
import { useCategoryStore } from '../stores/categories'
import CourseCard from '../components/CourseCard.vue'
import { useRouter } from 'vue-router'

const courseStore = useCourseStore()
const categoryStore = useCategoryStore()
const router = useRouter()

onMounted(() => {
  courseStore.fetchCourses()
  categoryStore.fetchCategories()
})

const goToCategory = (slug) => {
  router.push({ path: '/courses', query: { category: slug } })
}
</script>

<template>
  <div class="min-h-screen bg-base-100 pb-16">
    <!-- Hero Section -->
    <section class="relative bg-neutral h-[380px] md:h-[460px] flex items-center overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center opacity-30"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent"
      ></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-xl">
          <h1 class="text-3xl md:text-5xl font-bold mb-4 text-base-content leading-tight">
            Apprenez sans limites
          </h1>
          <p class="text-base-content/70 mb-8 text-lg">
            Développez de nouvelles compétences avec nos cours en ligne dispensés par des experts.
          </p>
          <router-link
            to="/courses"
            class="btn btn-primary btn-lg font-bold shadow-lg shadow-primary/30"
          >
            Explorer les cours
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Courses Section -->
    <section class="container mx-auto px-6 py-14">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-base-content">Cours populaires</h2>
          <p class="text-base-content/60 mt-1">Les cours les mieux notés par notre communauté</p>
        </div>
        <router-link
          to="/courses"
          class="link link-primary font-semibold text-sm hidden md:inline-flex hover:no-underline"
        >
          Voir tout →
        </router-link>
      </div>

      <!-- Loading skeleton -->
      <div
        v-if="courseStore.loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <div
          v-for="n in 4"
          :key="n"
          class="card bg-base-100 border border-base-200 h-72 animate-pulse rounded-xl"
        >
          <div class="h-40 bg-base-300 rounded-t-xl"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-base-300 rounded w-3/4"></div>
            <div class="h-3 bg-base-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="courseStore.error" class="alert alert-error">
        <span>{{ courseStore.error }}</span>
      </div>

      <!-- Course Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <router-link
          v-for="course in courseStore.courses"
          :key="course.id"
          :to="{ name: 'course-detail', params: { slug: course.slug } }"
          class="hover:-translate-y-1 transition-transform duration-200"
        >
          <CourseCard :course="course" class="h-full shadow-sm hover:shadow-md transition-shadow" />
        </router-link>
      </div>

      <!-- Mobile "See all" -->
      <div class="text-center mt-8 md:hidden">
        <router-link to="/courses" class="btn btn-outline btn-wide">
          Voir tous les cours
        </router-link>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="bg-base-200/40 py-14">
      <div class="container mx-auto px-6">
        <h2 class="text-2xl font-bold mb-8 text-base-content">Catégories</h2>

        <!-- Loading skeleton -->
        <div v-if="categoryStore.loading" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div v-for="n in 8" :key="n" class="h-16 bg-base-300 rounded-xl animate-pulse"></div>
        </div>

        <!-- Categories grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            v-for="cat in categoryStore.categories"
            :key="cat.id"
            @click="goToCategory(cat.slug)"
            class="flex items-center gap-3 p-4 bg-base-100 border border-base-200 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
          >
            <span class="text-2xl">{{ cat.icon }}</span>
            <div class="min-w-0">
              <span class="font-semibold text-sm text-base-content block truncate">{{
                cat.name
              }}</span>
              <span v-if="cat.subcategories?.length" class="text-xs text-base-content/40">
                {{ cat.subcategories.length }} sous-cat.
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
