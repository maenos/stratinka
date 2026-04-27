# Backend Alignment Checklist

Ce document sert de checklist de cadrage avant l'implémentation du front client étudiant.
Il est conçu pour être partagé tel quel avec l'équipe backend afin de verrouiller le
contrat API réel avant tout développement structurant.

## 1. Décisions critiques à confirmer

### Authentification
- [ ] Le front client utilise bien `Authorization: Bearer <token>`
- [ ] Ou bien le front utilise une session/cookie `Sanctum`
- [ ] La réponse de `POST /login` est documentée et validée
- [ ] La réponse de `POST /register` est documentée et validée
- [ ] Le comportement de `POST /logout` est documenté et validé
- [ ] La réponse de `GET /api/v1/client/user` est documentée et validée
- [ ] Le comportement attendu en cas de `401` est documenté

### Base URL et préfixes
- [ ] La base URL réelle du front est confirmée
- [ ] Les routes d'auth sont confirmées à la racine ou sous un préfixe
- [ ] Les routes client sont confirmées sous `/api/v1/client`
- [ ] Les exemples d'URL complets sont validés par l'équipe backend

### Contrat de réponse
- [ ] Le format de succès est confirmé
- [ ] Le format d'erreur est confirmé
- [ ] Le format de pagination est confirmé
- [ ] Les codes métier applicatifs sont confirmés
- [ ] Le code `SUBSCRIPTION_REQUIRED` est confirmé ou remplacé

### Contrôle d'accès premium
- [ ] L'API décide seule l'autorisation d'accès au contenu premium
- [ ] Le front peut aussi s'appuyer sur les abonnements pour masquer l'UI
- [ ] Le comportement attendu en cas d'accès refusé est confirmé
- [ ] La redirection vers la page du professeur est confirmée

## 2. Questions backend à poser

### Auth
1. Quel est le schéma exact de la réponse de `POST /login` ?
2. Quel est le mode d'auth réel : Bearer token ou cookie/session ?
3. Quel est le schéma exact de la réponse de `POST /register` ?
4. `POST /register` connecte-t-il automatiquement l'étudiant ?
5. Quel est le schéma exact de la réponse de `GET /api/v1/client/user` ?
6. Que doit faire le front en cas de `401` : vider la session, rediriger, tenter un refresh ?

### Professeurs et plans
7. Existe-t-il déjà un endpoint pour le catalogue professeurs ?
8. Existe-t-il déjà un endpoint pour le profil public d'un professeur ?
9. Existe-t-il déjà un endpoint pour les plans d'un professeur ?
10. Les identifiants de professeur sont-ils numériques, UUID, ou slugs ?

### Abonnements
11. Existe-t-il déjà un endpoint pour lister les abonnements actifs de l'étudiant ?
12. Quelle route permet de créer un abonnement à un plan ?
13. Quel payload exact est attendu pour créer un abonnement ?
14. Existe-t-il une route pour annuler un abonnement ?
15. Quel est le schéma exact d'un abonnement actif côté API ?

### Cours, modules et lecture
16. Quelle route retourne les cours accessibles d'un professeur abonné ?
17. Quelle route retourne le détail d'un cours avec ses modules ?
18. Quelle route retourne le détail d'un module ?
19. Quels champs indiquent la présence d'une vidéo ou d'un PDF ?
20. Quelle est la route sécurisée de streaming vidéo ?
21. Existe-t-il une route sécurisée dédiée pour les PDF ?
22. Les identifiants de cours et modules sont-ils numériques, UUID, ou slugs ?

### Lives, livres et témoignages
23. Existe-t-il une route pour les lives accessibles à l'étudiant ?
24. Existe-t-il une route pour les livres PDF accessibles à l'étudiant ?
25. Existe-t-il une route pour les témoignages publics ou post-achat ?

### Erreurs métier
26. Quel est le code exact renvoyé quand un abonnement est requis ?
27. La réponse `403` inclut-elle un `professor_id` exploitable par le front ?
28. Quels autres codes métier importants le front doit-il gérer ?

## 3. Exemples JSON à récupérer

### Auth
- [ ] Exemple réel de `POST /login`
- [ ] Exemple réel de `POST /register`
- [ ] Exemple réel de `GET /api/v1/client/user`

### Contenu public
- [ ] Exemple réel du catalogue professeurs
- [ ] Exemple réel du détail professeur
- [ ] Exemple réel des plans d'un professeur

### Contenu privé
- [ ] Exemple réel des abonnements actifs de l'étudiant
- [ ] Exemple réel de la liste des cours d'un professeur abonné
- [ ] Exemple réel du détail d'un cours avec ses modules
- [ ] Exemple réel du détail d'un module

### Erreurs
- [ ] Exemple réel d'une erreur `401`
- [ ] Exemple réel d'une erreur `403 abonnement requis`

## 4. Hypothèses par défaut si le backend ne précise rien

- Le front client est un site étudiant séparé du panel professeur et du HQ
- Les pages publiques couvrent : accueil, catalogue, page professeur, témoignages, connexion, inscription
- Les pages privées couvrent : dashboard, abonnements, profil, cours, lives, livres par professeur
- Aucun média premium ne doit être exposé via une URL brute
- La décision la plus bloquante avant de coder reste le choix `Bearer token` vs `cookie/session`

## 5. Statut de préparation

Utiliser cette section comme mini table de suivi.

| Sujet | Statut | Notes |
| --- | --- | --- |
| Auth | À confirmer | |
| Base URL | À confirmer | |
| Préfixes | À confirmer | |
| Professeurs | À confirmer | |
| Plans | À confirmer | |
| Abonnements | À confirmer | |
| Cours | À confirmer | |
| Modules | À confirmer | |
| Streaming vidéo | Partiellement confirmé | Route de streaming mentionnée côté backend |
| PDF sécurisé | À confirmer | |
| Lives | À confirmer | |
| Livres | À confirmer | |
| Témoignages | À confirmer | |
| Format erreurs | À confirmer | |
