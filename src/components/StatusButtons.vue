<script setup>
import { computed, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'

import useLocalBooks from '@/composables/useLocalBooks.js'

const p = defineProps({
  book: Object
})

const localBooks = useLocalBooks()
const matchingBook = computed(
  () => localBooks.value?.find((li) => li.id === p.book.id) ?? null
)

function addToLocalBooks() {
  if (matchingBook.value) return

  const newBook = {
    ...p.book,
    isFavorite: false
  }

  localBooks.value.push(newBook)
}

function deleteFromLocalBooks(id) {
  localBooks.value = localBooks.value.filter((book) => book.id !== id)
}

function toggleFavorite(id) {
  localBooks.value = localBooks.value.map((i) => {
    if (i.id === id) {
      return {
        ...i,
        isFavorite: !i.isFavorite
      }
    }
    return i
  })
  console.log(localBooks.value)
}
</script>

<template>
  <template v-if="matchingBook">
    <button
      class="btn"
      :title="`${matchingBook.isFavorite ? 'Remove' : 'Add'} to favorites`"
      @click="toggleFavorite(book.id)"
    >
      <Icon
        v-if="matchingBook.isFavorite"
        icon="material-symbols:bookmark"
        height="20"
        width="20"
        color="#ffffff"
      />
      <Icon
        v-else
        icon="material-symbols:bookmark-outline-rounded"
        height="20"
        width="20"
        color="#ffffff"
      />
    </button>
    <button
      class="btn danger"
      title="Remove from Bookshelf"
      @click="deleteFromLocalBooks(book.id)"
    >
      <Icon
        icon="material-symbols:delete-forever-outline-rounded"
        height="20"
        width="20"
        color="#ffffff"
      />
    </button>
  </template>
  <button v-else class="btn" title="Add to Bookshelf" @click="addToLocalBooks">
    <Icon icon="material-symbols:add" height="20" width="20" color="#ffffff" />
  </button>
</template>
