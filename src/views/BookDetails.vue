<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

import StatusButtons from '@/components/StatusButtons.vue'
import BookInfo from '@/components/BookInfo.vue'
import api, { loadingBook } from '@/api'

const route = useRoute()

const book = ref(loadingBook)

watchEffect(async () => {
  book.value = await api.books.find(route.params.id)
})
</script>

<template>
  <article class="container">
    <section class="details__header">
      <figure class="details__cover">
        <img :src="book?.thumbnail" class="details__img" />
      </figure>
      <div class="details__info">
        <h1 class="details__title">{{ book?.title }}</h1>
        <p class="details__authors">by {{ book?.authors?.join(' | ') }}</p>
      </div>
    </section>
    <div class="details__body">
      <div class="details__actions">
        <button
          class="btn"
          title="Copy link to clipboard"
          @click="() => {}"
        >
          <Icon
            icon="ic:baseline-share"
            height="20"
            width="20"
            color="#ffffff"
          />
        </button>

        <StatusButtons :book="book" />
      </div>
      <BookInfo
        :publisher="book?.publisher"
        :published-date="book?.publishedDate"
        :description="book?.description"
        :categories="book?.categories"
        :pages="book?.pages"
        :dimensions="book?.dimensions"
      />
    </div>
  </article>
</template>

<style>
.container {
  padding: 1rem;
}

.details__header {
  display: grid;
}

.details__cover {
  display: grid;
  place-items: center;
}

.details__img {
  z-index: var(--z-2);
  aspect-ratio: 9 / 16;
  width: 11rem;
  height: 17rem;
  box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 0.5);
}

.details__title {
  padding-top: 1rem;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.details__info {
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  margin-bottom: 1rem;
}

.details__authors {
  font-size: 1.25rem;
  font-style: italic;
}

.details__body {
  border-radius: 0.25rem;
  background: var(--bg-secondary);
  padding: 1rem;
  border: 1px solid var(--accent-color);
  border-right-color: var(--accent-color-2);
  border-bottom-color: var(--accent-color-2);
}

.details__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--accent-color-2);
}

@media (min-width: 640px) {
  .details__header {
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }

  .details__body {
    position: relative;
    bottom: 6rem;
  }

  .details__img {
    width: 13rem;
    height: 20rem;
  }

  .details__info {
    text-align: left;
    justify-items: normal;
  }
}
</style>
