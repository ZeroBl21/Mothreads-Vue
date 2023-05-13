<script setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

import BookList from '@/components/BookList.vue'
import SearchInput from '@/components/SearchInput.vue'
import useLocalBooks from '@/composables/useLocalBooks.js'

const filters = {
  all: (books) => books,
  favorites: (books) => books.filter((book) => book.isFavorite),
}

const localBooks = useLocalBooks()
const visibility = ref('all')
const list = ref(false)

const filteredBooks = computed(() => filters[visibility.value](localBooks.value))

</script>

<template>
  <div class="container">
    <h1 class="library__title">Library</h1>
    <SearchInput />
    <menu>
      <ul class="library__filters">
        <li class="filter__item" :class="{ 'active': visibility === 'all' }">
          <button class="icon" @click="visibility = 'all'">
            All
          </button>
        </li>
        <li class="filter__item" :class="{ 'active': visibility === 'favorites' }">
          <button class="icon" @click="visibility = 'favorites'">Favorites</button>
        </li>
        <li class="filter__item left" :class="{ 'active': !list }">
          <button class="icon" @click="list = false">
            <Icon icon="ic:baseline-format-list-bulleted" height="20" width="20" color="white" />
          </button>
        </li>
        <li class="filter__item" :class="{ 'active': list }">
          <button class="icon" @click="list = true">
            <Icon icon="ph:squares-four" height="20" width="20" color="white" />
          </button>
        </li>
      </ul>
    </menu>
    <BookList v-if="filteredBooks.length > 0" :books="filteredBooks" :square="list" />
    <p v-else>You don&apos;t have any books in your library.</p>
  </div>
</template>

<style>
.library__title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
}

.library__filters {
  display: flex;
  gap: 0.5rem;
  width: 95%;
  align-items: center;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: var(--bg-secondary);
  border-radius: 0.25rem;
  border: 1px solid var(--accent-color);
  border-right-color: var(--accent-color-2);
  border-bottom-color: var(--accent-color-2);
}

.filter__item {
  display: flex;
  outline: 1px solid var(--accent-color);
  border-radius: 0.25rem;
}

.filter__item.active {
  outline-color: var(--brand);
}

.icon {
  padding: 0.5rem;
}
</style>
