<script setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import LiveCard from '@/components/lives/LiveCard.vue'
import { useLivesStore } from '@/stores/lives'

const route = useRoute()
const livesStore = useLivesStore()
const { list, loading } = storeToRefs(livesStore)

useHead({ title: 'Lives' })

onMounted(() => {
  livesStore.fetchLives(route.params.profId)
})
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <p class="eyebrow">Lives</p>
    <h1 class="section-title">Sessions programmées</h1>

    <div v-if="loading" class="panel mt-6 flex min-h-44 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement…</p>
    </div>

    <div v-else class="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <LiveCard v-for="live in list" :key="live.id" :live="live" />
    </div>
  </section>
</template>
