<script setup>
import { computed, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'

import BookCard from '@/components/books/BookCard.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { buildClientStreamUrl } from '@/api'
import { useBooksStore } from '@/stores/books'

const booksStore = useBooksStore()
const { list, loading } = storeToRefs(booksStore)
const selectedBook = ref(null)

useHead({ title: 'Livres PDF' })

onMounted(() => {
  booksStore.fetchBooks()
})

const readerUrl = computed(() =>
  selectedBook.value ? buildClientStreamUrl(`/books/${selectedBook.value.id}/stream`) : '',
)
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <p class="eyebrow">Bibliothèque</p>
    <h1 class="section-title">Livres PDF sécurisés</h1>

    <div v-if="loading" class="panel mt-6 flex min-h-44 items-center justify-center">
      <p class="text-sm text-[var(--color-text-soft)]">Chargement…</p>
    </div>

    <div v-else class="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <BookCard v-for="book in list" :key="book.id" :book="book" @open="selectedBook = $event" />
    </div>

    <BaseModal :open="!!selectedBook" :title="selectedBook?.title" @close="selectedBook = null">
      <iframe
        v-if="readerUrl"
        :src="readerUrl"
        class="min-h-[70vh] w-full rounded-2xl border border-[var(--color-border)]"
        title="Lecteur PDF sécurisé"
      ></iframe>
    </BaseModal>
  </section>
</template>
