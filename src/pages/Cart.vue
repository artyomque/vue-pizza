<script setup>
import { useCartStore } from '../stores/cartStore'

import CartHeader from '../components/CartHeader/Index.vue'
import CartItemList from '../components/CartItemList/Index.vue'
import CartFooter from '../components/CartFooter/Index.vue'

const cartStore = useCartStore()
</script>

<template>
  <div class="cart">
    <CartHeader />
    <CartItemList />
    <CartFooter />
  </div>
</template>

<style lang="scss">
.cart {
  margin-block: 95px 0;
  padding-bottom: 130px; // пофиксить потом
  margin-inline: auto;
  max-width: 821px;
}
</style>
