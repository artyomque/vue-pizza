import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import './assets/scss/main.scss'

import App from './App.vue'
import Home from './pages/Home.vue'
import Cart from './pages/Cart.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(createPinia())

app.use(router)

app.mount('#app')
