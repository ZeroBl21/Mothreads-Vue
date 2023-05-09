<script setup>
import { ref, watchEffect } from 'vue'

import SearchInput from '../components/SearchInput.vue'
import BookList from '../components/BookList.vue'
import useInfinityScroll from '@/composables/useInfinityScroll.js'
import api from '@/api.js'

const books = ref([])
const q = ref('Git')
const startIndex = ref(0)
const loading = ref(false)
const el = ref(null)

useInfinityScroll(el, () => (startIndex.value += 10))

watchEffect(async () => {
  loading.value = true
  const newBooks = await api.books.list(q.value, startIndex.value)
  if (startIndex.value > 0) {
    books.value.push(...newBooks)
    loading.value = false
    return
  }

  books.value = newBooks
  loading.value = false
})

function handleSubmit(e) {
  const { search } = e.target.elements
  if (!search) return

  startIndex.value = 0
  q.value = search.value
}
</script>

<template>
  <SearchInput :handle-submit="handleSubmit" />
  <BookList ref="el" :books="books" :loading="loading" />
</template>
