<script setup>
import { useHead } from '@unhead/vue'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

useHead({ title: 'Mon profil' })
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <div class="panel mx-auto max-w-3xl p-8">
      <p class="eyebrow">Profil étudiant</p>
      <h1 class="section-title">Vos informations</h1>
      <div class="mt-8 grid gap-4 text-sm md:grid-cols-2">
        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p class="text-[var(--color-text-soft)]">Nom</p>
          <p class="mt-2 text-base font-semibold">{{ authStore.student?.name || '—' }}</p>
        </div>
        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p class="text-[var(--color-text-soft)]">Email</p>
          <p class="mt-2 text-base font-semibold">{{ authStore.student?.email || '—' }}</p>
        </div>
        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:col-span-2">
          <p class="text-[var(--color-text-soft)]">Email vérifié le</p>
          <p class="mt-2 text-base font-semibold">
            {{
              authStore.student?.emailVerifiedAt
                ? new Date(authStore.student.emailVerifiedAt).toLocaleString('fr-FR')
                : 'Non vérifié'
            }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
