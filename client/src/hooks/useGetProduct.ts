import { useEffect, useState } from 'react'
import { Item } from '../types/Item'
import { getItem } from '../services/items.service'
import { COMMON_ERROR_MESSAGE } from '../utils/constants'

const useGetProduct = (id?: string) => {
  const [product, setProduct] = useState<Item>()
  const [error, setError] = useState('')
  const [productCategories, setProductCategories] = useState<string[]>([])

  const getProduct = async (id: string) => {
    try {
      const { item, categories } = await getItem(id)
      setProduct(item)
      setProductCategories(categories.map((cat) => cat.name))
    } catch (e) {
      setError(COMMON_ERROR_MESSAGE)
    }
  }

  useEffect(() => {
    if (id) {
      getProduct(id)
    }
  }, [id])

  return {
    product,
    error,
    productCategories,
  }
}

export default useGetProduct
