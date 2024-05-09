<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
//eslint-disable-next-line
const router = useRouter()

const authStore = useAuthStore()
const cartStore = useCartStore()

//eslint-disable-next-line
const token = computed(() => authStore.userInfo.token)
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
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
      <div class="cart-user-wrapper">
        <router-link to="/profile">
          <button class="account" alt="Личный кабинет" title="Личный кабинет">
            <svg
              class="svg-icon"
              style="
                min-width: 40px;
                min-height: 40px;
                vertical-align: middle;
                fill: var(--button-accent);
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M723.43 508.6c-54.123 47.75-125.977 77.056-205.163 77.056-80.364 0-153.4-30.259-207.765-79.421C184.05 539.325 105.81 652.308 105.81 787.277v68.782c0 160.968 812.39 160.968 812.39 0v-68.782c-0.005-131.415-74.22-242.509-194.77-278.677z m-205.163 28.13c140.165 0 254.095-109.44 254.095-244.64S658.668 47.218 518.267 47.218c-139.93 0-253.855 109.675-253.855 244.874 0 135.204 113.925 244.639 253.855 244.639z m0 0"
              />
            </svg>
          </button>
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
    </div>
    <router-link to="/cart">
      <button v-show="route.path !== '/cart'" class="cart-btn--mobile">
        <img class="cart-btn--mobile__img" src="/cart.svg" alt="" />
      </button>
    </router-link>
  </header>
</template>

<style lang="scss" scoped>
@import './index.scss';

.cart-user-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>
