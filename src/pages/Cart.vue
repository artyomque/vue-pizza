<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'

import CartHeader from '@/components/CartHeader/index.vue'
import CartItemList from '@/components/CartItemList/index.vue'
import CartFooter from '@/components/CartFooter/index.vue'
import InfoBlock from '@/components/InfoBlock/index.vue'

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)
</script>

<template>
  <div class="cart">
    <InfoBlock v-if="cart.length === 0" />
    <div v-else>
      <CartHeader />
      <CartItemList />
      <CartFooter />
    </div>
  </div>
</template>

<style lang="scss">
.cart {
  margin-block: clamp(40px, 1.354rem + 5.09vw, 95px) clamp(0px, -1.042rem + 4.63vw, 50px);
  margin-inline: auto;
  max-width: 821px;
}
</style>
