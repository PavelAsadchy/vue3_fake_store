<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeProvider from './components/providers/ThemeProvider.vue'
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <v-app>
    <ThemeProvider>
      <HeaderSection />

      <RouterView />

      <FooterSection />
    </ThemeProvider>
  </v-app>
</template>

<style scoped>
.v-application {
  max-width: 1280px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 64px 0 40px;
  background: transparent;
}

::v-deep .v-application__wrap {
  min-height: unset;
}

::v-deep .v-responsive__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
