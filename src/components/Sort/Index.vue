<script setup>
import { ref, inject } from 'vue'

const { filters } = inject('filters')

function onChangeType(value, index) {
  typeButtons.value.forEach((button, i) =>
    i === index ? (button.isSelected = true) : (button.isSelected = false)
  )

  filters.pizzaType = value
}

function onChangeSelect(event) {
  filters.sortBy = event.target.value
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
      <select @change="onChangeSelect" class="select__option" name="sort" id="sort">
        <option value="-popularity">популярности</option>
        <option value="price">цене</option>
        <option value="title">алфавиту</option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Index.scss';
</style>
