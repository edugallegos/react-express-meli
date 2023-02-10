import { Link } from 'react-router-dom'
import logo from '../assets/Logo_ML.png'
import logo2x from '../assets/Logo_ML@2x.png.png.png'
import searchIcon from '../assets/ic_Search.png'
import searchIcon2x from '../assets/ic_Search@2x.png.png.png'
import React, { useEffect, useState } from 'react'

interface NavBarProps {
  onSearch(query: string): void
  initialSearch: string
}
const NavBar = ({ onSearch, initialSearch }: NavBarProps) => {
  const [searchValue, setSearchValue] = useState(initialSearch)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    setSearchValue(initialSearch)
  }, [initialSearch])

  return (
    <header role='banner'>
      <nav className='navbar'>
        <Link className='navbar__brand' to='/'>
          <img src={logo} alt='Logotipo Meli' title='Mercado Libre' srcSet={`${logo2x} 2x`} />
        </Link>
        <form onSubmit={handleSubmit} className='navbar__search'>
          <input
            type='text'
            data-testid="search-input"
            onChange={handleChange}
            placeholder='Nunca dejes de buscar'
            value={searchValue}
          />
          <button type='submit' data-testid="search-submit">
            <img src={searchIcon} alt='icono buscar' title='Buscar' srcSet={`${searchIcon2x} 2x`} />
          </button>
        </form>
      </nav>
    </header>
  )
}

export default NavBar
