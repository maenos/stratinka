<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  isOpen: Boolean,
  initialView: {
    type: String,
    default: 'login' // 'login' or 'register'
  }
})

const emit = defineEmits(['close'])

const authStore = useAuthStore()
const view = ref(props.initialView)

const email = ref('')
const password = ref('')
const name = ref('')
const isLoading = ref(false)

// Switch logic
const toggleView = () => {
    view.value = view.value === 'login' ? 'register' : 'login'
}

const handleSubmit = async () => {
    isLoading.value = true
    // Simulate API call
    setTimeout(() => {
        if (view.value === 'login') {
            authStore.login({ email: email.value, name: 'Utilisateur Test' }) // Mock login
        } else {
             authStore.login({ email: email.value, name: name.value || 'Nouvel Utilisateur' })
        }
        isLoading.value = false
        emit('close')
    }, 1000)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-base-content/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div class="relative w-full max-w-md bg-base-100 rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <!-- Decoration -->
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
        
        <div class="p-8">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-black mb-2">{{ view === 'login' ? 'Bon retour !' : 'Rejoignez-nous' }}</h2>
                <p class="text-base-content/60">
                    {{ view === 'login' ? 'Connectez-vous pour continuer votre apprentissage.' : 'Créez un compte pour commencer à apprendre.' }}
                </p>
            </div>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
                <div v-if="view === 'register'" class="form-control">
                    <label class="label font-bold text-sm">Nom complet</label>
                    <input v-model="name" type="text" placeholder="John Doe" class="input input-bordered rounded-xl focus:border-primary focus:ring-4 ring-primary/10 transition-all" required />
                </div>
                
                <div class="form-control">
                    <label class="label font-bold text-sm">Email</label>
                    <input v-model="email" type="email" placeholder="exemple@email.com" class="input input-bordered rounded-xl focus:border-primary focus:ring-4 ring-primary/10 transition-all" required />
                </div>
                
                <div class="form-control">
                    <label class="label font-bold text-sm">Mot de passe</label>
                    <input v-model="password" type="password" placeholder="••••••••" class="input input-bordered rounded-xl focus:border-primary focus:ring-4 ring-primary/10 transition-all" required />
                    <label v-if="view === 'login'" class="label">
                        <a href="#" class="label-text-alt link link-primary no-underline hover:underline">Mot de passe oublié ?</a>
                    </label>
                </div>

                <button type="submit" class="btn btn-primary btn-lg rounded-xl mt-4 shadow-lg shadow-primary/30" :class="{'loading': isLoading}">
                    {{ view === 'login' ? 'Se connecter' : "S'inscrire" }}
                </button>
            </form>
            
            <div class="divider my-6 text-xs text-base-content/30 font-bold">OU</div>
            
            <div class="grid grid-cols-2 gap-4">
                <button class="btn btn-outline rounded-xl gap-2 hover:bg-base-200 hover:text-base-content hover:border-base-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="fill-current"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.536-6.033-5.696  c0-3.159,2.702-5.696,6.033-5.696c1.482,0,2.61,0.44,3.522,1.296l2.754-2.754C17.069,3.709,14.97,2.861,12.545,2.861  c-5.412,0-9.801,4.195-9.801,9.373c0,5.176,4.389,9.373,9.801,9.373c4.582,0,8.468-3.082,9.544-7.23H12.545z"/></svg>
                    Google
                </button>
                <button class="btn btn-outline rounded-xl gap-2 hover:bg-base-200 hover:text-base-content hover:border-base-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    Twitter
                </button>
            </div>
            
            <div class="text-center mt-8">
                <p class="text-sm">
                    {{ view === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?' }}
                    <button @click="toggleView" class="link link-primary font-bold no-underline hover:underline ml-1">
                        {{ view === 'login' ? "S'inscrire" : 'Se connecter' }}
                    </button>
                </p>
            </div>
        </div>
        
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" @click="$emit('close')">✕</button>
    </div>
  </div>
</template>
