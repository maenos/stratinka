<script setup>
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'

import SubscriptionCard from '@/components/subscriptions/SubscriptionCard.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import { useAuthStore } from '@/stores/auth'
import { useSubscriptionStore } from '@/stores/subscriptions'

const authStore = useAuthStore()
const subscriptionStore = useSubscriptionStore()
const { active, loading } = storeToRefs(subscriptionStore)

useHead({ title: 'Tableau de bord' })

onMounted(() => {
  subscriptionStore.fetchMy()
})

const stats = computed(() => [
  { label: 'Abonnements actifs', value: active.value.length },
  { label: 'Professeurs suivis', value: new Set(active.value.map((item) => item.professorId)).size },
  { label: 'Contenus ouverts', value: active.value.length * 3 },
])
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <div class="panel-soft p-8">
      <p class="eyebrow">Tableau de bord</p>
      <h1 class="section-title">Bonjour {{ authStore.student?.name || 'étudiant' }}</h1>
      <p class="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
        Retrouvez vos abonnements actifs et accédez rapidement aux environnements d’apprentissage de vos professeurs.
      </p>
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div v-for="item in stats" :key="item.label" class="panel bg-white p-5">
          <p class="text-sm text-[var(--color-text-soft)]">{{ item.label }}</p>
          <p class="mt-3 text-3xl font-semibold">{{ item.value }}</p>
        </div>
      </div>
    </div>

    <div class="mt-10 flex items-center justify-between gap-4">
      <div>
        <p class="eyebrow">Accès actifs</p>
        <h2 class="section-title">Vos abonnements en cours</h2>
      </div>
      <BaseBadge tone="success">{{ active.length }} actif(s)</BaseBadge>
    </div>

    <div v-if="loading" class="panel mt-6 flex min-h-44 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement des accès…</p>
    </div>

    <div v-else class="mt-6 grid gap-6 lg:grid-cols-2">
      <SubscriptionCard
        v-for="subscription in active"
        :key="subscription.id"
        :subscription="subscription"
      />
    </div>
  </section>
</template>
