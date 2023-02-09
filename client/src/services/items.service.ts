import axios from 'axios'
import type { Item } from '../types/Item'
import { BASE_URL } from '../utils/constants'

type GetItemsResponse = {
  author: {
    name: string
    lastname: string
  }
  categories: string[]
  items: Item[]
}

type GetItemResponse = {
  author: {
    name: string
    lastname: string
  }
  categories: { id: string; name: string }[]
  item: Item
}

export const getItems = async (search: string): Promise<GetItemsResponse> => {
  try {
    const { data } = await axios.get<GetItemsResponse>(`${BASE_URL}items`, {
      params: {
        q: search,
        limit: 4,
      },
    })

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export const getItem = async (productId: string): Promise<GetItemResponse> => {
  try {
    const { data } = await axios.get<GetItemResponse>(`${BASE_URL}items/${productId}`)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
