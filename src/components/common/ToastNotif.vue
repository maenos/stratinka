<script setup>
defineProps({
  items: { type: Array, default: () => [] },
})

const emit = defineEmits(['dismiss'])

const toneClasses = {
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
}
</script>

<template>
  <div class="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3">
    <div
      v-for="item in items"
      :key="item.id"
      :class="[
        'pointer-events-auto rounded-2xl border px-4 py-4 shadow-xl',
        toneClasses[item.tone] || toneClasses.info,
      ]"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p v-if="item.title" class="text-sm font-semibold">{{ item.title }}</p>
          <p class="mt-1 text-sm">{{ item.message }}</p>
        </div>
        <button class="text-lg leading-none" @click="emit('dismiss', item.id)">×</button>
      </div>
    </div>
  </div>
</template>
