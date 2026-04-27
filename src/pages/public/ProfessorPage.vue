<script setup>
import { computed, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import BaseModal from '@/components/common/BaseModal.vue'
import ProfessorPlans from '@/components/professors/ProfessorPlans.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useProfessorStore } from '@/stores/professors'
import { useSubscriptionStore } from '@/stores/subscriptions'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const professorStore = useProfessorStore()
const subscriptionStore = useSubscriptionStore()
const authStore = useAuthStore()
const toast = useToast()

const { current, loading } = storeToRefs(professorStore)
const selectedPlan = ref(null)
const submittingPlanId = ref(null)

useHead({
  title: computed(() => current.value?.name || 'Professeur'),
})

onMounted(async () => {
  await professorStore.fetchProfessor(route.params.id)
  if (authStore.isAuthenticated) {
    subscriptionStore.fetchMy()
  }
})

const activePlanIds = computed(() => new Set(subscriptionStore.active.map((item) => item.planId)))

const handleSubscribe = async (plan) => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }

  selectedPlan.value = plan
}

const confirmSubscribe = async () => {
  if (!selectedPlan.value) return

  submittingPlanId.value = selectedPlan.value.id
  try {
    await subscriptionStore.subscribe({
      planId: selectedPlan.value.id,
      paymentRef: `MANUAL-${Date.now()}`,
    })
    toast.push({
      title: 'Abonnement activé',
      message: 'Votre accès étudiant a bien été enregistré.',
      tone: 'success',
    })
    selectedPlan.value = null
    router.push('/tableau-de-bord')
  } catch (error) {
    toast.push({
      title: 'Souscription impossible',
      message: "Le backend n'a pas accepté la demande pour le moment.",
      tone: 'error',
    })
  } finally {
    submittingPlanId.value = null
  }
}
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <div v-if="loading && !current" class="panel flex min-h-80 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement du profil professeur…</p>
    </div>

    <template v-else-if="current">
      <div class="panel-soft overflow-hidden px-6 py-8 md:px-10">
        <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="flex items-start gap-5">
            <img :src="current.avatar" :alt="current.name" class="h-24 w-24 rounded-[28px] object-cover md:h-28 md:w-28" />
            <div>
              <p class="eyebrow mb-3">Profil public</p>
              <h1 class="text-3xl font-semibold">{{ current.name }}</h1>
              <p class="mt-2 text-base text-[var(--color-primary)]">{{ current.specialty }}</p>
              <p class="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">{{ current.bio }}</p>
            </div>
          </div>
          <div class="panel bg-[var(--color-bg)] p-6 text-white">
            <p class="text-sm uppercase tracking-[0.24em] text-white/60">Ce que vous obtenez</p>
            <div class="mt-5 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl bg-white/5 p-4">
                <p class="text-sm text-white/70">Cours</p>
                <p class="mt-2 text-lg font-semibold">Progression structurée</p>
              </div>
              <div class="rounded-2xl bg-white/5 p-4">
                <p class="text-sm text-white/70">Lives</p>
                <p class="mt-2 text-lg font-semibold">Sessions privées</p>
              </div>
              <div class="rounded-2xl bg-white/5 p-4">
                <p class="text-sm text-white/70">Livres PDF</p>
                <p class="mt-2 text-lg font-semibold">Support de référence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 flex items-center justify-between gap-4">
        <div>
          <p class="eyebrow">Plans</p>
          <h2 class="section-title">Choisissez votre accès</h2>
        </div>
        <BaseButton
          v-if="authStore.isAuthenticated && activePlanIds.size"
          variant="secondary"
          @click="router.push('/mes-abonnements')"
        >
          Voir mes abonnements
        </BaseButton>
      </div>

      <div class="mt-6">
        <ProfessorPlans
          :plans="current.plans || []"
          :loading-plan-id="submittingPlanId"
          @subscribe="handleSubscribe"
        />
      </div>
    </template>

    <BaseModal :open="!!selectedPlan" title="Confirmer votre abonnement" @close="selectedPlan = null">
      <div v-if="selectedPlan" class="space-y-6">
        <p class="text-sm leading-7 text-[var(--color-text-soft)]">
          Vous êtes sur le point d'activer
          <strong>{{ selectedPlan.name }}</strong>
          pour accéder aux contenus premium du professeur.
        </p>
        <div class="flex flex-col gap-3 sm:flex-row">
          <BaseButton block @click="confirmSubscribe">Confirmer</BaseButton>
          <BaseButton block variant="secondary" @click="selectedPlan = null">Annuler</BaseButton>
        </div>
      </div>
    </BaseModal>
  </section>
</template>
