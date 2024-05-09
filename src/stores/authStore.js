import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth'
import axiosApiInstance from '@/api'
import axios from 'axios'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

const provider = new GoogleAuthProvider()

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: ''
  })

  const isLoading = ref(false)

  const error = ref()

  async function googleAuth() {
    try {
      const auth = getAuth()

      const result = await signInWithPopup(auth, provider)

      const credential = GoogleAuthProvider.credentialFromResult(result)

      const token = credential.accessToken

      const user = auth.currentUser

      const additionalInfo = getAdditionalUserInfo(result)

      // i don't get why the fuck google returns 401 for oAuth2-token to authenticate for DB access
      // hence the following request to exchange it for idToken-refreshToken pair which works perfectly fine

      const idpResponse = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${apiKey}`,
        {
          postBody: 'access_token=' + token + '&providerId=google.com',
          requestUri: 'https://vue-pizza-1554b.firebaseapp.com',
          returnIdpCredential: true,
          returnSecureToken: true
        }
      )

      userInfo.value = {
        token: idpResponse.data.idToken,
        refreshToken: idpResponse.data.refreshToken,
        userId: idpResponse.data.localId,
        email: idpResponse.data.email
      }

      localStorage.setItem('userTokens', JSON.stringify(userInfo.value))

      if (additionalInfo.isNewUser) {
        try {
          await axiosApiInstance.put(
            `https://vue-pizza-1554b-default-rtdb.europe-west1.firebasedatabase.app/users/${userInfo.value.userId}.json`,
            {
              email: user.email,
              telephone: '',
              address: '',
              name: { firstName: idpResponse.data.firstName, lastName: idpResponse.data.lastName }
            }
          )
        } catch (e) {
          console.log(e)
        }
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(
        `Error number ${errorCode}: ${errorMessage} while trying to log in with ${email} email using ${credential} credential`
      )
    }
  }

  async function auth(payload, type) {
    const stringUrl = type === 'signUp' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    isLoading.value = true

    try {
      const response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}
`,
        { email: payload.email, password: payload.password, returnSecureToken: true }
      )

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken
      }

      if (type === 'signUp') {
        await axiosApiInstance.put(
          `https://vue-pizza-1554b-default-rtdb.europe-west1.firebasedatabase.app/users/${response.data.localId}.json`,
          {
            email: payload.email,
            telephone: payload.telephone,
            address: payload.address,
            name: { firstName: payload.firstName, lastName: payload.lastName }
          }
        )
      }

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          userId: userInfo.value.userId,
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken
        })
      )
    } catch (e) {
      switch (e.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Такой email уже зарегистрирован'
          break
        case 'INVALID_LOGIN_CREDENTIALS':
          error.value = 'Неверные email или пароль'
          break
        default:
          error.value = 'Ошибка! Что-то пошло не так'
          break
      }

      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    }
  }

  return {
    auth,
    googleAuth,
    logout,
    userInfo,
    error,
    isLoading
  }
})
