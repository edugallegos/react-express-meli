import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const Items = () => {
  const [searchParams] = useSearchParams()

  return (
    <div>
      <Breadcrumb />
      Items {searchParams.get('search')}
    </div>
  )
}

export default Items
