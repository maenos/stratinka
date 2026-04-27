<script setup>
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import { buildClientStreamUrl } from '@/api'
import { useCourseStore } from '@/stores/courses'

const route = useRoute()
const courseStore = useCourseStore()
const { currentLesson, loading } = storeToRefs(courseStore)

useHead({
  title: computed(() => currentLesson.value?.title || 'Lecture'),
})

onMounted(() => {
  courseStore.fetchLesson(route.params.lessonId)
})

const secureVideoUrl = computed(() =>
  buildClientStreamUrl(`/streaming/lessons/${route.params.lessonId}/video`),
)

const securePdfUrl = computed(() => {
  if (!currentLesson.value?.bookId) return ''
  return buildClientStreamUrl(`/books/${currentLesson.value.bookId}/stream`)
})
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <div v-if="loading && !currentLesson" class="panel flex min-h-60 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement de la leçon…</p>
    </div>

    <div v-else-if="currentLesson" class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="panel overflow-hidden p-0">
        <div class="aspect-video bg-[var(--color-bg)]">
          <video v-if="secureVideoUrl" :src="secureVideoUrl" controls class="h-full w-full"></video>
        </div>
        <div class="p-6">
          <h1 class="text-2xl font-semibold">{{ currentLesson.title }}</h1>
          <p class="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            {{ currentLesson.description }}
          </p>
        </div>
      </div>

      <div class="space-y-6">
        <div class="panel p-6">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Lecture sécurisée</p>
          <p class="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            Les médias sont servis via des endpoints protégés du backend pour préserver les droits d’accès.
          </p>
        </div>
        <iframe
          v-if="securePdfUrl"
          :src="securePdfUrl"
          class="panel min-h-[28rem] w-full"
          title="Lecteur PDF sécurisé"
        ></iframe>
      </div>
    </div>
  </section>
</template>
