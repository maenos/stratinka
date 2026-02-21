<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCourseStore } from '../stores/courses'
import CourseCard from '../components/CourseCard.vue'

const courseStore = useCourseStore()

// Filter States
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedLevels = ref([])
const selectedPrice = ref(null) // null, 'free', 'paid'

// Options (Mock)
const categories = ['Développement Web', 'Design', 'Data Science', 'Business', 'Marketing']
const levels = ['Débutant', 'Intermédiaire', 'Avancé']

// Fetch with debounce
let debounceTimer = null
const applyFilters = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        courseStore.fetchCourses({
            search: searchQuery.value,
            category: selectedCategories.value,
            level: selectedLevels.value,
            price: selectedPrice.value
        })
    }, 300)
}

// Watchers
watch([searchQuery, selectedCategories, selectedLevels, selectedPrice], applyFilters, { deep: true })

onMounted(() => {
    applyFilters()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 min-h-screen">
    <div class="flex flex-col md:flex-row gap-8">
        
        <!-- Sidebar Filters -->
        <aside class="w-full md:w-64 flex-shrink-0 space-y-6">
            <div>
                <h3 class="font-bold text-lg mb-3">Recherche</h3>
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Chercher un cours..." 
                    class="input input-bordered w-full input-sm" 
                />
            </div>

            <!-- Categories -->
            <div class="collapse collapse-arrow border border-base-200 bg-base-100 rounded-box">
                <input type="checkbox" checked /> 
                <div class="collapse-title font-medium">Catégories</div>
                <div class="collapse-content">
                    <div v-for="cat in categories" :key="cat" class="form-control">
                        <label class="label cursor-pointer justify-start gap-3 py-1">
                            <input type="checkbox" :value="cat" v-model="selectedCategories" class="checkbox checkbox-xs checkbox-primary" />
                            <span class="label-text">{{ cat }}</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Levels -->
            <div class="collapse collapse-arrow border border-base-200 bg-base-100 rounded-box">
                <input type="checkbox" checked /> 
                <div class="collapse-title font-medium">Niveau</div>
                <div class="collapse-content">
                    <div v-for="level in levels" :key="level" class="form-control">
                        <label class="label cursor-pointer justify-start gap-3 py-1">
                            <input type="checkbox" :value="level" v-model="selectedLevels" class="checkbox checkbox-xs checkbox-secondary" />
                            <span class="label-text">{{ level }}</span>
                        </label>
                    </div>
                </div>
            </div>

             <!-- Price -->
            <div class="bg-base-100 border border-base-200 rounded-box p-4">
                <h3 class="font-medium mb-2">Prix</h3>
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input type="radio" name="price" :value="null" v-model="selectedPrice" class="radio radio-xs" />
                        <span class="label-text">Tous</span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input type="radio" name="price" value="free" v-model="selectedPrice" class="radio radio-xs radio-accent" />
                        <span class="label-text">Gratuit</span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input type="radio" name="price" value="paid" v-model="selectedPrice" class="radio radio-xs radio-primary" />
                        <span class="label-text">Payant</span>
                    </label>
                </div>
            </div>

        </aside>

        <!-- Main Content -->
        <main class="flex-1">
            <div class="mb-6 flex justify-between items-center">
                <h1 class="text-2xl font-bold">Catalogue</h1>
                <span class="text-sm text-gray-500">{{ courseStore.courses.length }} résultats</span>
            </div>

            <!-- Loading State -->
            <div v-if="courseStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                <div v-for="n in 6" :key="n" class="card bg-base-100 w-full shadow-sm h-80 animate-pulse border border-base-200">
                    <div class="h-48 bg-base-300 w-full rounded-t-lg"></div>
                    <div class="p-4 space-y-4">
                         <div class="h-4 bg-base-300 rounded w-3/4"></div>
                         <div class="h-4 bg-base-300 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!courseStore.loading && courseStore.courses.length === 0" class="text-center py-20">
                <h3 class="text-lg font-bold mb-2">Aucun cours trouvé</h3>
                <p class="text-base-content/60">Essayez de modifier vos filtres.</p>
                <button @click="searchQuery = ''; selectedCategories = []; selectedLevels = []; selectedPrice = null" class="btn btn-link mt-2">Réinitialiser les filtres</button>
            </div>

            <!-- Course Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                 <template v-for="course in courseStore.courses" :key="course.id">
                     <router-link :to="{ name: 'course-detail', params: { slug: course.slug } }">
                        <CourseCard :course="course" />
                     </router-link>
                </template>
            </div>
        </main>

    </div>
  </div>
</template>
