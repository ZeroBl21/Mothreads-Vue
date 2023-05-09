<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  handleSubmit: Function
})
</script>

<template>
  <form role="search" aria-label="Search" @submit.prevent="handleSubmit">
    <label for="search" class="sr-only"> Search books </label>
    <div class="search">
      <span class="search__icon">
        <Icon icon="ic:round-search" height="25" width="25" />
      </span>
      <input id="search" type="search" class="search__input" placeholder="Search book name, author, edition..." />
    </div>
  </form>
</template>

<style>
.search {
  position: relative;
  margin: 1rem 1rem 0;
  width: 95%;
  margin: 1rem auto;
}

.search__icon {
  display: flex;
  position: absolute;
  padding: 0.5rem 0 0 1rem;
}

.search__input {
  background-color: transparent;
  color: white;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 3rem;
  border: 1px solid var(--accent-color-2);
  border-radius: 0.5rem;
}

.search__input:focus {
  outline: 1px solid var(--brand);
}
</style>
