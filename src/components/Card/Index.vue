<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  id: Number,
  title: String,
  price: Object,
  thickness: Object,
  categories: Array,
  imgUrl: String
})

const cartStore = useCartStore()

const cart = useCartStore().cart

const prefixIsHidden = ref(false)

const itemCounter = ref(0)

const thickness = reactive([
  { label: 'тонкое', isAvailable: props.thickness.thin, selected: false },
  { label: 'традиционное', isAvailable: props.thickness.thick, selected: false }
])

const sizes = reactive([
  { label: '26 см.', price: props.price.small, selected: false },
  { label: '30 см.', price: props.price.medium, selected: false },
  { label: '40 см.', price: props.price.large, selected: false }
])

function returnSelectedPrice() {
  const selectedSize = sizes.find((size) => size.selected === true)
  return selectedSize.price
}

function selectSizeOnClick(index) {
  sizes.forEach((size, i) => {
    size.selected = i === index
  })

  prefixIsHidden.value = true
}

function selectThicknessOnClick(index) {
  thickness.forEach((thickness, i) => {
    thickness.selected = i === index
  })
}

function addOnClick() {
  const selectedSize = sizes.find((size) => size.selected === true)
  const selectedThickness = thickness.find((thickness) => thickness.selected === true)

  const item = {
    title: props.title,
    size: selectedSize.label,
    thickness: selectedThickness.label,
    price: selectedSize.price,
    imgUrl: props.imgUrl,
    amount: 1
  }

  cartStore.addToCart(item)
  prefixIsHidden.value = true
  itemCounter.value++
}

const firstAvailableSizeIndex = sizes.findIndex((size) => size.price !== null)
const firstAvailableThicknessIndex = thickness.findIndex(
  (thickness) => thickness.isAvailable !== false
)

sizes[firstAvailableSizeIndex].selected = true
thickness[firstAvailableThicknessIndex].selected = true

onMounted(() => {
  itemCounter.value = cart
    .filter((it) => it.title === props.title)
    .reduce((acc, it) => acc + it.amount, 0)
})
</script>

<template>
  <div class="card">
    <img class="card__img" :src="imgUrl" alt="" />
    <h3 class="card__title">{{ title }}</h3>
    <div class="settings">
      <div class="settings__menu">
        <button
          v-for="(thickness, index) in thickness"
          :key="index"
          :class="[
            thickness.selected ? 'settings__button--active' : 'settings__button',
            thickness.isAvailable === false ? 'settings__button--disabled' : ''
          ]"
          :disabled="thickness.isAvailable === false"
          @click="selectThicknessOnClick(index)"
        >
          {{ thickness.label }}
        </button>
      </div>
      <div class="settings__menu">
        <button
          v-for="(size, index) in sizes"
          :key="index"
          :class="[
            size.selected ? 'settings__button--active' : 'settings__button',
            size.price === null ? 'settings__button--disabled' : ''
          ]"
          :disabled="size.price === null"
          @click="selectSizeOnClick(index)"
        >
          {{ size.label }}
        </button>
      </div>
    </div>
    <div class="card__footer">
      <span class="card__price">
        <span v-if="!prefixIsHidden">от</span> {{ returnSelectedPrice() }} р.
      </span>
      <button class="card__add" @click="addOnClick()">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="card__add--plus"
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="#EB5A1E"
          /></svg
        >Добавить
        <span class="card__add--counter">{{ itemCounter }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Index.scss';
</style>
