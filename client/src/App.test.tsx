import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockedNavigator = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}))

const setup = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}

describe('App', () => {
  it('renders the search box', async () => {
    setup()

    const searchBox = await screen.findByPlaceholderText(/Nunca dejes de buscar/i)

    expect(searchBox).toBeInTheDocument()
  })

  it('redirects to /items?search link page after searching action', async () => {
    setup()

    const searchBox = await screen.findByPlaceholderText(/Nunca dejes de buscar/i)
    const submitButton = screen.getByTitle(/buscar/i)
    userEvent.type(searchBox, '123')
    userEvent.click(submitButton)

    expect(mockedNavigator).toHaveBeenCalledWith({ pathname: '/items', search: 'search=123' })
  })
})
