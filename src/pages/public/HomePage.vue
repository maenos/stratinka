<script setup>
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'

import ProfessorCard from '@/components/professors/ProfessorCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useProfessorStore } from '@/stores/professors'

const professorStore = useProfessorStore()
const { list } = storeToRefs(professorStore)

useHead({ title: 'Accueil' })

onMounted(() => {
  if (!list.value.length) {
    professorStore.fetchProfessors()
  }
})

const featured = computed(() => list.value.slice(0, 3))
</script>

<template>
  <section class="page-shell py-10 md:py-16">
    <div class="panel-soft bg-grid overflow-hidden px-6 py-12 md:px-10 md:py-14">
      <div class="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p class="eyebrow">Mentorat premium</p>
          <h1 class="headline max-w-3xl">
            Abonnez-vous aux professeurs qui vous correspondent et suivez uniquement le contenu qui compte.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Cours, lives privés et livres PDF dans une expérience plus claire, plus sélective et mieux structurée pour les étudiants.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <router-link to="/catalogue">
              <BaseButton size="lg">Explorer les professeurs</BaseButton>
            </router-link>
            <router-link to="/temoignages">
              <BaseButton variant="secondary" size="lg">Voir les retours étudiants</BaseButton>
            </router-link>
          </div>
        </div>
        <div class="grid gap-4">
          <div class="panel bg-[var(--color-bg)] p-6 text-white">
            <p class="text-sm uppercase tracking-[0.24em] text-white/60">Expérience étudiante</p>
            <div class="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p class="text-3xl font-semibold">01</p>
                <p class="mt-2 text-sm text-white/75">Choisissez un professeur</p>
              </div>
              <div>
                <p class="text-3xl font-semibold">02</p>
                <p class="mt-2 text-sm text-white/75">Activez votre plan</p>
              </div>
              <div>
                <p class="text-3xl font-semibold">03</p>
                <p class="mt-2 text-sm text-white/75">Accédez à ses contenus premium</p>
              </div>
            </div>
          </div>
          <div class="panel p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Pourquoi Stratinka</p>
            <ul class="mt-4 grid gap-3 text-sm text-[var(--color-text-soft)]">
              <li>Interface pensée pour l’abonnement par professeur</li>
              <li>Accès contrôlé aux contenus premium</li>
              <li>Navigation claire entre cours, lives et livres</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="page-shell py-8 md:py-12">
    <div class="mb-8 flex items-end justify-between gap-6">
      <div>
        <p class="eyebrow">Professeurs en vue</p>
        <h2 class="section-title">Mentors sélectionnés</h2>
      </div>
      <router-link to="/catalogue" class="text-sm font-semibold text-[var(--color-primary)]">
        Voir tout le catalogue
      </router-link>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <ProfessorCard
        v-for="professor in featured"
        :key="professor.id"
        :professor="professor"
      />
    </div>
  </section>
</template>
