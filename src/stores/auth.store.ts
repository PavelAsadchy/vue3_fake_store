import { defineStore } from 'pinia'
import type { User } from '@/models'
import { BASE_URL, LOCAL_VALUE_KEY, MOCKED_USER_DATA } from '@/consts'
import { checkLocalValue, setLocalValue } from '@/utils'
import { useMessageStore } from './message.store'
import { useAppStore } from './app.store'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    isAuthenticated: !!checkLocalValue(LOCAL_VALUE_KEY.AUTH),
    user: null
  }),
  actions: {
    async tryLogin(_username: string, _password: string) {
      try {
        const appStore = useAppStore()
        appStore.isLoading = true
        const { id, username, password } = MOCKED_USER_DATA
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })
        const { token } = await response.json()

        if (token) {
          this.getUser(id)
          this.isAuthenticated = true
          setLocalValue(LOCAL_VALUE_KEY.AUTH, token, 3600 * 24)
          this.router.push({ name: 'Home' })
        }
      } catch (err) {
        const messageStore = useMessageStore()
        messageStore.showMessage('Unable to login')
      } finally {
        const appStore = useAppStore()
        appStore.isLoading = false
      }
    },
    async getUser(id: string) {
      try {
        const response = await fetch(`${BASE_URL}/users/${id}`)
        this.user = await response.json()
        const appStore = useAppStore()
        appStore.initItemListTotal()
        appStore.getItems()
        this.user && appStore.getCart(this.user.id)
      } catch (err) {
        const messageStore = useMessageStore()
        messageStore.showMessage('Unable to login')
      }
    }
  }
})
