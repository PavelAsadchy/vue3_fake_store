import { defineStore } from 'pinia'
import type { FilterOption } from '@/models/index'
import { RESULTS_LIMIT_ITEMS, SORT_ITEMS } from '@/consts'

export interface FilterState {
  selectedLimit: FilterOption | null | undefined
  selectedSort: FilterOption | null | undefined
  selectedCategory: FilterOption | null | undefined
}

export const useFilterStore = defineStore('filterStore', {
  state: (): FilterState => ({
    selectedLimit: RESULTS_LIMIT_ITEMS.find((option) => option.default),
    selectedSort: SORT_ITEMS.find((option) => option.default),
    selectedCategory: null
  })
})
