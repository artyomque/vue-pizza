import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { initializeApp } from 'firebase/app'
import { defineRule } from 'vee-validate'

import { useAuthStore } from '@/stores/authStore'

import '@/assets/scss/main.scss'
import '@/api'

import App from '@/App.vue'
import Home from '@/pages/Home.vue'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'vue-pizza-1554b.firebaseapp.com',
  projectId: 'vue-pizza-1554b',
  storageBucket: 'vue-pizza-1554b.appspot.com',
  messagingSenderId: '353070821396',
  appId: '1:353070821396:web:b3ef8bed4cf2f065887701'
}

initializeApp(firebaseConfig)

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: () => import('./pages/Cart.vue') },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('./pages/SignUp.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: () => import('./pages/SignIn.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('./pages/Profile.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//eslint-disable-next-line
router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  const signedIn = authStore.userInfo.token

  if (to.meta.requiresAuth == true && !signedIn) {
    return { name: 'Sign In' }
  }

  if (to.meta.requiresAuth == false && signedIn) {
    return { name: 'Profile' }
  }
})

// Validation rules

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'Это поле обязательно для ввода'
  }

  return true
})

defineRule('email', (value) => {
  if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value)) {
    return 'Введите корректный email'
  }

  return true
})

defineRule('minLength', (value, [limit]) => {
  if (!value || !value.length) {
    return true
  }
  if (value.length < limit) {
    return `Это поле должно содержать минимум ${limit} знаков`
  }
  return true
})

defineRule('maxLength', (value, [limit]) => {
  if (!value || !value.length) {
    return true
  }
  if (value.length > limit) {
    return `Это поле должно содержать максимум ${limit} знаков`
  }
  return true
})

/* const phoneValidator = (value) => {
  if (/^[\d\s()+-]{12,17}$/.test(value)) {
    return true
  }
  return 'От 11 до 16 цифр'
}

defineRule('phone', phoneValidator)

defineRule('phoneMasked', (value) => {
  const prepared = (value || '')
    .replaceAll(' ', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('-', '')
  return phoneValidator(prepared)
}) */

app.use(createPinia())

app.use(router)

app.mount('#app')
