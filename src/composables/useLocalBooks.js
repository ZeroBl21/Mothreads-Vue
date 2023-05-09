import { ref, watchEffect } from 'vue'

function useLocalBooks() {
  const STORAGE_KEY = '__VUE_MOTHREADS__'

  const localBooks = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])

  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localBooks.value))
  })

  return localBooks
}

export default useLocalBooks
