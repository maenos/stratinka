<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '../stores/courses'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

const activeTab = ref('overview')
const sidebarOpen = ref(true)
const currentLesson = ref(null)

// Initialize
onMounted(async () => {
    const slug = route.params.slug
    await courseStore.fetchCourseBySlug(slug)
    
    // Select first lesson by default if available
    if (courseStore.currentCourse?.sections?.length > 0) {
        const firstSection = courseStore.currentCourse.sections[0]
        if (firstSection.lessons?.length > 0) {
            currentLesson.value = firstSection.lessons[0]
        }
    }
})

// Auto-calculate progress
const progress = computed(() => {
    if (!courseStore.currentCourse?.sections) return 0
    let totalLessons = 0
    let completedLessons = 0
    
    courseStore.currentCourse.sections.forEach(section => {
        section.lessons.forEach(lesson => {
            totalLessons++
            if (lesson.completed) completedLessons++
        })
    })
    
    return totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100)
})

const selectLesson = (lesson) => {
    currentLesson.value = lesson
}

const toggleLessonCompletion = (lesson) => {
    lesson.completed = !lesson.completed
}

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="flex flex-col h-screen bg-base-100 overflow-hidden">
    
    <!-- Top Learning Navigation (Dark/Distinct) -->
    <header class="h-14 bg-neutral text-neutral-content flex items-center justify-between px-4 shadow-md z-20 shrink-0">
        <div class="flex items-center gap-4">
             <router-link to="/my-courses" class="btn btn-ghost btn-sm btn-circle text-neutral-content/70 hover:text-white hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </router-link>
            <div class="divider divider-horizontal mx-0 bg-neutral-content/20 w-px h-6"></div>
            <h1 class="font-bold text-sm md:text-base truncate max-w-[200px] md:max-w-md">
                {{ courseStore.currentCourse?.title || 'Chargement...' }}
            </h1>
        </div>
        
        <div class="flex items-center gap-3">
             <div class="hidden md:flex flex-col items-end mr-2">
                 <span class="text-xs text-neutral-content/70">Progression</span>
                 <div class="flex items-center gap-2">
                     <progress class="progress progress-success w-24 h-2 bg-neutral-content/20" :value="progress" max="100"></progress>
                     <span class="text-xs font-bold">{{ progress }}%</span>
                 </div>
             </div>
             <button class="btn btn-ghost btn-sm btn-circle text-neutral-content/70 hover:text-white hover:bg-white/10 md:hidden">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.89-2.019l-4.257-2.129a2.98 2.98 0 000-1.022l4.257-2.129a2.977 2.977 0 002.087-1.37zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm-10 6a1 1 0 110-2 1 1 0 010 2zm10 4a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
             </button>
             <button class="btn btn-outline btn-sm text-neutral-content border-neutral-content/30 hover:bg-white/10 hover:border-neutral-content/50 gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.89-2.019l-4.257-2.129a2.98 2.98 0 000-1.022l4.257-2.129a2.977 2.977 0 002.087-1.37zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm-10 6a1 1 0 110-2 1 1 0 010 2zm10 4a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                 Partager
             </button>
        </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
        
        <!-- Main Content Area (Video + Tabs) -->
        <main class="flex-1 flex flex-col overflow-y-auto bg-base-100 relative">
            
            <!-- Video Container -->
            <div class="bg-black w-full aspect-video relative group flex items-center justify-center">
                 <template v-if="currentLesson?.type === 'video'">
                     <!-- Placeholder for actual video player -->
                     <div class="text-white text-center">
                         <div class="mb-4">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto opacity-80 group-hover:scale-110 transition-transform cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                             </svg>
                         </div>
                         <h2 class="text-xl font-bold">{{ currentLesson?.title }}</h2>
                         <p class="text-sm opacity-70 mt-2">Cliquez pour lire la vidéo</p>
                     </div>
                 </template>
                 <template v-else>
                     <div class="text-white text-center p-8">
                         <span class="text-4xl block mb-4">📄</span>
                         <h2 class="text-xl font-bold">{{ currentLesson?.title }}</h2>
                         <p class="text-sm opacity-70 mt-2">Contenu texte / article</p>
                         <button class="btn btn-primary mt-4">Lire l'article</button>
                     </div>
                 </template>

                 <!-- Next/Prev Overlay (optional) -->
                 <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            </div>

            <!-- Content Navigation & Tabs -->
            <div class="container mx-auto px-4 py-6 max-w-5xl">
                
                <!-- Lesson Header -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-base-200 pb-6">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">{{ currentLesson?.title || 'Sélectionnez une leçon' }}</h2>
                        <p class="text-base-content/60 text-sm">Dernière mise à jour il y a 2 jours</p>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="tabs tabs-bordered mb-8">
                    <a class="tab tab-lg px-6" :class="{ 'tab-active': activeTab === 'overview' }" @click="activeTab = 'overview'">Aperçu</a>
                    <a class="tab tab-lg px-6" :class="{ 'tab-active': activeTab === 'qa' }" @click="activeTab = 'qa'">Q&R</a>
                    <a class="tab tab-lg px-6" :class="{ 'tab-active': activeTab === 'notes' }" @click="activeTab = 'notes'">Notes</a>
                    <a class="tab tab-lg px-6" :class="{ 'tab-active': activeTab === 'resources' }" @click="activeTab = 'resources'">Ressources</a>
                </div>

                <!-- Tab Content -->
                <div class="min-h-[300px]">
                    <div v-if="activeTab === 'overview'" class="animate-fade-in space-y-6">
                        <div class="prose max-w-none">
                            <h3 class="text-xl font-semibold mb-4">À propos de cette leçon</h3>
                            <p class="text-base-content/80 leading-relaxed">
                                Dans cette section, nous allons explorer les concepts fondamentaux qui vous permettront de maîtriser le sujet.
                                Préparez-vous à prendre des notes et à pratiquer en même temps.
                            </p>
                            
                            <div class="alert alert-info shadow-sm mt-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Astuce : N'oubliez pas de télécharger les fichiers sources dans l'onglet Ressources.</span>
                            </div>
                        </div>
                        
                        <div class="divider"></div>
                        
                        <div class="flex items-center gap-4">
                            <div class="avatar">
                                <div class="w-12 rounded-full">
                                    <img :src="courseStore.currentCourse?.author?.avatar" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">{{ courseStore.currentCourse?.author?.name }}</div>
                                <div class="text-xs opacity-60">Instructeur Principal</div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-else class="flex flex-col items-center justify-center py-12 text-center text-base-content/50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p>Le contenu de cet onglet sera bientôt disponible.</p>
                    </div>
                </div>

            </div>
        </main>

        <!-- Sidebar (Curriculum) -->
        <aside 
            class="bg-base-100 border-l border-base-200 shadow-xl z-10 transition-all duration-300 flex flex-col shrink-0" 
            :class="sidebarOpen ? 'w-80 md:w-96' : 'w-0 overflow-hidden'"
        >
            <div class="p-4 border-b border-base-200 h-14 flex items-center justify-between bg-base-100 sticky top-0">
                <h3 class="font-bold text-sm uppercase tracking-wide opacity-70">Contenu du cours</h3>
                <button @click="toggleSidebar" class="btn btn-xs btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            
            <div class="flex-1 overflow-y-auto scrollbar-thin">
                <div v-for="(section, index) in courseStore.currentCourse?.sections" :key="index" class="collapse collapse-arrow rounded-none border-b border-base-200/50">
                    <input type="checkbox" :checked="index === 0" /> 
                    <div class="collapse-title bg-base-200/30 text-sm font-bold flex items-center gap-2 pr-8 min-h-[3rem] py-3">
                        <span class="truncate">{{ section.title }}</span>
                        <span class="ml-auto text-xs font-normal opacity-60 shrink-0">{{ section.lessons.length }} leçons</span>
                    </div>
                    <div class="collapse-content p-0 bg-base-100">
                        <ul class="menu w-full p-0">
                            <li v-for="lesson in section.lessons" :key="lesson.id">
                                <a 
                                    class="py-3 px-4 rounded-none border-l-4 transition-all flex gap-3 text-sm"
                                    :class="currentLesson?.id === lesson.id ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-transparent hover:bg-base-200/50'"
                                    @click="selectLesson(lesson)"
                                >
                                    <input 
                                        type="checkbox" 
                                        class="checkbox checkbox-xs checkbox-primary rounded-sm mt-0.5" 
                                        :checked="lesson.completed" 
                                        @click.stop="toggleLessonCompletion(lesson)"
                                    />
                                    <div class="flex flex-col gap-0.5 w-full overflow-hidden">
                                        <span class="truncate">{{ lesson.title }}</span>
                                        <span class="flex items-center gap-2 text-xs opacity-50">
                                            <svg v-if="lesson.type === 'video'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" /></svg>
                                            {{ lesson.duration }}
                                        </span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Toggle Sidebar Button (Fixed when closed) -->
        <button v-if="!sidebarOpen" @click="toggleSidebar" class="absolute right-0 top-20 bg-base-100 border border-base-200 p-2 shadow-lg rounded-l-md z-30 hover:bg-base-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
        </button>

    </div>
  </div>
</template>

<style scoped>
/* Specific overrides for learning mode to ensure full height handling */
:deep(.collapse-title) {
    min-height: auto;
}
</style>
