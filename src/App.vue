<script setup>
import { useCartStore } from './stores/cartStore'

import Header from './components/Header/Index.vue'
</script>

<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss"></style>
