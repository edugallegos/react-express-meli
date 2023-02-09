import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Breadcrumb from '../components/Breadcrumb'
import ProductItem from '../components/ProductItem'
import { getItems } from '../services/items.service'

import type { Item } from '../types/Item'

const ItemsPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Item[]>([])
  const [productCategories, setProductCategories] = useState<string[]>([])
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const getSearchProducts = async (query: string) => {
    const {items, categories} = await getItems(query)
    setProducts(items)
    setProductCategories(categories)
  }

  useEffect(() => {
    getSearchProducts(searchQuery || '')
  }, [searchQuery])

  const handleProductClick = (productId: string) => {
    navigate(`/items/${productId}`)
  }

  return (
    <div>
      <Breadcrumb items={productCategories} />
      <div className='products__list'>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>
    </div>
  )
}

export default ItemsPage
