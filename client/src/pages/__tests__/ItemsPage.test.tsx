import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { getItems } from '../../services/items.service'
import ItemsPage from '../ItemsPage'
import { Item } from '../../types/Item'
import userEvent from '@testing-library/user-event'

jest.mock('../../services/items.service')

const mockedNavigator = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
  useSearchParams: () => [new URLSearchParams({ search: '1234' })],
}))

const mockedGetItems = getItems as unknown as jest.MockedFunction<typeof getItems>

const mockItems = [
  {
    id: 'MLA795995998',
    title:
      'Pila Cr123 Motoma 3v Blister X 4 Unids. - Zona San Martín Caseros - Larga Duracion Excelente Calidad Al Mejor Precio',
    price: {
      currency: 'ARS',
      amount: 2890,
      decimals: 0,
    },
    picture: 'http://http2.mlstatic.com/D_638335-MLA44343635614_122020-I.jpg',
    condition: 'new',
    free_shipping: false,
    state: 'Buenos Aires',
  },
  {
    id: 'MLA867657559',
    title: '6 X Pilas Litio Cr123a Energizer Lithium 3v Cr123 San Martin',
    price: {
      currency: 'ARS',
      amount: 8760,
      decimals: 0,
    },
    picture: 'http://http2.mlstatic.com/D_772215-MLA42625196744_072020-I.jpg',
    condition: 'new',
    free_shipping: true,
    state: 'Buenos Aires',
  },
] as Item[]

const setup = () => {
  render(
    <BrowserRouter>
      <ItemsPage />
    </BrowserRouter>,
  )
}

describe('Items Page', () => {
  it('calls the API search method at render', async () => {
    mockedGetItems.mockResolvedValue({
      author: { name: 'test', lastname: 'testLastName' },
      categories: [],
      items: [],
    })
    setup()

    await waitFor(() => {
      expect(getItems).toHaveBeenCalledWith('1234')
    })
  })

  it('displays the breadcrumb with the categories', async () => {
    mockedGetItems.mockResolvedValue({
      author: { name: 'test', lastname: 'testLastName' },
      categories: ['abc', 'def'],
      items: [],
    })
    setup()

    await waitFor(() => {
      expect(screen.getByText('abc')).toBeInTheDocument()
    })

    expect(screen.getByText('def')).toBeInTheDocument()
  })

  it('displays all the products received from the call', async () => {
    mockedGetItems.mockResolvedValue({
      author: { name: 'test', lastname: 'testLastName' },
      categories: [],
      items: mockItems,
    })

    setup()

    await waitFor(() => {
      expect(screen.getByText(/Pila Cr123/i)).toBeInTheDocument()
    })

    expect(screen.getAllByTestId('product-item').length).toEqual(2)
  })

  it('redirects to the product page after click on the product', async () => {
    mockedGetItems.mockResolvedValue({
      author: { name: 'test', lastname: 'testLastName' },
      categories: [],
      items: mockItems,
    })

    setup()

    const title = await screen.findByText(/Pila Cr123 Motoma/i)
    userEvent.click(title)

    expect(mockedNavigator).toHaveBeenCalledWith('/items/MLA795995998')
  })
})
