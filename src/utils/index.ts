import type { Store } from 'pinia'
import type { FilterState } from '@/stores/filter.store'

export const buildRequestParams = (filters: Store<'filterStore', FilterState, {}, {}>) => {
  const { selectedLimit, selectedSort, selectedCategory } = filters

  return `${
    selectedCategory?.value ? `/category/${encodeURIComponent(selectedCategory.value)}` : ''
  }?limit=${selectedLimit?.value}&sort=${selectedSort?.value}`
}
