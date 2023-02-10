import {useParams} from 'react-router-dom'

import Breadcrumb from '../components/Breadcrumb'
import ErrorMessage from '../components/ErrorMessage'
import ProductDetails from '../components/ProductDetails'
import useGetProduct from '../hooks/useGetProduct'

const ItemPage = () => {
  const { id } = useParams()
  const { product, productCategories, error } = useGetProduct(id)

  return (
    <div>
      <Breadcrumb items={productCategories} />
      {error && <ErrorMessage message={error} />}
      {product && <ProductDetails product={product} />}
    </div>
  )
}

export default ItemPage
