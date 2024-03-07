<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'

defineProps({
  totalPrice: Number,
  totalCartItems: Number
})

const cart = useCartStore().cart
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__info">
        <img src="/logo.png" class="header__logo" alt="Vue Pizza" />
        <div class="header__info-desc">
          <h1 class="header__title">Vue Pizza</h1>
          <span class="header__subtitle"
            >самая лучшая пицца для практики по реактивным фреймворкам</span
          >
        </div>
      </div>
      <button class="cart">
        <span class="cart__total">{{ totalPrice }}р.</span>
        <div class="cart__delimiter"></div>
        <span class="cart__items"
          ><img class="cart__img" src="/cart.svg" alt="" />{{ totalCartItems }}</span
        >
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
