import type { Store } from 'pinia'
import type { FilterState } from '@/stores/filter.store'

export const buildRequestParams = (filters: Store<'filterStore', FilterState, {}, {}>) => {
  const { selectedLimit, selectedSort, selectedCategory } = filters

  return `${
    selectedCategory?.value ? `/category/${encodeURIComponent(selectedCategory.value)}` : ''
  }?limit=${selectedLimit?.value}&sort=${selectedSort?.value}`
}

export const setLocalValue = (
  name: string,
  value: boolean | string,
  maxAge: number = 315360000
) => {
  if (navigator.cookieEnabled) {
    document.cookie = `${name}=${value};max-age=${maxAge};path=/`
  } else {
    localStorage.setItem(name, `${value}`)
  }
}

export const checkLocalValue = (name: string): boolean => {
  if (navigator.cookieEnabled) {
    const localValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1]

    return !!localValue
  } else {
    const localValue = localStorage.getItem(name)

    return !!localValue
  }
}
