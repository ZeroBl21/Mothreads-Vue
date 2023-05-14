<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  book: Object
})
</script>

<template>
  <article class="bookcard__container">
    <div class="bookcard">
      <figure class="bookcard__figure">
        <img class="bookcard__img" :src="book.thumbnail" :alt="book.title" />
      </figure>

      <div class="bookcard__body">
        <div class="bookcard__header">
          <h2 class="bookcard__title font-medium">
            <RouterLink class="link" :to="`/bookshelf/${book.id}`">
              {{ book.title }}
            </RouterLink>
          </h2>
          <div class="bookcard__details">
            <span class="font-medium">
              {{ book.authors ? book.authors.join(', ') : 'Desconocido' }}
            </span>
            <span class="bookcard__publisher">
              ({{ book.publisher || 'Desconocido' }})
            </span>
          </div>
        </div>

        <p class="bookcard__description" v-html="book.description ? book.description.slice(0, 500) : ''"/>

        <div class="bookcard__actions">
          <div class="flex flex-col items-center gap-8"></div>
        </div>
      </div>
    </div>
  </article>
</template>

<style>
.bookcard__container {
  background: var(--bg-secondary);
  border: 1px solid var(--accent-color);
  border-right-color: var(--accent-color-2);
  border-bottom-color: var(--accent-color-2);

  container-name: bookcard;
  container-type: inline-size;
}

.font-medium {
  font-weight: 600;
}

.bookcard {
  display: grid;
  height: 100%;
  position: relative;
  border-radius: 0.25rem;
  padding: 2rem 3rem;
}

.bookcard__figure {
  display: grid;
  place-items: center;
  margin: 1rem;
}

.bookcard__img {
  height: 12rem;
  width: 8rem;
  aspect-ratio: 2/3;
  box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 0.5);
}

.bookcard__body {
  padding: 0 1rem;
}

.bookcard__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.bookcard__title {
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.bookcard__details {
  display: grid;
  text-align: center;
}

.bookcard__publisher {
  opacity: 0.8;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.bookcard__description {
  display: none;
  margin-top: 1rem;
  opacity: 0.8;
}

@container bookcard (min-width: 640px) {
  .bookcard__description {
    display: block;
  }

  .bookcard {
    grid-template-columns: 1fr 3fr;
  }

  .bookcard__header {
    flex-direction: row;
  }

  .bookcard__title {
    text-align: left;
  }

  .bookcard__details {
    text-align: right;
  }
}
</style>
