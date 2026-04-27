<script setup>
defineProps({
  professor: { type: Object, required: true },
})

import BaseBadge from '@/components/common/BaseBadge.vue'
import BaseCard from '@/components/common/BaseCard.vue'
</script>

<template>
  <BaseCard class="group flex h-full flex-col gap-5">
    <div class="flex items-start gap-4">
      <img
        :src="professor.avatar"
        :alt="professor.name"
        class="h-16 w-16 rounded-2xl object-cover"
      />
      <div class="min-w-0">
        <h3 class="text-lg font-semibold">{{ professor.name }}</h3>
        <p class="mt-1 text-sm text-[var(--color-text-soft)]">{{ professor.specialty }}</p>
      </div>
    </div>
    <p class="text-sm leading-7 text-[var(--color-text-soft)]">{{ professor.bio }}</p>
    <div class="mt-auto flex items-center justify-between">
      <BaseBadge tone="primary">Plans premium</BaseBadge>
      <router-link
        :to="`/professeurs/${professor.id}`"
        class="text-sm font-semibold text-[var(--color-primary)]"
      >
        Voir le profil
      </router-link>
    </div>
  </BaseCard>
</template>
