<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import AuthModal from './components/AuthModal.vue'

const authStore = useAuthStore()
const router = useRouter() // router instance is available but usually we navigate via router-link or helper

// Mobile Menu State
const isMobileMenuOpen = ref(false)

// Auth Modal State
const isAuthModalOpen = ref(false)
const authModalView = ref('login') // 'login' or 'register'

// Theme State
const isDark = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
}

const openAuthModal = (view) => {
    authModalView.value = view
    isAuthModalOpen.value = true
    closeMobileMenu()
}

const closeAuthModal = () => {
    isAuthModalOpen.value = false
}

const handleLogout = () => {
    authStore.logout()
    closeMobileMenu()
    router.push('/')
}

const toggleTheme = () => {
    isDark.value = !isDark.value
    const newTheme = isDark.value ? 'stratinka-dark' : 'stratinka-light'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
}

// Initialize Theme
onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'stratinka-light'
    isDark.value = savedTheme === 'stratinka-dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
})

// Close menu on route change
watch(() => router.currentRoute.value.path, () => {
    closeMobileMenu()
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-base-100 text-base-content font-sans transition-colors duration-300">
    
    <!-- Navbar Premium -->
    <header class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-40 h-[80px] px-4 lg:px-8 gap-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300">
        
        <!-- Navbar Start: Logo & Categories -->
        <div class="navbar-start w-auto flex items-center gap-2 lg:gap-6">
            <!-- Mobile Menu Button -->
            <button @click="toggleMobileMenu" class="btn btn-ghost btn-circle lg:hidden hover:bg-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Logo -->
            <router-link to="/" class="flex items-center gap-3 group" @click="closeMobileMenu">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-focus flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">S</div>
                <span class="text-2xl font-bold tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/70">Stratinka</span>
            </router-link>

            <!-- Categories Link -->
            <button class="btn btn-ghost font-medium text-base hidden lg:flex hover:bg-base-200 hover:text-primary gap-2 px-4 rounded-lg">
                Catégories
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
        </div>
        
        <!-- Navbar Center: Search Bar (Flex Grow) -->
        <div class="navbar-center flex-1 max-w-3xl px-6 hidden md:flex">
            <div class="group relative w-full">
                <div class="join w-full rounded-full border border-base-300 bg-base-200/50 hover:bg-base-100 hover:shadow-md focus-within:bg-base-100 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary transition-all duration-300 ease-out overflow-hidden">
                    <button class="btn btn-ghost btn-sm btn-circle join-item pointer-events-none opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary pl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <input type="text" placeholder="Rechercher des cours, des compétences..." class="input input-sm join-item w-full bg-transparent border-none focus:outline-none h-12 text-base placeholder:text-base-content/40" />
                </div>
            </div>
        </div>
        
        <!-- Navbar End: Links & Actions -->
        <div class="navbar-end w-auto flex items-center gap-2 lg:gap-3 flex-1 justify-end">
            
            <!-- Mobile Search Icon -->
            <button class="btn btn-ghost btn-circle md:hidden hover:bg-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            <!-- Business Links -->
            <div class="hidden xl:flex items-center gap-4 mr-2">
                <a href="#" class="text-sm font-medium hover:text-primary transition-colors relative group">
                    Stratinka Business
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </a>
                <a href="#" class="text-sm font-medium hover:text-primary transition-colors relative group">
                    Enseigner
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </a>
            </div>

            <!-- Cart -->
            <button class="btn btn-ghost btn-circle hidden sm:flex hover:bg-base-200 relative group">
                <div class="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
            </button>

            <!-- Theme Toggle -->
            <button @click="toggleTheme" class="btn btn-ghost btn-circle hover:bg-base-200 transition-all duration-300 transform active:rotate-90" title="Changer de thème">
                <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </button>
            
            <div class="w-px h-8 bg-base-content/10 mx-1 hidden sm:block"></div>

            <!-- Auth Buttons -->
            <template v-if="!authStore.isAuthenticated">
                <button @click="openAuthModal('login')" class="btn btn-ghost font-bold px-6 border border-base-content/20 hover:border-base-content hover:bg-transparent hidden sm:flex">
                    Se connecter
                </button>
                <button @click="openAuthModal('register')" class="btn btn-neutral font-bold px-6 shadow-md hover:shadow-lg transition-all hover:scale-105 hidden sm:flex">
                    S'inscrire
                </button>
            </template>
            
            <!-- User Menu -->
            <template v-else>
                <router-link to="/my-courses" class="btn btn-ghost btn-circle hidden sm:flex hover:bg-base-200" title="Mes cours">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </router-link>
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar border border-base-200 hover:ring-2 hover:ring-primary/50 transition-all">
                        <div class="w-9 rounded-full">
                            <img v-if="authStore.user?.avatar" :src="authStore.user?.avatar" />
                            <div v-else class="bg-neutral text-neutral-content w-full h-full flex items-center justify-center font-bold text-sm">
                                {{ authStore.user?.name?.charAt(0) || 'U' }}
                            </div>
                        </div>
                    </label>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-64 border border-base-200">
                        <li class="disabled pointer-events-none">
                            <div class="flex flex-col items-start gap-1 p-2">
                                <span class="font-bold text-lg text-base-content">{{ authStore.user?.name }}</span>
                                <span class="text-xs opacity-60">{{ authStore.user?.email }}</span>
                            </div>
                        </li>
                        <div class="divider my-0"></div>
                        <li><router-link to="/my-courses" class="py-3 text-base">Mon apprentissage</router-link></li>
                        <li><a href="#" class="py-3 text-base">Panier</a></li>
                        <li><a href="#" class="py-3 text-base">Notifications</a></li>
                        <div class="divider my-0"></div>
                        <li><a href="#" class="py-3">Paramètres de compte</a></li>
                        <li><a href="#" class="py-3">Modes de paiement</a></li>
                        <div class="divider my-0"></div>
                        <li><a href="#" class="py-3 flex justify-between">Langue <span class="opacity-50">Français</span></a></li>
                        <div class="divider my-0"></div>
                        <li><a @click="handleLogout" class="py-3 text-error">Se déconnecter</a></li>
                    </ul>
                </div>
            </template>
            
            <!-- Language Globe (Desktop) -->
            <button class="btn btn-ghost btn-circle border border-base-200 hover:border-base-content/30 hidden lg:flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            </button>
        </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" @click="toggleMobileMenu"></div>
    </transition>

    <!-- Mobile Menu Sidebar (Drawer) -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-y-0 left-0 z-50 w-[80%] max-w-sm bg-base-100 shadow-2xl lg:hidden flex flex-col h-full transform transition-transform">
         <!-- Drawer Header -->
         <div class="p-4 flex items-center justify-between border-b border-base-200/50">
             <template v-if="authStore.isAuthenticated">
                 <div class="flex items-center gap-3">
                     <div class="avatar placeholder">
                        <div class="bg-neutral text-neutral-content rounded-full w-10">
                            <span v-if="!authStore.user?.avatar">{{ authStore.user?.name?.charAt(0) }}</span>
                            <img v-else :src="authStore.user?.avatar" />
                        </div>
                     </div>
                     <div class="flex flex-col">
                         <span class="font-bold text-sm">{{ authStore.user?.name }}</span>
                         <span class="text-xs opacity-60">Bienvenue</span>
                     </div>
                 </div>
             </template>
             <template v-else>
                 <div class="font-bold text-lg text-base-content/50">Menu</div>
             </template>
             
             <button @click="closeMobileMenu" class="btn btn-circle btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
         </div>
         
         <!-- Drawer Content -->
         <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            
             <!-- Links -->
             <ul class="menu bg-base-100 text-base-content p-0 [&_li>*]:rounded-none [&_li>*]:py-3 [&_li>*]:text-base">
                <li v-if="!authStore.isAuthenticated">
                    <a @click="() => { openAuthModal('login'); }" class="text-primary font-bold">Se connecter</a>
                </li>
                <li v-if="!authStore.isAuthenticated">
                    <a @click="() => { openAuthModal('register'); }" class="text-primary font-bold">S'inscrire</a>
                </li>
                <div v-if="!authStore.isAuthenticated" class="divider my-0"></div>

                 <li><a @click="closeMobileMenu">Catégories</a></li>
                 <li><router-link to="/courses" @click="closeMobileMenu">Catalogue complet</router-link></li>
                 <li v-if="authStore.isAuthenticated"><router-link to="/my-courses" @click="closeMobileMenu">Mes cours</router-link></li>
                 
                 <div class="divider my-0"></div>
                 
                 <li class="menu-title text-xs uppercase opacity-50 mt-2">Plus de Stratinka</li>
                 <li><a href="#">Stratinka Business</a></li>
                 <li><a href="#">Enseigner sur Stratinka</a></li>
                 <li><a href="#">Télécharger l'application</a></li>
                 <li><a href="#">Inviter des amis</a></li>
                 <li><a href="#">Aide</a></li>
                 
                 <div class="divider my-0"></div>
                 
                 <li><a @click="toggleTheme" class="flex justify-between">
                     <span>Thème</span>
                     <span class="badge badge-sm badge-outline">{{ isDark ? 'Sombre' : 'Clair' }}</span>
                 </a></li>
                 
                 <li v-if="authStore.isAuthenticated">
                     <a @click="handleLogout" class="text-error">Se déconnecter</a>
                 </li>
             </ul>
         </div>
      </div>
    </transition>

    <!-- Auth Modal -->
    <AuthModal :isOpen="isAuthModalOpen" :initialView="authModalView" @close="closeAuthModal" />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view></router-view>
    </main>

    <!-- Footer Premium -->
    <footer class="bg-neutral text-neutral-content pt-20 pb-10">
      <div class="container mx-auto px-4">
        
        <!-- Top Footer: Brand & Newsletter -->
        <div class="flex flex-col lg:flex-row justify-between gap-12 mb-16 border-b border-neutral-content/10 pb-16">
            <div class="lg:w-1/3">
                <div class="flex items-center gap-2 mb-6">
                    <div class="w-10 h-10 rounded bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">S</div>
                    <span class="text-3xl font-bold tracking-tight text-white">Stratinka</span>
                </div>
                <p class="text-neutral-content/70 leading-relaxed mb-6 text-lg">
                    La plateforme d'apprentissage en ligne qui transforme vos ambitions en compétences concrètes. Rejoignez notre communauté mondiale de passionnés.
                </p>
                <div class="flex gap-4">
                    <a href="#" class="btn btn-circle btn-sm btn-ghost bg-white/5 hover:bg-primary hover:text-white border-none transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a href="#" class="btn btn-circle btn-sm btn-ghost bg-white/5 hover:bg-primary hover:text-white border-none transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                    </a>
                    <a href="#" class="btn btn-circle btn-sm btn-ghost bg-white/5 hover:bg-primary hover:text-white border-none transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                </div>
            </div>
            
            <div class="lg:w-1/3">
                 <h3 class="font-bold text-white text-lg mb-4">Restez informé</h3>
                 <p class="text-neutral-content/70 mb-4">Recevez les dernières nouvelles, offres spéciales et mises à jour de cours.</p>
                 <div class="join w-full">
                    <input type="text" placeholder="votre@email.com" class="input input-bordered join-item w-full bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary text-white" />
                    <button class="btn btn-primary join-item px-6">S'inscrire</button>
                 </div>
            </div>
        </div>

        <!-- Links Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
           <div>
               <h6 class="font-bold text-white mb-6 uppercase tracking-wider text-sm">Découvrir</h6>
               <ul class="flex flex-col gap-3 text-neutral-content/70">
                   <li><a href="#" class="hover:text-primary transition-colors">Développement Web</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Data Science</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Marketing Digital</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Design & UX</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Business</a></li>
               </ul>
           </div>
           
           <div>
               <h6 class="font-bold text-white mb-6 uppercase tracking-wider text-sm">Entreprise</h6>
               <ul class="flex flex-col gap-3 text-neutral-content/70">
                   <li><a href="#" class="hover:text-primary transition-colors">Stratinka Business</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Devenir Formateur</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Télécharger l'app</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">A propos de nous</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Contactez-nous</a></li>
               </ul>
           </div>
           
           <div>
               <h6 class="font-bold text-white mb-6 uppercase tracking-wider text-sm">Communauté</h6>
               <ul class="flex flex-col gap-3 text-neutral-content/70">
                   <li><a href="#" class="hover:text-primary transition-colors">Apprenants</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Partenaires</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Développeurs</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Blog</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Centre d'aide</a></li>
               </ul>
           </div>
           
           <div>
               <h6 class="font-bold text-white mb-6 uppercase tracking-wider text-sm">Légal</h6>
               <ul class="flex flex-col gap-3 text-neutral-content/70">
                   <li><a href="#" class="hover:text-primary transition-colors">Conditions d'utilisation</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Politique de confidentialité</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Paramètres des cookies</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Accessibilité</a></li>
                   <li><a href="#" class="hover:text-primary transition-colors">Plan du site</a></li>
               </ul>
           </div>
        </div>
        
        <!-- Bottom Footer -->
        <div class="flex flex-col md:flex-row justify-between items-center border-t border-neutral-content/10 pt-8 gap-6">
            <p class="text-sm text-neutral-content/50">
               © 2026 Stratinka, Inc. Tous droits réservés.
            </p>
            <div class="flex items-center gap-6">
                 <button class="btn btn-sm btn-ghost gap-2 text-neutral-content/80 hover:text-white font-normal p-0 hover:bg-transparent">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                     Français
                 </button>
                 <button class="btn btn-sm btn-ghost gap-2 text-neutral-content/80 hover:text-white font-normal p-0 hover:bg-transparent">
                     € EUR
                 </button>
            </div>
        </div>
      </div>
    </footer>
    
  </div>
</template>
