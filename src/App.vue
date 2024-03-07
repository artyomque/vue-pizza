<script setup>
import { ref, reactive, computed, onMounted, watch, provide } from 'vue'
import axios from 'axios'
import { useCartStore } from './stores/cartStore'

import Header from './components/Header.vue'
import Sort from './components/Sort.vue'
import CardList from './components/CardList.vue'

const items = ref([])

const cartStore = useCartStore()

const cart = useCartStore().cart

const totalPrice = computed(() => cart.reduce((acc, item) => acc + item.price, 0))

const totalCartItems = computed(() => cart.reduce((acc, item) => acc + item.amount, 0))

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
      // спасибо чатгпт
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
  <div class="wrapper">
    <Header :total-price="totalPrice" :total-cart-items="totalCartItems" />
    <Sort :filters="filters" />
    <CardList :items="items" />
  </div>
</template>

<style lang="scss" scoped></style>
