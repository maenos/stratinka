<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)

useHead({ title: 'Connexion' })

const submit = async () => {
  loading.value = true
  try {
    await authStore.login({ email: email.value, password: password.value })
    router.push(route.query.redirect || '/tableau-de-bord')
  } catch (error) {
    toast.push({
      title: 'Connexion impossible',
      message: error.response?.data?.message || 'Vérifiez vos identifiants ou la disponibilité du backend.',
      tone: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="page-shell py-10 md:py-16">
    <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="panel bg-[var(--color-bg)] p-8 text-white">
        <p class="eyebrow border-white/20 bg-white/5 text-white">Connexion</p>
        <h1 class="text-3xl font-semibold leading-tight">Retrouvez vos accès, vos professeurs et vos contenus premium.</h1>
        <p class="mt-5 text-sm leading-7 text-white/75">
          La connexion est compatible Sanctum cookie/session, avec rechargement automatique du profil étudiant.
        </p>
      </div>

      <div class="panel p-8">
        <h2 class="text-2xl font-semibold">Se connecter</h2>
        <div class="mt-6 grid gap-5">
          <BaseInput v-model="email" label="Adresse email" type="email" autocomplete="email" />
          <BaseInput
            v-model="password"
            label="Mot de passe"
            type="password"
            autocomplete="current-password"
          />
          <BaseButton :disabled="loading" @click="submit">
            {{ loading ? 'Connexion...' : 'Accéder à mon espace' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
