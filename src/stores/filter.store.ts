import { defineStore } from 'pinia'
import type { FilterOption } from '@/models/index'
import { RESULTS_LIMIT_ITEMS, SORT_ITEMS } from '@/consts'
import { useAppStore } from './app.store'

export interface FilterState {
  selectedLimit: FilterOption | null | undefined
  selectedSort: FilterOption | null | undefined
  selectedCategory: FilterOption | null | undefined
  page: number
}

export const useFilterStore = defineStore('filterStore', {
  state: (): FilterState => ({
    selectedLimit: RESULTS_LIMIT_ITEMS.find((option) => option.default),
    selectedSort: SORT_ITEMS.find((option) => option.default),
    selectedCategory: null,
    page: 1
  }),
  actions: {
    updatePage() {
      const appStore = useAppStore()
      const start = +this.selectedLimit!.value! * (this.page - 1)
      const end = start + +this.selectedLimit!.value!
      appStore.paginateItems(start, end)
    }
  }
})
