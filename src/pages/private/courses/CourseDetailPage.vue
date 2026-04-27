<script setup>
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import ModuleList from '@/components/courses/ModuleList.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import { useCourseStore } from '@/stores/courses'

const route = useRoute()
const courseStore = useCourseStore()
const { current, loading } = storeToRefs(courseStore)

useHead({
  title: computed(() => current.value?.title || 'Détail du cours'),
})

onMounted(() => {
  courseStore.fetchCourse(route.params.id)
})
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <div v-if="loading && !current" class="panel flex min-h-60 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement du cours…</p>
    </div>

    <template v-else-if="current">
      <div class="panel-soft overflow-hidden">
        <div class="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div class="px-6 py-8 md:px-8">
            <p class="eyebrow">Détail du cours</p>
            <h1 class="text-3xl font-semibold">{{ current.title }}</h1>
            <p class="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
              {{ current.description }}
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <BaseBadge tone="primary">{{ current.level }}</BaseBadge>
              <BaseBadge tone="success">Accès sécurisé</BaseBadge>
            </div>
          </div>
          <img
            :src="current.thumbnail"
            :alt="current.title"
            class="h-full min-h-72 w-full object-cover"
          />
        </div>
      </div>

      <div class="mt-10">
        <ModuleList
          :chapters="current.chapters || []"
          :prof-id="route.params.profId"
          :course-id="route.params.id"
        />
      </div>
    </template>
  </section>
</template>
