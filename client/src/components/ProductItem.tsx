import React from 'react'

import shippingIcon from '../assets/ic_shipping.png'
import shippingIcon2x from '../assets/ic_shipping@2x.png.png.png'
import type { Item } from '../types/Item'
import styles from './ProductItem.module.scss'

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
    <div className={styles.product__item} onClick={handleClick} data-testid='product-item'>
      <img src={product.picture} alt={product.title} />
      <div className={styles.product__details}>
        <div className={styles['left-column']}>
          <div className={styles.product__price}>
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
          <div className={styles.product__description}>{product.title}</div>
        </div>
        <div className={styles['right-column']}>
          <div className={styles.product__location}>{product.state}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
