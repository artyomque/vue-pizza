<script setup>
import Card from '@/components/Card/index.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="section">
    <h2 class="section__title">Все пиццы</h2>
    <div class="section__grid">
      <Card v-for="item in items" :key="item.id" :id="item.id" :title="item.title" :img-url="item.imgUrl"
        :price="item.price" :thickness="item.thickness" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
