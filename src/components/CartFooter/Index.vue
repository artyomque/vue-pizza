<script setup>
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

async function makeOrder() {
  try {
    // eslint-disable-next-line
    const { data } = await axios.post('https://2d78f5128d00b9fb.mokky.dev/orders', {
      items: cart.value,
      totalPrice: cartStore.totalPrice
    })

    // popularity update

    const response = await axios.get('https://2d78f5128d00b9fb.mokky.dev/items')

    const items = response.data

    for (const cartItem of cart.value) {
      const matchingItem = items.find((item) => item.title === cartItem.title)
      if (matchingItem) {
        matchingItem.popularity++
      }
    }

    cartStore.clearCart()

    await axios.patch(`https://2d78f5128d00b9fb.mokky.dev/items`, items)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="order">
    <span class="order__total">Всего пицц:
      <span class="order__total-counter">{{ cartStore.totalCartItems }} шт.</span></span>
    <span class="order__total">Сумма заказа: <span class="order__total-price">{{ cartStore.totalPrice }}
        р.</span></span>
  </div>
  <div class="cart-controls">
    <router-link to="/">
      <button class="cart-controls__btn-return">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="cart-controls__arrow-left" d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>Вернуться назад
      </button>
    </router-link>
    <button @click="makeOrder()" class="cart-controls__btn-order">Оплатить сейчас</button>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
