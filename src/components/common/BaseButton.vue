<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})

const classes = computed(() => {
  const variants = {
    primary:
      'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)] shadow-[var(--shadow-lift)]',
    secondary:
      'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)]',
    ghost: 'bg-transparent text-[var(--color-text)] hover:bg-white/80',
    danger: 'bg-[var(--color-danger)] text-white hover:bg-red-700',
  }

  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return [
    'inline-flex items-center justify-center rounded-full font-medium',
    'disabled:cursor-not-allowed disabled:opacity-60',
    props.block ? 'w-full' : '',
    variants[props.variant],
    sizes[props.size],
  ]
})
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
