import React from 'react'
import './App.scss'
import { Routes, Route, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import Layout from './components/Layout'

const Home = React.lazy(() => import('./pages/Home'))
const Items = React.lazy(() => import('./pages/Items'))
const Item = React.lazy(() => import('./pages/Item'))

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
          <Route path='/items/:id' element={<Item />} />
          <Route path='/items' element={<Items />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default App
