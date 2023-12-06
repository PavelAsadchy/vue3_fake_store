import { defineStore } from 'pinia'
import { useMessageStore } from './message.store'

interface ItemRating {
  rate: number
  count: number
}

export interface Item {
  id: string
  category: string
  title: string
  description: string
  image: string
  price: number
  rating: ItemRating
}

interface AppState {
  isLoading: boolean
  itemList: Item[]
  search: string
  selected: any | null
}

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({ isLoading: false, itemList: [], search: '', selected: null }),
  actions: {
    async getItems() {
      try {
        this.isLoading = true
        const response = await fetch('https://fakestoreapi.com/products')
        this.itemList = await response.json()
      } catch (err) {
        const messageStore = useMessageStore()
        messageStore.showMessage('Smth went wrong')
      } finally {
        this.isLoading = false
      }
    }
  }
})
