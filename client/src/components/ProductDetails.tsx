import { CONDITIONS } from '../utils/constants'
import { Item } from '../types/Item'

interface ProductDetailsProps {
  product: Item
}
const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className='product__container'>
      <div className='left-column'>
        <img src={product.picture} alt={product.title} />
        <div className='product__description'>
          <h2>Descripción del producto</h2>
          <div className='product__description-text'>
            {product.description &&
              product.description.split('\n').map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                )
              })}
          </div>
        </div>
      </div>
      <div className='right-column'>
        <div className='product__condition'>
          {CONDITIONS[product.condition]} - {product.sold_quantity} vendidos
        </div>
        <h1 className='product__title'>{product.title}</h1>
        <div className='product__price'>
          <span>$ {product.price.amount.toLocaleString('es-AR')}</span>
          <span className='decimal'>{String(product.price.decimals).padStart(2, '0')}</span>
        </div>
        <button type='button' className='product__buy-btn' title='Comprar'>
          Comprar
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
