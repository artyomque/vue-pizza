<script setup>
import { reactive, provide, watch, onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'

import Sort from '@/components/Sort/index.vue'
import CardList from '@/components/CardList/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Loader from '@/components/Loader/index.vue'
import { usePaginationStore } from '@/stores/paginationStore'

const items = ref([])

const isLoading = ref(false)

const paginationStore = usePaginationStore()
const { currentPage, itemsPerPage } = storeToRefs(paginationStore)

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value

  return items.value.slice(startIndex, endIndex)
})

const filters = reactive({
  sortBy: '-popularity',
  pizzaType: 'all'
})

/* async function fetchItems() {
  isLoading.value = true
  try {
    const params = {
      sortBy: filters.sortBy
    }
    const { data } = await axios.get('https://2d78f5128d00b9fb.mokky.dev/items', { params })

    const filteredData =
      filters.pizzaType !== 'all'
        ? data.filter((item) => item.categories.includes(filters.pizzaType))
        : data

    const getPrice = (item) => item.price.small ?? item.price.medium ?? item.price.large

    if (filters.sortBy === 'price' || filters.sortBy === '-price') {
      const sortOrder = filters.sortBy === 'price' ? 1 : -1
      filteredData.sort((a, b) => sortOrder * (getPrice(a) - getPrice(b)))
    }

    items.value = filteredData
    return filteredData
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    isLoading.value = false
  }
} */

async function fetchData(params) {
  const { data } = await axios.get('https://2d78f5128d00b9fb.mokky.dev/items', { params })
  return data
}

function filterData(data, pizzaType) {
  return pizzaType !== 'all' ? data.filter((item) => item.categories.includes(pizzaType)) : data
}

function sortData(data, sortBy) {
  const getPrice = (item) => item.price.small ?? item.price.medium ?? item.price.large
  const sortOrder = sortBy === 'price' ? 1 : -1
  return data.sort((a, b) => sortOrder * (getPrice(a) - getPrice(b)))
}

async function fetchItems() {
  isLoading.value = true
  try {
    const data = await fetchData({ sortBy: filters.sortBy })
    const filteredData = filterData(data, filters.pizzaType)
    if (filters.sortBy !== 'price' && filters.sortBy !== '-price') {
      items.value = filteredData
      return items.value
    }

    items.value = sortData(filteredData, filters.sortBy)
    return items.value
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    isLoading.value = false
  }
}

provide('filters', {
  filters
})

watch(filters, async () => {
  await fetchItems()
})

onMounted(async () => {
  await fetchItems()
})
</script>

<template>
  <Sort :filters="filters" />
  <div v-if="isLoading" class="loader--home">
    <Loader />
  </div>
  <div v-else>
    <CardList :items="displayedItems" />
    <Pagination :items="items" />
  </div>
</template>

<style lang="scss">
.loader--home {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
</style>
