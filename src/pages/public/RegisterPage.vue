<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const loading = ref(false)

useHead({ title: 'Inscription' })

const submit = async () => {
  loading.value = true
  try {
    await authStore.register(form.value)
    router.push('/tableau-de-bord')
  } catch (error) {
    toast.push({
      title: 'Inscription impossible',
      message: error.response?.data?.message || "Le compte n'a pas pu être créé pour l'instant.",
      tone: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="page-shell py-10 md:py-16">
    <div class="mx-auto max-w-3xl panel p-8 md:p-10">
      <p class="eyebrow">Inscription</p>
      <h1 class="section-title">Créer votre espace étudiant</h1>
      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <BaseInput v-model="form.name" label="Nom complet" autocomplete="name" />
        <BaseInput v-model="form.email" label="Adresse email" type="email" autocomplete="email" />
        <BaseInput
          v-model="form.password"
          label="Mot de passe"
          type="password"
          autocomplete="new-password"
        />
        <BaseInput
          v-model="form.password_confirmation"
          label="Confirmation"
          type="password"
          autocomplete="new-password"
        />
      </div>
      <div class="mt-8">
        <BaseButton :disabled="loading" @click="submit">
          {{ loading ? 'Création...' : 'Créer mon compte' }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
