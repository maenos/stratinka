<script setup>
import BaseBadge from '@/components/common/BaseBadge.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { useFormatXOF } from '@/composables/useFormatXOF'

const props = defineProps({
  plans: { type: Array, default: () => [] },
  loadingPlanId: { type: Number, default: null },
})

const emit = defineEmits(['subscribe'])
const { formatXOF } = useFormatXOF()

const normalizeFeature = (feature) => {
  const map = {
    courses: 'Accès aux cours',
    lives: 'Lives privés',
    books: 'Bibliothèque PDF',
  }
  return map[feature] || feature
}
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-2">
    <BaseCard
      v-for="plan in plans"
      :key="plan.id"
      class="relative overflow-hidden border-slate-200 bg-white"
    >
      <div
        class="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
      ></div>
      <div class="flex h-full flex-col gap-5 pt-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-semibold">{{ plan.name }}</h3>
            <p class="mt-1 text-sm text-[var(--color-text-soft)]">
              Accès pendant {{ plan.durationDays }} jours
            </p>
          </div>
          <BaseBadge tone="warning">Premium</BaseBadge>
        </div>

        <div class="text-3xl font-semibold">{{ formatXOF(plan.price) }}</div>

        <ul class="space-y-3 text-sm text-[var(--color-text-soft)]">
          <li v-for="feature in plan.features || []" :key="feature" class="flex items-center gap-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </span>
            {{ normalizeFeature(feature) }}
          </li>
        </ul>

        <BaseButton
          block
          :disabled="loadingPlanId === plan.id"
          @click="emit('subscribe', plan)"
        >
          {{ loadingPlanId === plan.id ? 'Traitement...' : "Choisir ce plan" }}
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>
