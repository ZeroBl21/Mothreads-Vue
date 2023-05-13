<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SearchInput from '@/components/SearchInput.vue'
import BookList from '@/components/BookList.vue'
import useInfinityScroll from '@/composables/useInfinityScroll.js'
import api from '@/api.js'

const books = ref([])
const startIndex = ref(0)
const loading = ref(false)
const el = ref(null)

const route = useRoute()
const router = useRouter()

useInfinityScroll(el, () => (startIndex.value += 10))

watchEffect(async () => {
  loading.value = true
  const newBooks = await api.books.list(route.query?.q || "Git", startIndex.value)
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
  router.replace({ query: { q: search.value } })
}
</script>

<template>
  <SearchInput :handle-submit="handleSubmit" />
  <BookList ref="el" :books="books" :loading="loading" />
</template>
