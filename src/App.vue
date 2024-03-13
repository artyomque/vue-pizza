<script setup>
import { useCartStore } from './stores/cartStore'

import Header from './components/Header/Index.vue'
</script>

<template>
  <div class="wrapper">
    <Header />
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
