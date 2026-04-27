<script setup>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'

import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useTestimonialStore } from '@/stores/testimonials'
import { useToast } from '@/composables/useToast'

const testimonialStore = useTestimonialStore()
const toast = useToast()

const content = ref('')
const rating = ref('5')

useHead({ title: 'Témoignages' })

const sampleTestimonials = [
  {
    id: 1,
    author: 'Rokia S.',
    quote: 'La navigation est plus simple, et je trouve enfin mes contenus par professeur sans me perdre.',
  },
  {
    id: 2,
    author: 'Ismaël K.',
    quote: 'Les plans sont clairs, les lives sont mieux identifiables, et le suivi est plus professionnel.',
  },
]

const submit = async () => {
  try {
    await testimonialStore.submit({ content: content.value, rating: Number(rating.value) })
    toast.push({
      title: 'Témoignage envoyé',
      message: 'Merci pour votre retour. Il sera relu avant publication.',
      tone: 'success',
    })
    content.value = ''
    rating.value = '5'
  } catch (error) {
    toast.push({
      title: 'Envoi impossible',
      message: "Le backend n'a pas pu enregistrer votre témoignage.",
      tone: 'error',
    })
  }
}
</script>

<template>
  <section class="page-shell py-10 md:py-14">
    <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="panel-soft p-8">
        <p class="eyebrow">Retours étudiants</p>
        <h1 class="section-title">Ce que les étudiants apprécient dans la nouvelle expérience</h1>
        <div class="mt-8 space-y-5">
          <article
            v-for="testimonial in sampleTestimonials"
            :key="testimonial.id"
            class="rounded-[24px] border border-[var(--color-border)] bg-white p-5"
          >
            <p class="text-base leading-8">“{{ testimonial.quote }}”</p>
            <p class="mt-3 text-sm font-semibold text-[var(--color-primary)]">{{ testimonial.author }}</p>
          </article>
        </div>
      </div>

      <div class="panel p-8">
        <p class="eyebrow">Votre avis</p>
        <h2 class="text-2xl font-semibold">Envoyer un témoignage</h2>
        <div class="mt-6 grid gap-5">
          <BaseInput v-model="rating" label="Note sur 5" type="number" />
          <label class="flex flex-col gap-2 text-sm">
            <span class="font-medium">Votre retour</span>
            <textarea
              v-model="content"
              rows="6"
              class="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[color:rgb(15_76_221_/_0.12)]"
              placeholder="Décrivez votre expérience avec les contenus ou la plateforme..."
            ></textarea>
          </label>
          <BaseButton :disabled="testimonialStore.loading || !content.trim()" @click="submit">
            {{ testimonialStore.loading ? 'Envoi...' : 'Envoyer mon témoignage' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
