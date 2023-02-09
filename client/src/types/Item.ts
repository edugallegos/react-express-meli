import { CONDITIONS } from '../utils/constants'

export type Item = {
  id: string
  title: string
  price: {
    currency: string
    amount: number
    decimals: number
  }
  picture: string
  condition: keyof typeof CONDITIONS
  free_shipping: boolean
  description?: string
  state: string
  sold_quantity?: number
}
