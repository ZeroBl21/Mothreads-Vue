<script setup>
import { ref, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'

import BookCard from '../components/BookCard.vue'
import api from '../api.js'

const q = ref('Git')
const books = ref([])

function handleSubmit(e) {
  const { search } = e.target.elements
  if (!search) return

  q.value = search.value
}

watchEffect(async () => {
  books.value = await api.books.list(q.value, 0)
})
</script>

<template>
  <form role="search" aria-label="Search" @submit.prevent="handleSubmit">
    <label for="search" class="sr-only"> Search books </label>
    <div class="search">
      <span class="search__icon">
        <Icon icon="ic:round-search" height="25" width="25" />
      </span>
      <input
        id="search"
        type="search"
        class="search__input"
        placeholder="Search book name, author, edition..."
      />
    </div>
  </form>
  <section class="books">
    <BookCard v-for="book of books" :key="book.id" :book="book" />
  </section>
</template>

<style scoped>
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
  border: 1px solid var(--brand);
  border-radius: 0.5rem;
}

.books {
  display: grid;
  gap: 2rem;
  overflow: auto;
  padding-top: 1rem;
  width: 95%;
  margin: 0 auto;
}
</style>
