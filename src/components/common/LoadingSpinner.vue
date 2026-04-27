<script setup>
defineProps({
  label: { type: String, default: 'Chargement...' },
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div
      class="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[var(--color-primary)]"
    ></div>
    <p class="text-sm font-medium text-white/90">{{ label }}</p>
  </div>
</template>
