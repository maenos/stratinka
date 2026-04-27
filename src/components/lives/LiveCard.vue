<script setup>
defineProps({
  live: { type: Object, required: true },
})
</script>

<template>
  <article class="panel flex h-full flex-col gap-4 p-6">
    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Live</p>
    <h3 class="text-lg font-semibold">{{ live.title }}</h3>
    <p class="text-sm text-[var(--color-text-soft)]">
      {{ new Date(live.scheduledAt).toLocaleString('fr-FR') }}
    </p>
    <a
      :href="live.meetLink"
      target="_blank"
      rel="noreferrer"
      class="mt-auto inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white"
    >
      Rejoindre le live
    </a>
  </article>
</template>
