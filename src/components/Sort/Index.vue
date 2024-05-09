<script setup>
import { ref, inject, watch } from 'vue'

import Dropdown from '@/components/Dropdown/index.vue'

const { filters } = inject('filters')

const options = ref([
  { name: 'популярности ↓', value: '-popularity' },
  { name: 'популярности ↑', value: 'popularity' },
  { name: 'цене ↓', value: '-price' },
  { name: 'цене ↑', value: 'price' },
  { name: 'алфавиту ↓', value: '-title' },
  { name: 'алфавиту ↑', value: 'title' }
])

const parentSelectedOption = ref(options.value[0])

function onChangeType(value, index) {
  typeButtons.value.forEach((button, i) =>
    i === index ? (button.isSelected = true) : (button.isSelected = false)
  )

  filters.pizzaType = value
}

const typeButtons = ref([
  {
    label: 'Все',
    value: 'all',
    isSelected: true
  },
  {
    label: 'Мясные',
    value: 'meat',
    isSelected: false
  },
  {
    label: 'Вегетарианские',
    value: 'veg',
    isSelected: false
  },
  {
    label: 'Гриль',
    value: 'grill',
    isSelected: false
  },
  {
    label: 'Острые',
    value: 'spicy',
    isSelected: false
  },
  {
    label: 'Закрытые',
    value: 'closed',
    isSelected: false
  }
])

watch(parentSelectedOption, () => {
  filters.sortBy = parentSelectedOption.value.value
})
</script>

<template>
  <div class="sort-section">
    <div class="pizza-type">
      <button
        v-for="(button, index) in typeButtons"
        :key="index"
        :class="button.isSelected ? 'pizza-type__button--active' : 'pizza-type__button'"
        @click="onChangeType(button.value, index)"
        :value="button.value"
      >
        {{ button.label }}
      </button>
    </div>
    <div class="select__wrapper">
      Сортировка по:
      <Dropdown :options="options" v-model="parentSelectedOption" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
