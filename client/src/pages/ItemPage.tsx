import Breadcrumb from '../components/Breadcrumb'
import { getItem } from '../services/items.service'
import { useEffect, useState } from 'react'
import type { Item } from '../types/Item'
import { useParams } from 'react-router-dom'
import { CONDITIONS } from '../utils/constants'

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
      {product && (
        <div className='product__container'>
          <div className='left-column'>
            <img src={product.picture} alt={product.title} />
            <div className='product__description'>
              <h2>Descripción del producto</h2>
              <div className='product__description-text'>{product.description}</div>
            </div>
          </div>
          <div className='right-column'>
            <div className='product__condition'>
              {CONDITIONS[product.condition]} - {product.sold_quantity} vendidos
            </div>
            <h1 className='product__title'>{product.title}</h1>
            <div className='product__price'>
              <span>$ {product.price.amount}</span>
              <span className='decimal'>{String(product.price.decimals).padStart(2, '0')}</span>
            </div>
            <button type='button' className='product__buy-btn'>
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemPage
