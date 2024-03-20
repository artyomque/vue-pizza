<script setup>
import { reactive, provide, watch, onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'

import Sort from '@/components/Sort/Index.vue'
import CardList from '@/components/CardList/Index.vue'
import Pagination from '@/components/Pagination/Index.vue'
import { usePaginationStore } from '@/stores/paginationStore'

const items = ref([])

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

async function fetchItems() {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    const { data } = await axios.get('https://2d78f5128d00b9fb.mokky.dev/items', { params })

    if (filters.pizzaType !== 'all') {
      const filtered = data.filter((item) => item.categories.includes(filters.pizzaType))
      items.value = filtered
    } else {
      items.value = data
    }

    if (filters.sortBy === 'price') {
      items.value.sort((a, b) => {
        const getPrice = (item) => {
          if (item.price.small !== null) return item.price.small
          if (item.price.medium !== null) return item.price.medium
          if (item.price.large !== null) return item.price.large
        }

        return getPrice(a) - getPrice(b)
      })
    }

    return data
  } catch (e) {
    console.log(e)
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
  <CardList :items="displayedItems" />
  <Pagination :items="items" />
</template>

<style lang="scss"></style>
