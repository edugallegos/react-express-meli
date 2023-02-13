/* eslint-disable */
describe('Search', () => {
  it('search a product', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="search-input"]').type('123')
    cy.get('[data-testid="search-submit"]').click()
    cy.url().should('be.equal', 'http://localhost:3000/items?search=123')

    cy.get('[data-testid="product-item"]').first().click()

    cy.url().should('match', /http:\/\/localhost:3000\/items\/*/)
  })
})
