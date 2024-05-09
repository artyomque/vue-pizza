<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import Header from '@/components/Header/index.vue'
import Loader from '@/components/Loader/index.vue'

const authStore = useAuthStore()

function checkUser() {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))

  if (tokens) {
    authStore.userInfo.userId = tokens.userId
    authStore.userInfo.token = tokens.token
    authStore.userInfo.email = tokens.email
    authStore.userInfo.refreshToken = tokens.refreshToken
  }
}

onMounted(() => {
  checkUser()
})
</script>

<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <component :is="Component"></component>
            <template #fallback>
              <Loader />
            </template>
          </Suspense>
        </template>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss"></style>
