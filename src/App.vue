<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppLogo from './components/AppLogo.vue'
</script>

<template>
  <header class="navbar__container">
    <nav class="navbar">
      <div>
        <RouterLink to="/" title="Home">
          <AppLogo aria-label="Moth" fill="#41B883" />
        </RouterLink>
      </div>
      <ul class="navbar__list">
        <li>
          <RouterLink class="link" to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar__container {
  width: 100dvw;
  border-bottom: 2px solid rgba(60, 60, 60, 0.29);
  position: fixed;
  padding: 1rem 2rem;
  z-index: var(--z-8);
  background: linear-gradient(0, transparent, var(--bg) 40%);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
}

.navbar__list {
  display: flex;
  gap: 1rem;
}

.main {
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  padding: 6rem 0;
}
</style>
