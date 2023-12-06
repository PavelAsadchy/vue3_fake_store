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
