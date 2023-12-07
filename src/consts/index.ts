import type { FilterOption } from '@/models'

export const BASE_URL = 'https://fakestoreapi.com/products'

export const RESULTS_LIMIT_ITEMS: FilterOption[] = [
  {
    label: '2',
    value: 2,
    default: false
  },
  {
    label: '5',
    value: 5,
    default: true
  },
  {
    label: '10',
    value: 10,
    default: false
  }
]

export const SORT_ITEMS: FilterOption[] = [
  {
    label: 'ASC',
    value: 'asc',
    default: true
  },
  {
    label: 'DESC',
    value: 'desc',
    default: false
  }
]

export const CATEGORIES: FilterOption[] = [
  {
    label: 'All',
    value: null
  },
  {
    label: 'Electronics',
    value: 'electronics'
  },
  {
    label: 'Jewelery',
    value: 'jewelery'
  },
  {
    label: `Men's clothing`,
    value: `men's clothing`
  },
  {
    label: `Women's clothing`,
    value: `women's clothing`
  }
]
