# Stratinka — Description du projet (Frontend)

> **Destination** : Équipe backend — document de référence pour le début de l'intégration API  
> **Date** : Février 2026  
> **Stack frontend** : Vue 3 (Composition API) · Vite · Pinia · Vue Router · DaisyUI (TailwindCSS)

---

## 1. Présentation du projet

**Stratinka** est une plateforme d'apprentissage en ligne (LMS) du type Udemy/Coursera permettant à des **apprenants** de découvrir, acheter et suivre des cours vidéo, et à des **formateurs** de publier du contenu structuré.

L'application frontend est déjà en place avec des données mockées. L'objectif immédiat est de **remplacer les mocks par des appels API réels**.

---

## 2. Stack & architecture frontend

| Couche      | Technologie                                   |
| ----------- | --------------------------------------------- |
| Framework   | Vue 3 (Composition API + `<script setup>`)    |
| Build       | Vite                                          |
| État global | Pinia (stores : `auth`, `courses`)            |
| Routing     | Vue Router 4                                  |
| UI          | DaisyUI (composants) + TailwindCSS            |
| HTTP client | Axios (configuré dans `src/stores/auth.js`)   |
| Auth        | JWT Bearer Token (stocké dans `localStorage`) |

**Variable d'environnement attendue :**

```
VITE_API_URL=https://api.stratinka.com/api   # ou http://localhost:3000/api en dev
```

---

## 3. Routes frontend existantes

| Route                  | Vue                    | Description                                         |
| ---------------------- | ---------------------- | --------------------------------------------------- |
| `/`                    | `HomeView.vue`         | Page d'accueil : hero, cours populaires, catégories |
| `/courses`             | `CoursesView.vue`      | Catalogue avec filtres (catégorie, niveau, prix)    |
| `/courses/:slug`       | `CourseDetailView.vue` | Détail d'un cours (infos, syllabus, avis)           |
| `/courses/:slug/learn` | `CourseLearnView.vue`  | Lecteur de leçon (vidéo/article)                    |
| `/my-courses`          | `MyCoursesView.vue`    | Tableau de bord apprenant (cours inscrits)          |

---

## 4. Modèles de données attendus

