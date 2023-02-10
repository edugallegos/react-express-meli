import {useNavigate, useSearchParams} from 'react-router-dom'

import Breadcrumb from '../components/Breadcrumb'
import ProductItem from '../components/ProductItem'
import useSearchProduct from '../hooks/useSearchProduct'

const ItemsPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const { products, productCategories } = useSearchProduct(searchQuery)

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
