import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const localCart = localStorage.getItem('cart')

  if (localCart) {
    cart.value = JSON.parse(localCart)
  }

  function addToCart(item) {
    const existingItem = this.cart.find(
      (it) => it.title === item.title && it.size === item.size && it.thickness === item.thickness
    )

    if (!existingItem) {
      this.cart.push(item)
      console.log(this.cart)
    } else {
      existingItem.amount++
      console.log(this.cart)
    }
  }

  watch(
    cart,
    (state) => {
      localStorage.setItem('cart', JSON.stringify(state))
    },
    { deep: true }
  )

  return {
    cart,
    addToCart
  }
})
