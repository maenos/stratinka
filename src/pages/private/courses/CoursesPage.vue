<script setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import CourseCard from '@/components/courses/CourseCard.vue'
import { useCourseStore } from '@/stores/courses'

const route = useRoute()
const courseStore = useCourseStore()
const { list, loading } = storeToRefs(courseStore)

useHead({ title: 'Cours' })

onMounted(() => {
  courseStore.fetchCourses(route.params.profId)
})
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <p class="eyebrow">Cours</p>
    <h1 class="section-title">Contenus accessibles pour ce professeur</h1>

    <div v-if="loading" class="panel mt-6 flex min-h-44 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement des cours…</p>
    </div>

    <div v-else class="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <router-link
        v-for="course in list"
        :key="course.id"
        :to="`/professeurs/${route.params.profId}/cours/${course.id}`"
      >
        <CourseCard :course="course" />
      </router-link>
    </div>
  </section>
</template>
