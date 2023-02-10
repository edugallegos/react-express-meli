import { Outlet } from 'react-router-dom'

import NavBar from './NavBar'

interface LayoutProps {
  onSearch(query: string): void
  initialSearch: string
}

const Layout = ({ onSearch, initialSearch }: LayoutProps) => {
  return (
    <>
      <NavBar onSearch={onSearch} initialSearch={initialSearch} />
      <main className="content">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
