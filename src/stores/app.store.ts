import { defineStore } from 'pinia'
import type { Item } from '@/models'
import { BASE_URL } from '@/consts'
import { buildRequestParams } from '@/utils'
import { useFilterStore } from './filter.store'
import { useMessageStore } from './message.store'

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
        const filterStore = useFilterStore()
        const queryParams = buildRequestParams(filterStore)
        const response = await fetch(`${BASE_URL}${queryParams}`)
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
