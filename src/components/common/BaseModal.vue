<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[color:rgb(9_14_25_/_0.72)] px-4 py-8 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div class="panel w-full max-w-lg p-6">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 v-if="title" class="text-xl font-semibold">{{ title }}</h3>
          </div>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]"
            @click="emit('close')"
          >
            ×
          </button>
        </div>
        <slot />
      </div>
    </div>
  </teleport>
</template>
