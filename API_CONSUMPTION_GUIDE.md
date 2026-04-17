# Guide d'utilisation et consommation de l'API avec Pinia

Ce guide explique comment utiliser les stores Pinia que nous venons de générer pour consommer l'API de votre LMS.

## 1. Comment fonctionne un Store Pinia généré

A l'intérieur de chaque store :

- Les **états** (states) stockent la donnée : `items` (ex: `chapters`, `lessons`), `currentItem` (ex: `currentChapter`), `loading` (booléen) et `error` (message d'erreur).
- Les **actions** (fonctions) effectuent les appels API : `fetchChapters()`, `fetchChapterById(id)`, etc.

Actuellement, les appels API réels sont mis en commentaire dans les stores. L'application utilise des données fictives ("mock") pour que le front-end fonctionne même si le back-end n'est pas prêt.

---

## 2. Étape 1 : Activer la véritable API

Lorsque votre backend API est prêt, vous devez "décommenter" le code de l'appel API réel et commenter la partie simulation (mock) dans vos stores.

**Exemple dans le fichier `src/stores/chapters.js` :**

```javascript
async function fetchChapters(courseId = null) {
  loading.value = true
  error.value = null
  try {
    // ── DÉCOMMENTEZ LA VRAIE API ──
    const params = courseId ? { 'course.id': courseId } : {}
    const response = await api.get('/chapters', { params })
    chapters.value = response.data.member || response.data // Adapté pour API Platform/Hydra

    // ── COMMENTEZ OU SUPPRIMEZ LE MOCK ──
    // await new Promise(resolve => setTimeout(resolve, 300))
    // let results = [...mockChapters]
    // if (courseId) {
    //   results = results.filter(c => c.courseId === courseId)
    // }
    // chapters.value = results
  } catch (err) {
    error.value = 'Erreur lors du chargement des chapitres'
    console.error(err)
  } finally {
    loading.value = false
  }
}
```

Assurez-vous également que votre fichier `.env` est correctement configuré.

```env
# Dans .env
VITE_API_URL="http://127.0.0.1:8000/api"
```

---

## 3. Étape 2 : Consommer le Store dans un composant Vue (View/Component)

Pour utiliser ces données dans vos pages (ex: `CourseDetailView.vue`), vous devez importer le store, appeler l'action pour charger les données (généralement dans le hook `onMounted`), et afficher l'état dans votre template.

**Exemple concret dans un composant Vue (`<script setup>`) :**

```vue
<template>
  <div class="chapters-container">
    <h2>Chapitres du cours</h2>

    <!-- Gérer le chargement -->
    <div v-if="chapterStore.loading" class="loading">Chargement des chapitres en cours...</div>

    <!-- Gérer les erreurs -->
    <div v-else-if="chapterStore.error" class="error">
      {{ chapterStore.error }}
    </div>

    <!-- Afficher les données -->
    <ul v-else>
      <li v-for="chapter in chapterStore.chapters" :key="chapter.id">
        {{ chapter.title }}
      </li>
    </ul>

    <div v-if="chapterStore.chapters.length === 0 && !chapterStore.loading">
      Aucun chapitre disponible pour ce cours.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useChapterStore } from '@/stores/chapters'

// 1. Initialiser le store
const chapterStore = useChapterStore()

// Id statique pour l'exemple, à remplacer par une variable de route (ex: route.params.id)
const courseId = 1

// 2. Appeler l'API au montage du composant
onMounted(async () => {
  // Optionnel: Passer des paramètres (ex: charger les chapitres du cours N°1)
  await chapterStore.fetchChapters(courseId)
})
</script>

<style scoped>
.error {
  color: red;
}
.loading {
  color: gray;
}
</style>
```

## Règles d'or :

1. **Toujours utiliser `import { useStoreName } ...`** pour instancier votre store.
2. **Utiliser le hook `onMounted`** pour déclencher le chargement des données initiales.
3. Toujours **réagir au statut de chargement `loading` et d'erreur `error`** dans le template `<template>` pour offrir une bonne expérience utilisateur (UX).
4. Le mot-clé `await` permet de s'assurer que le contenu est bien chargé avant de lancer d'autres actions si nécessaire (bien que l'interface utilisateur se mettra à jour automatiquement dès que `.chapters` sera rempli grâce à la réactivité de Vue).
