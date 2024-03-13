import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const localCart = localStorage.getItem('cart')

  const totalPrice = computed(() =>
    cart.value.reduce((acc, item) => acc + item.price * item.amount, 0)
  )

  const totalCartItems = computed(() => cart.value.reduce((acc, item) => acc + item.amount, 0))

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

  function removeFromCart(item) {
    this.cart.splice(this.cart.indexOf(item), 1)
  }

  function increaseAmount(item) {
    item.amount++
  }

  function decreaseAmount(item) {
    if (item.amount === 1) {
      this.removeFromCart(item)
    } else {
      item.amount--
    }
  }

  function clearCart() {
    cart.value = []
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
    totalPrice,
    totalCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount
  }
})
