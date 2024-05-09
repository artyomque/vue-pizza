import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const axiosApiInstance = axios.create()

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url
  const authStore = useAuthStore()
  if (!url.includes('signInWithPassword') && !url.includes('signup')) {
    let params = new URLSearchParams()

    if (authStore.userInfo.token.startsWith('ya29')) {
      params.append('access_token', authStore.userInfo.token)
    } else {
      params.append('auth', authStore.userInfo.token)
    }

    config.params = params
  }
  return config
})

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const authStore = useAuthStore()
    const router = useRouter()
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
          {
            grant_type: 'refresh_token',
            refresh_token: authStore.userInfo.refreshToken
          }
        )

        authStore.userInfo.token = newTokens.data.access_token
        authStore.userInfo.refreshToken = newTokens.data.refresh_token

        localStorage.setItem(
          'userTokens',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token,
            userId: authStore.userInfo.userId
          })
        )
        return axiosApiInstance(originalRequest)
      } catch (e) {
        console.log(e)
        localStorage.removeItem('userTokens')
        router.push('/signin')
        authStore.userInfo.token = ''
        authStore.userInfo.refreshToken = ''
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosApiInstance
