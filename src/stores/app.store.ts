import { defineStore } from 'pinia'
import type { Item } from '@/models'
import { BASE_URL, LOCAL_VALUE_KEY, MOCKED_AUTH_USER_DATA } from '@/consts'
import { buildRequestParams, checkLocalValue, setLocalValue } from '@/utils'
import { useFilterStore } from './filter.store'
import { useMessageStore } from './message.store'

interface AppState {
  isAuthenticated: boolean
  _itemListTotal: Item[]
  isLoading: boolean
  displayItemList: Item[]
  search: string
  selected: Item | null
}

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    isAuthenticated: !!checkLocalValue(LOCAL_VALUE_KEY.AUTH),
    _itemListTotal: [],
    isLoading: false,
    displayItemList: [],
    search: '',
    selected: null
  }),
  actions: {
    async tryLogin(_username: string, _password: string) {
      try {
        this.isLoading = true
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(MOCKED_AUTH_USER_DATA)
        })
        const { token } = await response.json()

        if (token) {
          this.isAuthenticated = true
          setLocalValue(LOCAL_VALUE_KEY.AUTH, token, 3600 * 24)
          this.router.push({ name: 'Home' })
        }
      } catch (err) {
        const messageStore = useMessageStore()
        messageStore.showMessage('Unable to login')
      } finally {
        this.isLoading = false
      }
    },
    async initItemListTotal() {
      const response = await fetch(`${BASE_URL}/products`)
      this._itemListTotal = await response.json()
    },
    async getItems() {
      try {
        this.isLoading = true
        const filterStore = useFilterStore()
        filterStore.page = 1
        const queryParams = buildRequestParams(filterStore)
        const response = await fetch(`${BASE_URL}/products${queryParams}`)
        this.displayItemList = await response.json()
      } catch (err) {
        const messageStore = useMessageStore()
        messageStore.showMessage('Smth went wrong')
      } finally {
        this.isLoading = false
      }
    },
    async getSelectedItem(id: string) {
      try {
        const response = await fetch(`${BASE_URL}/products/${id}`)
        this.selected = await response.json()
      } catch (err) {
        const messageStore = useMessageStore()
        messageStore.showMessage('Smth went wrong')
      }
    },
    paginateItems(start: number, end: number) {
      this.displayItemList = this._itemListTotal.slice(start, end)
    }
  },
  getters: {
    totalItemCount: (state) => state?._itemListTotal?.length
  }
})
