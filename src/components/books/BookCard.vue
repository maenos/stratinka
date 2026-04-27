<script setup>
defineProps({
  book: { type: Object, required: true },
})

defineEmits(['open'])

import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
  <article class="panel flex h-full flex-col gap-5 p-5">
    <img
      :src="book.coverImage"
      :alt="book.title"
      class="h-72 w-full rounded-2xl object-cover"
    />
    <div class="flex flex-1 flex-col gap-4">
      <h3 class="text-lg font-semibold">{{ book.title }}</h3>
      <BaseButton block variant="secondary" @click="$emit('open', book)">
        Ouvrir le lecteur sécurisé
      </BaseButton>
    </div>
  </article>
</template>
