<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseStore } from '../stores/courses'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const courseStore = useCourseStore()
const authStore = useAuthStore()

const loadCourse = () => {
    courseStore.fetchCourseBySlug(route.params.slug)
}

onMounted(loadCourse)
watch(() => route.params.slug, loadCourse)

const formatDuration = (seconds) => {
    // Simple mock formatting, assume lessons have string duration "MM:SS"
    return seconds
}
</script>

<template>
  <div class="min-h-screen bg-base-100 pb-12">
    
    <!-- Loading/Error States -->
    <div v-if="courseStore.loading" class="container mx-auto p-8 flex justify-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="courseStore.error" class="container mx-auto p-8">
        <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{{ courseStore.error }}</span>
        </div>
        <router-link to="/courses" class="btn btn-link mt-4">Retour aux cours</router-link>
    </div>

    <div v-else-if="courseStore.currentCourse" class="animate-fade-in">
        
        <!-- Header / Hero Course -->
        <header class="bg-base-200 text-base-content py-12">
            <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                <!-- Left Content -->
                <div class="lg:col-span-2 space-y-4">
                    <div class="badge badge-primary font-bold">{{ courseStore.currentCourse.category }}</div>
                    <h1 class="text-3xl md:text-4xl font-extrabold">{{ courseStore.currentCourse.title }}</h1>
                    <p class="text-xl opacity-90 leading-relaxed">{{ courseStore.currentCourse.description }}</p>
                    
                    <div class="flex flex-wrap gap-4 items-center text-sm mt-4">
                        <div class="flex items-center gap-2">
                            <span class="text-yellow-500 font-bold flex items-center">
                                {{ courseStore.currentCourse.rating }}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            </span>
                            <span class="opacity-70">({{ courseStore.currentCourse.students.toLocaleString() }} avis)</span>
                        </div>
                        <div class="flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                             <span>Créé par <span class="font-bold underline cursor-pointer">{{ courseStore.currentCourse.author.name }}</span></span>
                        </div>
                         <div class="flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             <span>Dernière mise à jour 02/2026</span>
                        </div>
                         <div class="flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                             <span>Français</span>
                        </div>
                    </div>
                </div>

                <!-- Sticky Sidebar (Right) - Purchase Card -->
                <div class="hidden lg:block">
                     <!-- Placeholder, will be styled below in main content to stick -->
                </div>

            </div>
        </header>

        <div class="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8 relative">
            
            <!-- Main Content Area -->
            <div class="lg:w-2/3 space-y-8">
                
                <!-- What you'll learn -->
                <div class="border border-base-200 rounded-lg p-6 bg-base-100">
                    <h2 class="text-xl font-bold mb-4">Ce que vous allez apprendre</h2>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <li v-for="(item, index) in courseStore.currentCourse.whatYouWillLearn" :key="index" class="flex gap-2 items-start">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                             <span>{{ item }}</span>
                        </li>
                    </ul>
                </div>

                <!-- Curriculum -->
                <div>
                     <h2 class="text-xl font-bold mb-4">Contenu du cours</h2>
                     
                     <div v-for="(section, idx) in courseStore.currentCourse.sections" :key="idx" class="collapse collapse-arrow border border-base-200 bg-base-100 mb-2 rounded-box">
                        <input type="checkbox" :checked="idx === 0" /> 
                        <div class="collapse-title text-base font-medium bg-base-200/50">
                            {{ section.title }}
                            <span class="text-xs font-normal opacity-60 ml-2 block sm:inline sm:ml-4">{{ section.lessons.length }} sessions</span>
                        </div>
                        <div class="collapse-content px-0 pb-0">
                            <ul class="menu w-full p-0 [&_li>*]:rounded-none">
                                <li v-for="lesson in section.lessons" :key="lesson.id" class="border-b border-base-200 last:border-none">
                                    <a class="flex justify-between py-3 hover:bg-base-200 cursor-default">
                                        <div class="flex gap-3 items-center">
                                            <svg v-if="lesson.type === 'video'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
                                            <svg v-else-if="lesson.type === 'quiz'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H8z" clip-rule="evenodd" /></svg>
                                            <span class="text-sm">{{ lesson.title }}</span>
                                        </div>
                                        <span class="text-xs opacity-60">{{ lesson.duration }}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Requirements / Description -->
                <div class="prose max-w-none">
                    <h3>Description</h3>
                    <p>{{ courseStore.currentCourse.description }}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

            </div>

             <!-- Floating Sidebar -->
             <div class="lg:w-1/3 order-first lg:order-last relative">
                <div class="sticky top-24">
                     <div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                        <!-- Preview Video / Image -->
                        <div class="relative aspect-video bg-black group cursor-pointer">
                            <img :src="courseStore.currentCourse.thumbnail" class="w-full h-full object-cover opacity-80" />
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="bg-white rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                                     <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black ml-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
                                </div>
                            </div>
                            <div class="absolute bottom-4 left-0 right-0 text-center font-bold text-white drop-shadow-md">
                                Aperçu du cours
                            </div>
                        </div>

                        <div class="card-body p-6">
                            <div class="text-3xl font-bold mb-4">
                                {{ courseStore.currentCourse.price === 0 ? 'Gratuit' : courseStore.currentCourse.price + ' €' }}
                            </div>

                            <button class="btn btn-primary btn-lg w-full mb-3" @click="authStore.isAuthenticated ? $router.push(`/course/${courseStore.currentCourse.slug}/learn`) : $router.push('/login')">
                                {{ courseStore.currentCourse.price === 0 ? "S'inscrire gratuitement" : "Ajouter au panier" }}
                            </button>
                            <button class="btn btn-outline w-full">Acheter maintenant</button>
                            
                            <div class="text-center text-xs opacity-60 mt-4">Garantie satisfait ou remboursé de 30 jours</div>

                            <div class="divider"></div>

                            <div class="text-sm space-y-2">
                                <p class="font-bold mb-2">Ce cours comprend :</p>
                                <div class="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/></svg> {{ courseStore.currentCourse.duration }} de vidéo à la demand</div>
                                <div class="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H8z" clip-rule="evenodd" /></svg> 2 articles</div>
                                <div class="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" /></svg> Accès illimité</div>
                                <div class="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg> Accès sur mobiles et TV</div>
                            </div>
                        </div>
                     </div>
                </div>
             </div>

        </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the sticky sidebar doesn't overlap header if z-index issues arise, though standard sticky works well */
</style>
