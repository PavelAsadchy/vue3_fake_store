export interface ItemRating {
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

export interface FilterOption {
  label: string
  value: number | string | null
  default?: boolean
}

export interface UserName {
  firstname: string
  lastname: string
}

export interface UserAddress {
  city: string
  street: string
  number: number
  zipcode: string
  geolocation: {
    lat: string
    long: string
  }
}

export interface User {
  id: string
  email: string
  username: string
  password: string
  name: UserName
  address: UserAddress
  phone: string
}

export interface Products {
  productId: string
  quantity: number
}

export interface Cart {
  id: string
  userId: string
  date: Date
  products: Products[]
}
