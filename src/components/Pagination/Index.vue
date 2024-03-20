<script setup>
import { storeToRefs } from 'pinia'
import { usePaginationStore } from '@/stores/paginationStore'
import { computed } from 'vue'

const paginationStore = usePaginationStore()
const { itemsPerPage, currentPage } = storeToRefs(paginationStore)

const props = defineProps({
  items: Array
})

function onClickChangePage(page) {
  paginationStore.changePage(page)
}

const pageCount = computed(() => Math.ceil(props.items.length / itemsPerPage.value))

const pages = computed(() => {
  return Array.from({ length: pageCount.value }, (_, i) => i + 1)
})
</script>

<template>
  <div class="pagination">
    <button
      type="button"
      :class="[page === currentPage ? 'pagination__btn--active' : 'pagination__btn']"
      v-for="page in pages"
      :key="page"
      @click="onClickChangePage(page)"
    >
      <div class="pagination__btn-page">{{ page }}</div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import './Index.scss';
</style>
