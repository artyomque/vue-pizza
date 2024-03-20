import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaginationStore = defineStore('pagination', () => {
  const currentPage = ref(1)

  const itemsPerPage = ref(8)

  function changePage(pageNumber) {
    currentPage.value = pageNumber
  }

  return {
    currentPage,
    itemsPerPage,
    changePage
  }
})
