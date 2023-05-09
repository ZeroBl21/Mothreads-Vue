import { onMounted, onUnmounted } from 'vue'

function useInfinityScroll(scrollComponent, callback) {
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    let element = scrollComponent.value
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      callback()
    }
  }
}

export default useInfinityScroll
