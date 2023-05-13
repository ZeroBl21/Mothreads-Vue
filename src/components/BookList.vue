<script setup>
import BookCard from '@/components/BookCard.vue'
import { loadingBooks } from '@/api.js'

defineProps({
  books: Array,
  loading: Boolean,
  square: Boolean,
})
</script>

<template>
  <section class="books" :class="{ square: square }">
    <BookCard v-for="book of books" :key="book.id" :book="book" />
    <template v-if="loading">
      <BookCard v-for="book of loadingBooks" :key="book.id" :book="book" />
    </template>
  </section>
</template>

<style>
.books {
  display: grid;
  gap: 2rem;
  overflow: auto;
  padding-top: 1rem;
  width: 95%;
  margin: 0 auto;
}

.square {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.square .bookcard__description {
  display: none;
}

.square .bookcard {
  grid-template-columns: auto;
}

.square .bookcard__header {
  flex-direction: column;
}

.square .bookcard__details,
.square .bookcard__title {
  text-align: center;
}
</style>
