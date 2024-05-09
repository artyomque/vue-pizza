<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  type: String,
  placeholder: String
})

const { value, errorMessage, meta, handleBlur } = useField(() => props.name)
</script>

<template>
  <div class="input__wrapper">
    <input
      class="input"
      :type="type || 'text'"
      v-model="value"
      :class="{
        input: meta.touched && meta.valid,
        input__invalid: meta.touched && !meta.valid
      }"
      @blur="handleBlur($event, true)"
      :placeholder="placeholder"
    />
    <div class="input__error">{{ errorMessage }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