### 4.1 User (Utilisateur)

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "student | instructor | admin",
  "avatar": "string (URL)",
  "createdAt": "ISO date"
}
```

### 4.2 Category (Catégorie)

```json
{
  "id": "uuid",
  "name": "string",
  "slug": "string",
  "icon": "string (emoji ou URL)",
  "subcategories": [SubCategory]
}
```

### 4.3 SubCategory (Sous-catégorie) ⭐ nouveau

```json
{
  "id": "uuid",
  "name": "string",
  "slug": "string",
  "categoryId": "uuid"
}
```

### 4.4 Course (Cours)

```json
{
  "id": "uuid",
  "slug": "string (unique, URL-friendly)",
  "title": "string",
  "description": "string (court)",
  "longDescription": "string (Markdown, pour la page détail)",
  "thumbnail": "string (URL)",
  "previewVideo": "string (URL, optionnel)",
  "price": "number",
  "currency": "string (ex: XOF, EUR)",
  "level": "beginner | intermediate | advanced",
  "language": "string",
  "categoryId": "uuid",
  "subcategoryId": "uuid (optionnel)",
  "instructor": { "id", "name", "avatar", "bio" },
  "rating": "number (0-5)",
  "reviewsCount": "number",
  "studentsCount": "number",
  "duration": "string (ex: 12h30)",
  "lessonsCount": "number",
  "whatYouWillLearn": ["string"],
  "requirements": ["string"],
  "sections": [Section],
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### 4.5 Section

```json
{
  "id": "uuid",
  "title": "string",
  "order": "number",
  "lessons": [Lesson]
}
```

### 4.6 Lesson (Leçon)

```json
{
  "id": "uuid",
  "title": "string",
  "type": "video | article | quiz",
  "duration": "string (ex: 8:45)",
  "videoUrl": "string (URL, si type=video)",
  "content": "string (Markdown, si type=article)",
  "isPreview": "boolean",
  "order": "number"
}
```

### 4.7 Enrollment (Inscription à un cours)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "courseId": "uuid",
  "progress": "number (0-100)",
  "completedLessons": ["lessonId"],
  "enrolledAt": "ISO date"
}
```

### 4.8 Comment (Commentaire sur un cours) ⭐ nouveau

```json
{
  "id": "uuid",
  "courseId": "uuid",
  "userId": "uuid",
  "user": { "name", "avatar" },
  "content": "string",
  "rating": "number (1-5, optionnel — commentaire ou avis)",
  "parentId": "uuid | null (null = commentaire racine, non-null = réponse)",
  "replies": [Comment],
  "createdAt": "ISO date"
}
```

---

## 5. Endpoints API à implémenter

### Auth

| Méthode | Endpoint         | Description                            |
| ------- | ---------------- | -------------------------------------- |
| `POST`  | `/auth/register` | Inscription (name, email, password)    |
| `POST`  | `/auth/login`    | Connexion → retourne `{ token, user }` |
| `GET`   | `/auth/me`       | Profil de l'utilisateur connecté       |

### Catégories

| Méthode | Endpoint            | Description                                        |
| ------- | ------------------- | -------------------------------------------------- |
| `GET`   | `/categories`       | Liste toutes les catégories (avec sous-catégories) |
| `GET`   | `/categories/:slug` | Détail + cours d'une catégorie                     |

### Cours

| Méthode | Endpoint                           | Description                                                          |
| ------- | ---------------------------------- | -------------------------------------------------------------------- | ------ |
| `GET`   | `/courses`                         | Liste paginée (`?page=1&limit=12&category=&level=&search=&price=free | paid`) |
| `GET`   | `/courses/:slug`                   | Détail complet d'un cours (sections + leçons)                        |
| `GET`   | `/courses/:slug/lessons/:lessonId` | Contenu d'une leçon (auth requise + enrollment)                      |

### Inscriptions

| Méthode | Endpoint                    | Description                                              |
| ------- | --------------------------- | -------------------------------------------------------- |
| `GET`   | `/enrollments`              | Cours inscrits de l'utilisateur connecté                 |
| `POST`  | `/enrollments`              | S'inscrire à un cours (`{ courseId }`)                   |
| `PATCH` | `/enrollments/:id/progress` | Mettre à jour la progression (`{ lessonId, completed }`) |

### Commentaires ⭐ nouveau

| Méthode  | Endpoint                  | Description                                               |
| -------- | ------------------------- | --------------------------------------------------------- |
| `GET`    | `/courses/:slug/comments` | Liste des commentaires/avis (`?page=1&limit=20`)          |
| `POST`   | `/courses/:slug/comments` | Poster un commentaire (`{ content, rating?, parentId? }`) |
| `DELETE` | `/comments/:id`           | Supprimer son propre commentaire                          |

---

## 6. Format de réponse attendu (convention)

```json
// Liste paginée
{
  "data": [...],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 12,
    "totalPages": 4
  }
}

// Ressource unique
{
  "data": { ... }
}

// Erreur
{
  "error": true,
  "message": "Description de l'erreur",
  "code": "UNAUTHORIZED | NOT_FOUND | VALIDATION_ERROR | ..."
}
```

---

## 7. Notes importantes

- **Authentification** : JWT, envoyé dans le header `Authorization: Bearer <token>`. Les endpoints `/enrollments`, `/auth/me`, et la lecture de leçons requièrent le token.
- **CORS** : Le backend doit autoriser `http://localhost:5173` (dev Vite) et le domaine de production.
- **Slugs** : Les cours utilisent des **slugs** (pas des IDs) dans les URLs frontend.
- **Sous-catégories** : Fonctionnalité prévue — inclure `subcategoryId` dans le modèle `Course` dès le début.
- **Commentaires imbriqués** : Un commentaire peut avoir un `parentId` pour les réponses. Le frontend attend au maximum **1 niveau de profondeur** (pas d'imbrication illimitée).
- **Progression** : La leçon doit être marquée "complétée" individuellement, et le backend calcule `progress` en pourcentage.

---

## 8. Intégration côté frontend

Toute la logique HTTP est centralisée dans les **Pinia stores** :

- `src/stores/auth.js` — authentification
- `src/stores/courses.js` — chargement des cours (à connecter à l'API)

Les stores ont déjà des commentaires indiquant exactement où **décommenter** les appels API réels et **supprimer** les mocks.
