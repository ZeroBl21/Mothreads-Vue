<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

import BookInfo from '../components/BookInfo.vue'
import api, { loadingBook } from '../api'

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
          class="details__btn"
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

        <!--
        <StatusButtons book="{book}" />
      --></div>
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
  padding: 2rem;
}

.details__header {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.details__cover {
  display: grid;
  place-items: center;
}

.details__img {
  z-index: var(--z-2);
  aspect-ratio: 9 / 16;
  max-width: 14rem;
  min-width: 14rem;
  max-height: 25rem;
  box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 0.5);
}

.details__title {
  padding-top: 1rem;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.details__info {
  display: grid;
  align-content: center;
  gap: 1rem;

  /* col-span-2 grid content-center gap-4 text-center sm:gap-8 sm:text-left */
}

.details__authors {
  font-size: 1.25rem;
  font-style: italic;
}

.details__body {
  position: relative;
  bottom: 6rem;

  border-radius: 0.25rem;
  background: var(--bg-secondary);
  padding: 2rem;
  border: 1px solid var(--accent-color);
  border-right-color: var(--accent-color-2);
  border-bottom-color: var(--accent-color-2);
  /* rounded bg-gray-800 p-8 outline outline-1 outline-slate-600 */
}

.details__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--accent-color-2);
  /* flex items-center justify-end gap-8 border-b border-slate-700 pb-4 */
}

.details__btn {
  display: grid;
  place-items: center;
  background: transparent;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  border: 1px solid var(--accent-color-2);
  transition: all 100ms ease-in;
  /* grid h-10 w-10 place-items-center rounded-full bg-slate-700 text-lg text-white transition ease-in hover:scale-110 hover:brightness-125 */
}

.details__btn:hover {
  scale: 1.1;
  filter: brightness(1.25);
  border-color: var(--brand);
}
</style>
