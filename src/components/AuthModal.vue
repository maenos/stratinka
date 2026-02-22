<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  isOpen: Boolean,
  initialView: {
    type: String,
    default: 'login', // 'login' or 'register'
  },
})

const emit = defineEmits(['close'])

const authStore = useAuthStore()
const view = ref(props.initialView)

const email = ref('')
const password = ref('')
const name = ref('')
const isLoading = ref(false)
const errorMsg = ref('')

// Reset when modal opens
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      view.value = props.initialView
      email.value = ''
      password.value = ''
      name.value = ''
      errorMsg.value = ''
    }
  },
)

const toggleView = () => {
  view.value = view.value === 'login' ? 'register' : 'login'
  errorMsg.value = ''
}

const handleSubmit = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    if (view.value === 'login') {
      await authStore.login({ email: email.value, password: password.value })
    } else {
      await authStore.login({ email: email.value, password: password.value, name: name.value })
    }
    emit('close')
  } catch (err) {
    errorMsg.value = err.message || 'Une erreur est survenue'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>

        <!-- Modal Card -->
        <div
          class="relative w-full max-w-md bg-base-100 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        >
          <!-- Top gradient bar -->
          <div class="h-1.5 bg-gradient-to-r from-primary to-primary-focus"></div>

          <!-- Close button -->
          <button
            class="absolute top-4 right-4 btn btn-ghost btn-circle btn-sm z-10"
            @click="$emit('close')"
            aria-label="Fermer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div class="p-8 pt-6">
            <!-- Header -->
            <div class="mb-7">
              <h2 class="text-2xl font-bold text-base-content">
                {{ view === 'login' ? 'Bon retour !' : 'Créer un compte' }}
              </h2>
              <p class="text-base-content/50 text-sm mt-1">
                {{
                  view === 'login'
                    ? 'Connectez-vous pour continuer votre apprentissage.'
                    : "Rejoignez des milliers d'apprenants sur Stratinka."
                }}
              </p>
            </div>

            <!-- Error message -->
            <div v-if="errorMsg" class="alert alert-error alert-sm mb-4 text-sm py-2">
              <span>{{ errorMsg }}</span>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
              <div v-if="view === 'register'" class="form-control w-full">
                <label class="label pb-1">
                  <span class="label-text font-semibold text-sm">Nom complet</span>
                </label>
                <input
                  v-model="name"
                  type="text"
                  placeholder="Jean Dupont"
                  class="input input-bordered w-full focus:border-primary focus:outline-none transition-colors"
                  autocomplete="name"
                  required
                />
              </div>

              <div class="form-control w-full">
                <label class="label pb-1">
                  <span class="label-text font-semibold text-sm">Adresse email</span>
                </label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="exemple@email.com"
                  class="input input-bordered w-full focus:border-primary focus:outline-none transition-colors"
                  autocomplete="email"
                  required
                />
              </div>

              <div class="form-control w-full">
                <label class="label pb-1">
                  <span class="label-text font-semibold text-sm">Mot de passe</span>
                  <a
                    v-if="view === 'login'"
                    href="#"
                    class="label-text-alt link link-primary text-xs"
                    >Mot de passe oublié ?</a
                  >
                </label>
                <input
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="input input-bordered w-full focus:border-primary focus:outline-none transition-colors"
                  autocomplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary w-full mt-2 font-bold shadow-md shadow-primary/20"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                <span v-else>{{ view === 'login' ? 'Se connecter' : "S'inscrire" }}</span>
              </button>
            </form>

            <!-- Toggle login/register -->
            <p class="text-center text-sm text-base-content/60 mt-6">
              {{ view === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?' }}
              <button
                @click="toggleView"
                class="link link-primary font-semibold ml-1 no-underline hover:underline"
              >
                {{ view === 'login' ? "S'inscrire" : 'Se connecter' }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
