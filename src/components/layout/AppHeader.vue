<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import BaseButton from '@/components/common/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { student } = storeToRefs(authStore)

const navItems = [
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Témoignages', to: '/temoignages' },
]

const privateItems = [
  { label: 'Tableau de bord', to: '/tableau-de-bord' },
  { label: 'Mes abonnements', to: '/mes-abonnements' },
]

const isAuthPage = computed(() => ['login', 'register'].includes(route.name))

const logout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
    <div class="page-shell flex h-20 items-center justify-between gap-6">
      <router-link to="/" class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-lg font-bold text-white shadow-[var(--shadow-lift)]"
        >
          S
        </div>
        <div>
          <div class="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">
            Stratinka
          </div>
          <div class="text-xs text-[var(--color-text-soft)]">Apprentissage par mentorat premium</div>
        </div>
      </router-link>

      <nav class="hidden items-center gap-6 lg:flex">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
        >
          {{ item.label }}
        </router-link>
        <router-link
          v-for="item in privateItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="flex items-center gap-3">
        <template v-if="student">
          <router-link
            to="/mon-profil"
            class="hidden rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium md:block"
          >
            {{ student.name }}
          </router-link>
          <BaseButton variant="secondary" size="sm" @click="logout">Déconnexion</BaseButton>
        </template>
        <template v-else-if="!isAuthPage">
          <router-link to="/connexion">
            <BaseButton variant="ghost" size="sm">Connexion</BaseButton>
          </router-link>
          <router-link to="/inscription">
            <BaseButton size="sm">Créer un compte</BaseButton>
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>
