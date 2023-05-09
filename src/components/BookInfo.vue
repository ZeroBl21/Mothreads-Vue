<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { marked } from 'marked'
import DOMpurify from 'dompurify'

const p = defineProps({
  publisher: String,
  publishedDate: String,
  description: String,
  categories: Array,
  pages: Number,
  dimensions: Object
})

const show = ref(false)

const output = computed(() => DOMpurify.sanitize(marked(p.description)))
</script>

<template>
  <section class="details__section">
    <aside class="details__containers">
      <div>
        <h2 class="details__info-title">Categories</h2>
        <p class="details__tags-list">
          <span
            v-for="category of categories"
            :key="category"
            class="details__tag"
            >{{ category }}</span
          >
        </p>
      </div>

      <div>
        <h2 class="details__info-title">Description</h2>
        <p
          class="details__description"
          :class="{ show: show }"
          v-html="output"
        />
        <button class="btn left" @click="show = !show">
          <Icon
            v-if="show"
            icon="tabler:chevron-up"
            height="20"
            width="20"
            color="white"
          />
          <Icon
            v-else
            icon="tabler:chevron-down"
            height="20"
            width="20"
            color="white"
          />
        </button>
      </div>
    </aside>

    <aside class="details__containers">
      <div>
        <h2 class="details__info-title">Publisher / Date</h2>
        <p>{{ publisher }} | {{ publishedDate }}</p>
      </div>

      <div>
        <h2 class="details__info-title">Dimensions</h2>
        <i>
          {{
            dimensions
              ? `${dimensions?.width} x ${dimensions?.thickness} x
                    ${dimensions?.height}`
              : 'Unknown'
          }}
        </i>
      </div>

      <div>
        <h2 class="details__info-title">Pages</h2>
        <p>{{ pages }}</p>
      </div>
    </aside>
  </section>
</template>

<style>
.details__section {
  display: grid;
  min-height: 500px;
}

.details__tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.details__tag {
  background-color: var(--accent-color-2);
  padding-inline: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid var(--accent-color);
  border-right-color: var(--accent-color-2);
  border-bottom-color: var(--accent-color-2);
  transition: all 100ms ease-in;
  cursor: pointer;
}

.details__tag:hover {
  border-color: var(--brand);
  scale: 1.05;
}

.details__containers {
  padding: 1rem;
}

.details__description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
}

.details__description.show {
  overflow: visible;
  display: block;
  -webkit-box-orient: horizontal;
  -webkit-line-clamp: none;
}

.details__description > * + * {
  margin-top: 0.5rem;
}

.details__info-title {
  font-weight: 600;
  font-size: 1.25rem;
  padding-block: 2rem;
}

@media (min-width: 640px) {
  .details__section {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
