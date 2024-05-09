<script setup>
import { ref } from 'vue'
import axiosApiInstance from '@/api'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'vee-validate'

import InputField from '@/components/InputField/index.vue'

const authStore = useAuthStore()

const router = useRouter()

const userData = ref({})

/* const maskPhone = (value) => {
  return value
    .replace(/^\+?7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4')
    .replace(/^([0-6])/, '+$1')
    .replace(/^[7]$/, '+7 ')
    .replace(/^8$/, '+7 ')
    .replace(/^[9]$/, '+7 (9')
    .replace(/^(\+7|8)\s(\d{1,2})$/, '+7 ($2')
    .replace(/(\(\d{3})\s?(\d{1,3})$/, '$1) $2')
    .replace(/(\)\s\d{3})(\d{1,2})$/, '$1-$2')
    .replace(/(-\d{2})(\d{1,2})$/, '$1-$2')
    .replace(/^(\+?[78]\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}).+$/, '$1')
    .replace(/^(\+?[^78]\d{16}).+$/, '$1')
    .replace(/^8(\d{10})$/, '+7$1')
    .replace(/^(\d)/, '+$1')
    .replace(/\+$/, '')
} */

const schema = {
  telephone: 'required|minLength:12|maxLength:12',
  firstName: 'required',
  lastName: '',
  address: 'required'
}

const { values, meta, resetForm, handleSubmit } = useForm({
  validationSchema: schema
})

async function getUserData() {
  try {
    const uid = authStore.userInfo.userId

    const response = await axiosApiInstance.get(
      `https://vue-pizza-1554b-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
    )

    userData.value = response.data

    resetForm({
      values: {
        firstName: userData.value.name.firstName,
        lastName: userData.value.name.lastName,
        address: userData.value.address,
        telephone: userData.value.telephone
      }
    })
  } catch (e) {
    console.log(e)
  }
}

async function updateUserData(values) {
  try {
    const uid = authStore.userInfo.userId

    const response = await axiosApiInstance.patch(
      `https://vue-pizza-1554b-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
      {
        name: {
          firstName: values.firstName,
          lastName: values.lastName
        },
        address: values.address,
        telephone: values.telephone
      }
    )
  } catch (e) {
    console.log(e)
  } finally {
    resetForm({
      values: {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        telephone: values.telephone
      }
    })
  }
}

function handleLogout() {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/signin')
}

const onSubmit = handleSubmit((values) => {
  updateUserData(values)
})

await getUserData()
</script>

<template>
  <div class="profile">
    <ul class="profile__list">
      <li class="profile__item">
        <span class="profile__type">Email:</span
        ><span class="profile__key">{{ userData.email }}</span>
      </li>
      <li class="profile__item">
        <span class="profile__type">Имя:</span>
        <InputField name="firstName" placeholder="Имя" />
        <span class="profile__type">Фамилия:</span>
        <InputField name="lastName" placeholder="Фамилия" />
      </li>
      <li class="profile__item">
        <span class="profile__type">Номер телефона:</span
        ><InputField name="telephone" placeholder="Номер телефона" />
      </li>
      <li class="profile__item">
        <span class="profile__type">Адрес:</span><InputField name="address" placeholder="Адрес" />
      </li>
    </ul>
    <div class="profile__btn-wrapper">
      <button
        :disabled="!meta.dirty || !meta.valid"
        :class="{
          profile__btn: meta.dirty && meta.valid,
          profile__btn__disabled: !meta.dirty || !meta.valid
        }"
        @click="onSubmit()"
      >
        Обновить профиль
      </button>
      <button class="profile__btn" @click.prevent="handleLogout()">Выйти</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

:deep(.input__wrapper) {
  align-items: normal;
}
.profile {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
  }

  &__item {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__type {
    font-family: var(--font-bold);
  }

  &__key {
    font-family: var(--font-regular);
    margin-bottom: 5px;
  }

  &__btn-wrapper {
    display: flex;
    gap: 10px;

    @include mobile-xs() {
      flex-direction: column;
      align-items: center;
    }
  }

  &__btn {
    display: flex;
    padding: 11px 22px;
    max-width: 216px;
    border-radius: 30px;
    border: 2px solid var(--button-accent);

    background-color: var(--button-accent);
    font-family: var(--font-bold);
    color: #ffffff;

    &__disabled {
      display: flex;
      padding: 11px 22px;
      max-width: 216px;
      border-radius: 30px;
      border: 2px solid #969696;

      background-color: #969696;
      font-family: var(--font-bold);
      color: #ffffff;
    }

    &:hover {
      transition: background-color 0.2s ease-in;
      background-color: #ff8234;
    }
  }
}
</style>
