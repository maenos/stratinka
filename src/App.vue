<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHead } from '@unhead/vue'

import ToastNotif from '@/components/common/ToastNotif.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const toast = useToast()
const { initializing } = storeToRefs(authStore)

useHead({
  titleTemplate: (title) => (title ? `${title} | Stratinka` : 'Stratinka'),
  meta: [
    {
      name: 'description',
      content:
        "Plateforme d'apprentissage par abonnement pour suivre les contenus premium de vos professeurs favoris.",
    },
  ],
})

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <div class="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
    <div
      v-if="initializing"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[color:rgb(10_16_28_/_0.65)] backdrop-blur-sm"
    >
      <LoadingSpinner label="Initialisation de votre espace étudiant..." />
    </div>

    <router-view />
    <ToastNotif :items="toast.items" @dismiss="toast.remove" />
  </div>
</template>
