describe('Menu', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('test123')

    // submit the form
    cy.get('.button').contains('Log in').click()

    // Go to Test Event
    cy.contains('Test').click();
  });

  it('set menu', () => {
    cy.contains('error');
  });

});
