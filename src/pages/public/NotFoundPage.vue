<template>
  <section class="page-shell py-24">
    <div class="panel mx-auto max-w-2xl p-10 text-center">
      <p class="eyebrow">404</p>
      <h1 class="section-title">Cette page n’existe pas.</h1>
      <p class="mt-4 text-sm text-[var(--color-text-soft)]">
        L’URL demandée ne correspond à aucune ressource du front étudiant.
      </p>
      <router-link
        to="/"
        class="mt-8 inline-flex rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white"
      >
        Retour à l’accueil
      </router-link>
    </div>
  </section>
</template>
