import React from 'react'
import './App.scss'
import { Routes, Route, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import Layout from './components/Layout'

const Home = React.lazy(() => import('./pages/Home'))
const ItemsPage = React.lazy(() => import('./pages/ItemsPage'))
const ItemPage = React.lazy(() => import('./pages/ItemPage'))

const Loading = () => <p>Loading ...</p>

function App() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const handleSearch = (query: string) => {
    navigate({
      pathname: '/items',
      search: createSearchParams({ search: query }).toString(),
    })
  }

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route
          element={
            <Layout onSearch={handleSearch} initialSearch={searchParams.get('search') || ''} />
          }
        >
          <Route path='/' element={<Home />} />
          <Route path='/items/:id' element={<ItemPage />} />
          <Route path='/items' element={<ItemsPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default App
