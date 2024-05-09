<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

import Loader from '@/components/Loader/index.vue'
import InputField from '@/components/InputField/index.vue'

const schema = {
  email: 'required|email',
  password: 'required|minLength:6',
  telephone: 'required|minLength:12|maxLength:12',
  firstName: 'required',
  lastName: '',
  address: 'required'
}

const { values, meta, handleSubmit } = useForm({
  validationSchema: schema
})

const authStore = useAuthStore()
const router = useRouter()

async function signup(values) {
  try {
    const user = {
      email: values.email,
      password: values.password,
      telephone: values.telephone,
      firstName: values.firstName,
      address: values.address
    }

    if (values.lastName !== null && values.lastName !== undefined) {
      user.lastName = values.lastName
    }

    await authStore.auth(user, 'signUp')
    router.push('/')
  } catch (e) {
    console.log(e)
  }
}

const onSubmit = handleSubmit((values) => {
  signup(values)
})
</script>

<template>
  <div class="signup">
    <div class="signup__header">
      <h2 class="signup__title">Создать аккаунт</h2>
      <span class="signup__subtitle">Зарегистрируйтесь и получайте бонусы с каждого заказа!</span>
    </div>
    <div class="signup__form">
      <InputField name="email" type="email" placeholder="Email" />
      <InputField name="password" type="password" placeholder="Пароль" />
      <InputField name="telephone" placeholder="Номер телефона" />
      <InputField name="firstName" placeholder="Имя" />
      <InputField name="lastName" placeholder="Фамилия" />
      <InputField name="address" placeholder="Адрес" />
    </div>
    <div class="signup__footer">
      <Loader v-if="authStore.isLoading" />
      <button
        :disabled="!meta.valid"
        v-else
        @click="onSubmit()"
        :class="[meta.valid ? 'signup__btn' : 'signup__btn--disabled']"
      >
        Зарегистрироваться
      </button>
      <div v-if="authStore.error" class="signup__api-error">{{ authStore.error }}</div>
      <span class="signup__already"
        >Уже зарегистрированы?
        <router-link to="/signin"
          ><span class="signup__login-link">Войдите в свой аккаунт!</span></router-link
        ></span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    font-family: var(--font-bold);
    font-size: 32px;
  }

  &__subtitle {
    font-family: var(--font-regular);
    font-size: 18px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    font-family: var(--font-regular);
  }

  &__api-error {
    font-family: var(--font-bold);
    color: red;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__btn {
    padding: 18px 42px;
    border-radius: 30px;
    border: 2px solid var(--button-accent);

    background-color: var(--button-accent);
    font-family: var(--font-bold);
    color: #ffffff;

    &--disabled {
      padding: 18px 42px;
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

  &__already {
    font-family: var(--font-regular);
  }

  &__login-link {
    color: var(--button-accent);

    &:hover {
      transition: color 0.2s ease-in;
      color: #ff8234;
    }
  }
}
</style>
