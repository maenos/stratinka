# Front Client API Contract Template

Remplir ce document avec les réponses réelles du backend. L'objectif est d'obtenir un
contrat d'API directement exploitable pour implémenter le front client étudiant.

## 1. Configuration globale

### Base URL
```txt
Production: https://api.stratinka.com/api/v1
Staging: https://staging-api.stratinka.com/api/v1
Local: http://localhost:8000/api/v1
```

### Auth mode
```txt
Cookie/session (Sanctum SPA) | Bearer token (Sanctum Tokens)
```

### Headers requis
```http
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{token}} (si mode token utilisé)
X-XSRF-TOKEN: {{token}} (si mode cookie utilisé)
```

### Convention de réponse
Le backend utilise **API Platform Laravel**. Les propriétés sont converties en **camelCase**.
```json
// Ressource unique
{
  "id": 1,
  "title": "Introduction au Trading",
  "instructor": { ... }
}

// Collection
[
  { "id": 1, "title": "..." },
  { "id": 2, "title": "..." }
]
```

### Convention d'erreur
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

## 2. Authentification

### POST /login
```json
{
  "request": {
    "email": "student@example.com",
    "password": "password"
  },
  "response": "204 No Content (Set-Cookie: sanctum_session...)"
}
```

### POST /register
```json
{
  "request": {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password",
    "password_confirmation": "password"
  },
  "response": "204 No Content"
}
```

### POST /logout
```json
{
  "request": {},
  "response": "204 No Content"
}
```

### GET /api/v1/client/user
```json
{
  "response": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerifiedAt": "2024-01-01T00:00:00.000000Z"
  }
}
```

## 3. Professeurs et plans

### Catalogue professeurs
```json
{
  "endpoint": "GET /api/v1/client/professors",
  "response": [
    {
      "id": 1,
      "name": "Dr. Smith",
      "specialty": "Finance",
      "avatar": "url_to_avatar",
      "bio": "Expert en finance de marché"
    }
  ]
}
```

### Détail professeur public
```json
{
  "endpoint": "GET /api/v1/client/professors/{id}",
  "response": {
    "id": 1,
    "name": "Dr. Smith",
    "bio": "...",
    "plans": [
      { "id": 1, "name": "Pack Gold", "price": "99.00" }
    ]
  }
}
```

### Plans d'un professeur
```json
{
  "endpoint": "GET /api/v1/client/plans?professorId={id}",
  "response": [
    {
      "id": 1,
      "name": "Abonnement Mensuel",
      "price": "49.00",
      "durationDays": 30,
      "features": ["Accès cours", "Lives"]
    }
  ]
}
```

## 4. Abonnements

### Liste des abonnements actifs
```json
{
  "endpoint": "GET /api/v1/client/subscriptions",
  "response": [
    {
      "id": 1,
      "planId": 5,
      "status": "active",
      "startsAt": "2024-04-20T10:00:00Z",
      "endsAt": "2024-05-20T10:00:00Z"
    }
  ]
}
```

### Création d'abonnement
```json
{
  "endpoint": "POST /api/v1/client/subscriptions",
  "request": {
    "planId": 5,
    "paymentRef": "PAY-123456"
  },
  "response": {
    "id": 10,
    "status": "active",
    "endsAt": "..."
  }
}
```

### Annulation d'abonnement
```json
{
  "endpoint": "DELETE /api/v1/client/subscriptions/{id}",
  "request": {},
  "response": "204 No Content"
}
```

## 5. Cours et modules

### Liste des cours d'un professeur
```json
{
  "endpoint": "GET /api/v1/client/courses?professorId={id}",
  "response": [
    {
      "id": 1,
      "title": "Trading pour débutants",
      "level": "beginner",
      "thumbnail": "..."
    }
  ]
}
```

### Détail d'un cours avec modules
```json
{
  "endpoint": "GET /api/v1/client/courses/{id}",
  "response": {
    "id": 1,
    "title": "Trading pour débutants",
    "chapters": [
      {
        "id": 1,
        "title": "Chapitre 1 : Les bases",
        "lessons": [
          { "id": 1, "title": "Introduction", "isFreePreview": true }
        ]
      }
    ]
  }
}
```

### Détail d'un module (Lesson)
```json
{
  "endpoint": "GET /api/v1/client/lessons/{id}",
  "response": {
    "id": 1,
    "title": "Introduction",
    "description": "...",
    "videoUrl": "https://...",
    "duration": "15:00"
  }
}
```

### Streaming vidéo
```json
{
  "endpoint": "GET /api/v1/client/streaming/lessons/{id}/video",
  "response": "Binary Stream (Video content)"
}
```

### Lecture PDF sécurisée
```json
{
  "endpoint": "GET /api/v1/client/books/{id}/stream",
  "response": "Binary Stream (PDF content)"
}
```

## 6. Lives, livres et témoignages

### Lives
```json
{
  "endpoint": "GET /api/v1/client/live_sessions?professorId={id}",
  "response": [
    {
      "id": 1,
      "title": "Live Q&A",
      "scheduledAt": "2024-05-01T18:00:00Z",
      "meetLink": "https://meet.google.com/..."
    }
  ]
}
```

### Livres PDF
```json
{
  "endpoint": "GET /api/v1/client/books",
  "response": [
    {
      "id": 1,
      "title": "Ebook Trading",
      "coverImage": "..."
    }
  ]
}
```

### Témoignages
```json
{
  "endpoint": "POST /api/v1/client/testimonials",
  "request": {
    "content": "Super cours !",
    "rating": 5
  },
  "response": { "id": 1, "status": "pending" }
}
```

## 7. Codes d'erreur à gérer côté front

| HTTP | Code métier | Cas d'usage | Réaction front attendue |
| --- | --- | --- | --- |
| 401 | UNAUTHENTICATED | Session expirée ou non authentifiée | Rediriger vers /login |
| 403 | FORBIDDEN | Accès refusé (pas les droits) | Afficher message d'erreur |
| 403 | SUBSCRIPTION_REQUIRED | Accès premium sans abonnement | Ouvrir la page de pricing |
| 404 | NOT_FOUND | Ressource absente | Afficher 404 custom |
| 422 | VALIDATION_ERROR | Erreurs de formulaire | Afficher les erreurs sous les inputs |

## 8. Types d'identifiants

| Ressource | Type | Exemple |
| --- | --- | --- |
| Professor | integer | 1 |
| Plan | integer | 5 |
| Subscription | integer | 10 |
| Course | integer | 1 |
| Module | integer | 1 (Chapter ID) |
| Lesson | integer | 1 |

## 9. Décisions verrouillées

- Auth choisie: **Laravel Sanctum (Cookie ou Token)**
- Base URL choisie: `/api/v1/client`
- Préfixes validés: `/api/v1/client`
- Structure des réponses validée: **JSON (CamelCase via NameConverter)**
- Gestion du 401 validée: **Redirection Login**
- Gestion du 403 abonnement requis validée: **Pricing Modal/Page**

