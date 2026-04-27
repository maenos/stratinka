<script setup>
defineProps({
  subscription: { type: Object, required: true },
})

defineEmits(['cancel'])

import BaseBadge from '@/components/common/BaseBadge.vue'
import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
  <article class="panel flex flex-col gap-5 p-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-lg font-semibold">
          {{ subscription.plan?.name || `Plan #${subscription.planId}` }}
        </h3>
        <p class="mt-1 text-sm text-[var(--color-text-soft)]">
          {{ subscription.professor?.name || 'Professeur associé' }}
        </p>
      </div>
      <BaseBadge :tone="subscription.status === 'active' ? 'success' : 'neutral'">
        {{ subscription.status }}
      </BaseBadge>
    </div>
    <div class="grid gap-2 text-sm text-[var(--color-text-soft)]">
      <p>Début: {{ new Date(subscription.startsAt).toLocaleDateString('fr-FR') }}</p>
      <p>Fin: {{ new Date(subscription.endsAt).toLocaleDateString('fr-FR') }}</p>
    </div>
    <div class="flex gap-3">
      <router-link
        v-if="subscription.professorId"
        :to="`/professeurs/${subscription.professorId}`"
        class="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--color-border)] px-4 py-3 text-sm font-medium"
      >
        Voir le professeur
      </router-link>
      <BaseButton variant="secondary" @click="$emit('cancel', subscription)">
        Résilier
      </BaseButton>
    </div>
  </article>
</template>
