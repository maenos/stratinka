<script setup>
defineProps({
  chapters: { type: Array, default: () => [] },
  profId: { type: [String, Number], required: true },
  courseId: { type: [String, Number], required: true },
})

import BaseBadge from '@/components/common/BaseBadge.vue'
</script>

<template>
  <div class="space-y-4">
    <section
      v-for="chapter in chapters"
      :key="chapter.id"
      class="panel overflow-hidden"
    >
      <div class="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-6 py-4">
        <div>
          <h3 class="font-semibold">{{ chapter.title }}</h3>
          <p class="mt-1 text-sm text-[var(--color-text-soft)]">
            {{ chapter.lessons?.length || 0 }} leçon(s)
          </p>
        </div>
      </div>
      <div class="divide-y divide-[var(--color-border)]">
        <router-link
          v-for="lesson in chapter.lessons || []"
          :key="lesson.id"
          :to="`/professeurs/${profId}/cours/${courseId}/lecons/${lesson.id}`"
          class="flex items-center justify-between gap-4 px-6 py-4 hover:bg-[var(--color-surface-soft)]"
        >
          <div>
            <p class="font-medium">{{ lesson.title }}</p>
            <p class="mt-1 text-sm text-[var(--color-text-soft)]">{{ lesson.duration || '—' }}</p>
          </div>
          <BaseBadge v-if="lesson.isFreePreview" tone="success">Aperçu gratuit</BaseBadge>
        </router-link>
      </div>
    </section>
  </div>
</template>
