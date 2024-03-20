<script setup></script>

<template>
  <div class="info-block">
    <div class="info-block__title">Корзина пустая <img src="/sad.png" /></div>
    <div class="info-block__text">
      Вероятней всего, вы еще не добавили пиццу в корзину. <br />
      Для того, чтобы заказать пиццу, перейдите на главную страницу.
    </div>
    <img class="info-block__img" src="/shopping-cart.png" alt="" />
    <router-link to="/"
      ><button class="info-block__btn-return">Вернуться назад</button></router-link
    >
  </div>
</template>

<style lang="scss" scoped>
@import './Index.scss';
</style>
