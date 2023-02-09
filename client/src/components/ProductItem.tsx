import shippingIcon from '../assets/ic_shipping.png'
import shippingIcon2x from '../assets/ic_shipping@2x.png.png.png'
import React from 'react'
import type { Item } from '../types/Item'

interface ProductItemProps {
  product: Item
  onClick?(id: string): void
}
const ProductItem = ({ product, onClick }: ProductItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product.id)
    }
  }

  return (
    <div className='product__item' onClick={handleClick} data-testid='product-item'>
      <img src={product.picture} alt={product.title} />
      <div className='product__details'>
        <div className='left-column'>
          <div className='product__price'>
            <span>$ {product.price.amount.toLocaleString('es-AR')}</span>
            {product.free_shipping && (
              <img
                src={shippingIcon}
                alt='envío gratis'
                title='Envío Gratis'
                srcSet={`${shippingIcon2x} 2x`}
              />
            )}
          </div>
          <div className='product__description'>{product.title}</div>
        </div>
        <div className='right-column'>
          <div className='product__location'>{product.state}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
