<script setup>
import { computed, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'

import ProfessorCard from '@/components/professors/ProfessorCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useProfessorStore } from '@/stores/professors'

const professorStore = useProfessorStore()
const { list, loading } = storeToRefs(professorStore)
const search = ref('')

useHead({ title: 'Catalogue des professeurs' })

onMounted(() => {
  professorStore.fetchProfessors()
})

const filtered = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return list.value
  return list.value.filter((professor) =>
    [professor.name, professor.specialty, professor.bio].join(' ').toLowerCase().includes(query),
  )
})
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="eyebrow">Catalogue</p>
        <h1 class="section-title">Trouvez le professeur qui correspond à votre tempo</h1>
      </div>
      <div class="w-full max-w-md">
        <BaseInput v-model="search" placeholder="Rechercher un professeur, une spécialité..." />
      </div>
    </div>

    <div v-if="loading" class="panel flex min-h-60 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement du catalogue…</p>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ProfessorCard
        v-for="professor in filtered"
        :key="professor.id"
        :professor="professor"
      />
    </div>
  </section>
</template>
