<script setup>
import { reactive, provide, watch, onMounted, ref } from 'vue'
import axios from 'axios'

import Sort from '../components/Sort/Index.vue'
import CardList from '../components/CardList/Index.vue'

const items = ref([])

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
  <CardList :items="items" />
</template>

<style lang="scss"></style>
