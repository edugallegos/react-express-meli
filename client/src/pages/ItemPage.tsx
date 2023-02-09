import Breadcrumb from '../components/Breadcrumb'
import { getItem } from '../services/items.service'
import { useEffect, useState } from 'react'
import type { Item } from '../types/Item'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'

const ItemPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Item>()
  const [productCategories, setProductCategories] = useState<string[]>([])

  const getProduct = async (id: string) => {
    const { item, categories } = await getItem(id)
    setProduct(item)
    setProductCategories(categories.map((cat) => cat.name))
  }

  useEffect(() => {
    if (id) {
      getProduct(id)
    }
  }, [id])

  return (
    <div>
      <Breadcrumb items={productCategories} />
      {product && <ProductDetails product={product} />}
    </div>
  )
}

export default ItemPage
