<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: { default: null }
})

const isVisible = ref(false)

const dropdown = ref(null)

const emit = defineEmits('update:modelValue')

const selectedOption = ref(props.modelValue || props.options[0])

const selectOption = (option) => {
  selectedOption.value = option
  emit('update:modelValue', option)
  isVisible.value = false
}

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const closeDropdown = (element) => {
  if (!dropdown.value.contains(element.target)) {
    isVisible.value = false
  }
}

const mappedSelectedOption = computed(() => {
  return selectedOption.value?.name
})

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="dropdown" ref="dropdown">
    <div class="dropdown__option--selected" @click="toggleVisibility">
      {{ mappedSelectedOption }}
    </div>
    <div class="dropdown__options" v-if="isVisible">
      <div
        class="dropdown__option"
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
