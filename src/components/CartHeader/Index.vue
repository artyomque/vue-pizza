<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

function onClickClear() {
  cartStore.clearCart()
}
</script>

<template>
  <div class="cart__header">
    <h2 class="cart__title">Корзина</h2>
    <button @click="onClickClear()" class="cart__clear-btn">Очистить корзину</button>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
