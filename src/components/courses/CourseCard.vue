<script setup>
defineProps({
  course: { type: Object, required: true },
})

import BaseBadge from '@/components/common/BaseBadge.vue'
import BaseCard from '@/components/common/BaseCard.vue'
</script>

<template>
  <BaseCard class="flex h-full flex-col gap-4 p-0">
    <img
      :src="course.thumbnail"
      :alt="course.title"
      class="h-52 w-full rounded-[28px] rounded-b-none object-cover"
    />
    <div class="flex flex-1 flex-col gap-4 p-6">
      <div class="flex items-center justify-between gap-4">
        <BaseBadge tone="primary">{{ course.level }}</BaseBadge>
        <span class="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-text-soft)]">
          Mentor
        </span>
      </div>
      <div>
        <h3 class="text-lg font-semibold">{{ course.title }}</h3>
        <p class="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
          {{ course.description }}
        </p>
      </div>
      <div class="mt-auto flex items-center gap-3 text-sm">
        <img
          v-if="course.instructor?.avatar"
          :src="course.instructor.avatar"
          :alt="course.instructor.name"
          class="h-10 w-10 rounded-full object-cover"
        />
        <span class="font-medium">{{ course.instructor?.name }}</span>
      </div>
    </div>
  </BaseCard>
</template>
