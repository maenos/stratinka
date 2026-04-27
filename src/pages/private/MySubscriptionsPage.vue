<script setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'

import SubscriptionCard from '@/components/subscriptions/SubscriptionCard.vue'
import { useSubscriptionStore } from '@/stores/subscriptions'
import { useToast } from '@/composables/useToast'

const subscriptionStore = useSubscriptionStore()
const toast = useToast()
const { list, loading } = storeToRefs(subscriptionStore)

useHead({ title: 'Mes abonnements' })

onMounted(() => {
  subscriptionStore.fetchMy()
})

const cancelSubscription = async (subscription) => {
  try {
    await subscriptionStore.cancel(subscription.id)
    toast.push({
      title: 'Abonnement résilié',
      message: 'Votre accès a été retiré avec succès.',
      tone: 'success',
    })
  } catch (error) {
    toast.push({
      title: 'Résiliation impossible',
      message: "Le backend n'a pas accepté la demande.",
      tone: 'error',
    })
  }
}
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <p class="eyebrow">Mes abonnements</p>
    <h1 class="section-title">Pilotez vos accès premium</h1>

    <div v-if="loading" class="panel mt-6 flex min-h-44 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement…</p>
    </div>

    <div v-else class="mt-6 grid gap-6 lg:grid-cols-2">
      <SubscriptionCard
        v-for="subscription in list"
        :key="subscription.id"
        :subscription="subscription"
        @cancel="cancelSubscription"
      />
    </div>
  </section>
</template>
