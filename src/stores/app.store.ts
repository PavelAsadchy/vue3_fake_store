import { defineStore } from 'pinia'
import type { Cart, Item } from '@/models'
import { BASE_URL } from '@/consts'
import { buildRequestParams } from '@/utils'
import { useFilterStore } from './filter.store'
import { useMessageStore } from './message.store'

interface AppState {
  _itemListTotal: Item[]
  isLoading: boolean
  displayItemList: Item[]
  search: string
  selected: Item | null
  cart: Cart | null
}

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    _itemListTotal: [],
    isLoading: false,
    displayItemList: [],
    search: '',
    selected: null,
    cart: null
  }),
  actions: {
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
    async getCart(id: string) {
      try {
        const response = await fetch(`${BASE_URL}/carts/${id}`)
        this.cart = await response.json()
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
