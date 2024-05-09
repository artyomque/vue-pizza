<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'

import CartItem from '@/components/CartItem/index.vue'

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

function onClickRemove(item) {
  cartStore.removeFromCart(item)
}

function onClickIncrease(item) {
  cartStore.increaseAmount(item)
}

function onClickDecrease(item) {
  cartStore.decreaseAmount(item)
}
</script>

<template>
  <CartItem v-for="(item, index) in cart" :key="index" :imgUrl="item.imgUrl" :title="item.title"
    :thickness="item.thickness" :size="item.size" :price="item.price" :amount="item.amount"
    @on-click-remove="onClickRemove(item)" @on-click-increase="onClickIncrease(item)"
    @on-click-decrease="onClickDecrease(item)" />
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
