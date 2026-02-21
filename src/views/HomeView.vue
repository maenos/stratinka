<script setup>
import { onMounted } from 'vue'
import { useCourseStore } from '../stores/courses'
import CourseCard from '../components/CourseCard.vue'

const courseStore = useCourseStore()

onMounted(() => {
  courseStore.fetchCourses()
})
</script>

<template>
  <div class="min-h-screen bg-base-100 pb-16">
    
    <!-- Hero Section -->
    <section class="relative bg-neutral h-[400px] md:h-[500px] flex items-center overflow-hidden">
      <!-- Background Image Placeholder (Gradient/Pattern) -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-base-100 to-transparent opacity-90 lg:opacity-75"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="bg-base-100 p-8 md:p-10 max-w-lg shadow-xl shadow-base-content/10 rounded-none md:rounded-lg animate-slide-up">
            <h1 class="text-3xl md:text-4xl font-bold mb-4 text-base-content leading-tight">
                Apprenez sans limites
            </h1>
            <p class="text-base-content/70 mb-6 text-lg">
                Développez de nouvelles compétences pour atteindre vos objectifs professionnels et personnels.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
                <router-link to="/courses" class="btn btn-primary btn-lg rounded-none font-bold w-full sm:w-auto">
                    Explorer les cours
                </router-link>
            </div>
        </div>
      </div>
    </section>

    <!-- Trusted By Section -->
    <section class="bg-base-200/50 py-8 border-b border-base-200">
        <div class="container mx-auto px-4 text-center">
            <p class="text-base-content/50 text-sm font-semibold mb-6 uppercase tracking-wider">Les meilleures entreprises nous font confiance</p>
            <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                <!-- Placeholder Logos -->
                <span class="text-xl font-black">Google</span>
                <span class="text-xl font-black">Facebook</span>
                <span class="text-xl font-black">Amazon</span>
                <span class="text-xl font-black">Microsoft</span>
                <span class="text-xl font-black">Netflix</span>
            </div>
        </div>
    </section>

    <!-- Featured Courses Section -->
    <section class="container mx-auto px-4 py-16">
        <div class="flex justify-between items-end mb-10">
            <div>
                <h2 class="text-3xl font-bold mb-2 text-base-content">Une large sélection de cours</h2>
                <p class="text-base-content/60 text-lg">Choisissez parmi plus de 100 000 cours vidéo en ligne.</p>
            </div>
            <router-link to="/courses" class="link link-primary font-bold hidden md:inline-flex hover:no-underline">
              Voir tout les cours
            </router-link>
        </div>

        <div v-if="courseStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-200 h-80 animate-pulse rounded-none">
                <div class="h-40 bg-base-300 w-full"></div>
                <div class="p-4 space-y-4">
                    <div class="h-4 bg-base-300 w-3/4"></div>
                    <div class="h-4 bg-base-300 w-1/2"></div>
                </div>
             </div>
        </div>

        <div v-else-if="courseStore.error" class="alert alert-error shadow-lg rounded-none">
            <span>{{ courseStore.error }}</span>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <template v-for="course in courseStore.courses" :key="course.id">
                 <router-link :to="{ name: 'course-detail', params: { slug: course.slug } }">
                    <CourseCard :course="course" class="h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300" />
                 </router-link>
            </template>
        </div>
        
        <div class="text-center mt-10 md:hidden">
          <router-link to="/courses" class="btn btn-outline btn-wide rounded-none">
            Voir tous les cours
          </router-link>
        </div>
    </section>
    
    <!-- Top Categories -->
    <section class="bg-base-100 py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-2xl font-bold mb-8 text-base-content">Catégories principales</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">💻</span>
                    <span class="font-bold text-lg">Développement</span>
                </a>
                 <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">🎨</span>
                    <span class="font-bold text-lg">Design</span>
                </a>
                 <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">📊</span>
                    <span class="font-bold text-lg">Business</span>
                </a>
                 <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">📣</span>
                    <span class="font-bold text-lg">Marketing</span>
                </a>
                 <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">📸</span>
                    <span class="font-bold text-lg">Photographie</span>
                </a>
                 <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">🎵</span>
                    <span class="font-bold text-lg">Musique</span>
                </a>
                 <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">🌱</span>
                    <span class="font-bold text-lg">Développement personnel</span>
                </a>
                 <a href="#" class="p-4 border border-base-200 hover:bg-base-200/50 hover:shadow-sm transition-all flex flex-col gap-2 group">
                    <span class="text-3xl group-hover:scale-110 transition-transform origin-left">🏥</span>
                    <span class="font-bold text-lg">Santé et bien-être</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Instructor CTA -->
    <section class="container mx-auto px-4 py-16">
        <div class="flex flex-col md:flex-row items-center gap-12 border border-base-200 p-8 md:p-0 shadow-sm">
            <div class="w-full md:w-1/2 h-64 md:h-96">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" alt="Instructor" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div class="w-full md:w-1/2 p-4 md:p-8 text-center md:text-left">
                <h2 class="text-3xl font-bold mb-4">Devenez formateur</h2>
                <p class="text-lg text-base-content/70 mb-8 leading-relaxed">
                    Formateurs du monde entier, enseignez à des millions d'étudiants sur Stratinka. Nous vous offrons les outils et les compétences pour enseigner ce que vous aimez.
                </p>
                <button class="btn btn-neutral btn-lg rounded-none w-full md:w-auto">Commencer à enseigner</button>
            </div>
        </div>
    </section>

    <!-- Business CTA -->
    <section class="container mx-auto px-4 pb-16">
        <div class="flex flex-col md:flex-row-reverse items-center gap-12 border border-base-200 p-8 md:p-0 shadow-sm">
            <div class="w-full md:w-1/2 h-64 md:h-96">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" alt="Business" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div class="w-full md:w-1/2 p-4 md:p-8 text-center md:text-left">
                <div class="text-2xl font-black mb-2 flex items-center justify-center md:justify-start gap-2">
                    <span class="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-sm">S</span>
                    Stratinka Business
                </div>
                <h2 class="text-3xl font-bold mb-4">Formez vos équipes</h2>
                <p class="text-lg text-base-content/70 mb-8 leading-relaxed">
                    Offrez à vos équipes un accès illimité à plus de 19 000 des meilleurs cours Stratinka, n'importe où, n'importe quand.
                </p>
                <button class="btn btn-neutral btn-lg rounded-none w-full md:w-auto">Découvrir Stratinka Business</button>
            </div>
        </div>
    </section>

  </div>
</template>
