# My Postit

Application de post-it (notes autocollantes) en Vue 3 + Vite + Tailwind CSS.

## Fonctionnalités

- Créer, consulter, modifier et supprimer des post-it
- Persistance des données via **IndexedDB** (base de données du navigateur, pas de backend requis)
- Migration automatique des anciennes données `localStorage` vers IndexedDB au premier chargement
- Notifications de succès/erreur, états de chargement et état vide

## Stack technique

- [Vue 3](https://vuejs.org/) (`<script setup>`)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- IndexedDB natif (aucune dépendance supplémentaire)

## Structure

```
src/
  db/postitsDb.js          accès bas niveau à IndexedDB
  composables/usePostits.js état partagé + logique métier (CRUD)
  composables/useToast.js  notifications globales
  components/               composants UI
  views/                     pages routées
  router/index.js            routes
```

## Démarrage

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
npm run preview  # prévisualiser le build
```
