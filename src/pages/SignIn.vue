<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

import Loader from '@/components/Loader/index.vue'
import InputField from '@/components/InputField/index.vue'

const schema = {
  email: 'required|email',
  password: 'required|minLength:6'
}

const { values, meta, handleSubmit } = useForm({
  validationSchema: schema
})

const authStore = useAuthStore()
const router = useRouter()

async function signin(values) {
  try {
    await authStore.auth({ email: values.email, password: values.password }, 'signInWithPassword')
    router.push('/')
  } catch (e) {
    console.log(e)
  }
}

async function signinWithGoogle() {
  try {
    await authStore.googleAuth()
    router.push('/')
  } catch (e) {
    console.log(e)
  }
}

const onSubmit = handleSubmit((values) => {
  signin(values)
})
</script>

<template>
  <div class="signup">
    <div class="signup__header">
      <h2 class="signup__title">Войти</h2>
      <span class="signup__subtitle"
        >Войдите в свой аккаунт и получайте бонусы с каждого заказа!</span
      >
    </div>
    <div class="signup__form">
      <InputField name="email" type="email" placeholder="Email" />
      <InputField name="password" type="password" placeholder="Пароль" />
    </div>

    <div class="signup__footer">
      <Loader v-if="authStore.isLoading" />
      <div v-else class="signup__buttons">
        <button
          :disabled="!meta.valid"
          @click="onSubmit()"
          :class="[meta.valid ? 'signup__btn' : 'signup__btn--disabled']"
        >
          Войти
        </button>
        <button @click="signinWithGoogle()" class="signup__btn">Войти через Google</button>
      </div>
      <div v-if="authStore.error" class="signup__api-error">{{ authStore.error }}</div>
      <span class="signup__already"
        >Еще не зарегистрированы?
        <router-link to="/signup"
          ><span class="signup__login-link"
            >Создайте аккаунт и начинайте копить бонусы!</span
          ></router-link
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

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
