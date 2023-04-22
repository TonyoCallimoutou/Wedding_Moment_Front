describe('User', () => {
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

  it('set user picture', () => {
    cy.contains('error');
  });

  it('set user name', () => {
    cy.contains('error');
  });

  it('set languague', () => {
    cy.contains('error');
  });

  it('confidentiality', () => {
    cy.contains('error');
  });

  it('notification', () => {
    cy.contains('error');
  });

  it('log out', () => {
    cy.contains('error');
  });

  it('remove account', () => {
    cy.contains('error');
  });
});
