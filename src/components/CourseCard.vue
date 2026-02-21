<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  }
})

const formatPrice = (price) => {
  return price === 0 ? 'Gratuit' : `${price} €`
}
</script>

<template>
  <div class="card bg-base-100 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 border border-base-200/50 rounded-xl overflow-hidden flex flex-col h-full cursor-pointer group hover:-translate-y-1">
    <figure class="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
      <img :src="course.thumbnail" :alt="course.title" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="absolute top-3 right-3 badge badge-primary bg-primary/90 backdrop-blur-sm text-primary-content border-0 text-xs font-bold shadow-lg">
        {{ course.category }}
      </div>
    </figure>
    <div class="card-body p-5 flex-1 flex flex-col">
      <h2 class="card-title text-base font-bold line-clamp-2 leading-tight mb-2 text-base-content group-hover:text-primary transition-colors">
        {{ course.title }}
      </h2>
      <p class="text-xs text-base-content/60 mb-3 flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        {{ course.author.name }}
      </p>
      
      <div class="flex items-center text-xs mb-4 gap-3 flex-wrap">
        <span class="font-bold text-warning flex items-center gap-1">
            {{ course.rating }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        </span>
        <span class="text-base-content/50">({{ course.students.toLocaleString() }})</span>
        <span class="text-base-content/30">•</span>
        <span class="text-base-content/60 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
          {{ course.duration }}
        </span>
      </div>

      <div class="card-actions justify-between items-center mt-auto pt-3 border-t border-base-200/50">
        <div class="font-bold text-xl" :class="course.price === 0 ? 'text-success' : 'text-primary'">
            {{ formatPrice(course.price) }}
        </div>
        <div class="badge badge-outline badge-sm text-base-content/60 border-base-content/20">
            {{ course.level }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional custom styles if tailwind isn't enough */
</style>
