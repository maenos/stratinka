<template>
  <footer class="mt-20 border-t border-white/70 bg-[var(--color-bg)] text-white">
    <div class="page-shell grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
      <div>
        <p class="eyebrow border-white/15 bg-white/5 text-white">Stratinka Student</p>
        <h2 class="max-w-md text-3xl font-semibold leading-tight">
          Une interface pensée pour suivre les meilleurs contenus de vos professeurs, sans friction.
        </h2>
      </div>
      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Explorer</h3>
        <div class="flex flex-col gap-3 text-sm text-white/80">
          <router-link to="/catalogue">Catalogue des professeurs</router-link>
          <router-link to="/temoignages">Témoignages</router-link>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Espace étudiant</h3>
        <div class="flex flex-col gap-3 text-sm text-white/80">
          <router-link to="/tableau-de-bord">Tableau de bord</router-link>
          <router-link to="/mes-abonnements">Mes abonnements</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
