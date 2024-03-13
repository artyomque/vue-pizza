<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const cartStore = useCartStore()
</script>

<template>
  <header class="header">
    <div class="container">
      <router-link to="/">
        <div class="header__info">
          <img src="/logo.png" class="header__logo" alt="Vue Pizza" />
          <div class="header__info-desc">
            <h1 class="header__title">Vue Pizza</h1>
            <span class="header__subtitle"
              >самая лучшая пицца для практики по реактивным фреймворкам</span
            >
          </div>
        </div>
      </router-link>
      <router-link to="/cart">
        <button v-show="route.path !== '/cart'" class="cart-btn">
          <span class="cart-btn__total">{{ cartStore.totalPrice }}р.</span>
          <div class="cart-btn__delimiter"></div>
          <span class="cart-btn__items"
            ><img class="cart-btn__img" src="/cart.svg" alt="" />{{
              cartStore.totalCartItems
            }}</span
          >
        </button>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import './Index.scss';
</style>
