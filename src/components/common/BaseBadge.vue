<script setup>
defineProps({
  tone: { type: String, default: 'neutral' },
})

const tones = {
  neutral: 'bg-slate-100 text-slate-700',
  primary: 'bg-blue-100 text-blue-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
      tones[tone] || tones.neutral,
    ]"
  >
    <slot />
  </span>
</template>
