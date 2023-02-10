import { useEffect, useState } from 'react'

import { getItems } from '../services/items.service'
import { Item } from '../types/Item'

const useSearchProduct = (searchQuery: string | null) => {
  const [products, setProducts] = useState<Item[]>([])
  const [error, setError] = useState()
  const [productCategories, setProductCategories] = useState<string[]>([])

  const getSearchProducts = async (query: string) => {
    try {
      setError(undefined)
      const { items, categories } = await getItems(query)
      setProducts(items)
      setProductCategories(categories)
    } catch (e) {
      setError(error)
    }
  }

  useEffect(() => {
    getSearchProducts(searchQuery || '')
  }, [searchQuery])

  return {
    products,
    productCategories,
  }
}

export default useSearchProduct
