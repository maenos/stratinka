<script setup>
const model = defineModel({ default: '' })

defineProps({
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  autocomplete: { type: String, default: '' },
})
</script>

<template>
  <label class="flex flex-col gap-2 text-sm">
    <span v-if="label" class="font-medium text-[var(--color-text)]">{{ label }}</span>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="h-12 rounded-2xl border border-[var(--color-border)] bg-white px-4 outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[color:rgb(15_76_221_/_0.12)]"
    />
    <span v-if="error" class="text-xs text-[var(--color-danger)]">{{ error }}</span>
  </label>
</template>
