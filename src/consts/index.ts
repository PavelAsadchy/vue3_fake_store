import type { FilterOption } from '@/models'

export const BASE_URL = 'https://fakestoreapi.com'

export const RESULTS_LIMIT_ITEMS: FilterOption[] = [
  {
    label: '3',
    value: 3,
    default: false
  },
  {
    label: '6',
    value: 6,
    default: true
  },
  {
    label: '12',
    value: 12,
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

export const NAVIGATION_ROUTES = ['Home', 'Cart']

export const MOCKED_USER_DATA = {
  id: '1',
  username: 'johnd',
  password: 'm38rmF$',
  img: 'https://cdn.vuetifyjs.com/images/john.jpg'
}

export enum LOCAL_VALUE_KEY {
  AUTH = 'fake_store_auth_token'
}
