describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Pass whitout login', () => {
    cy.get('.pass').contains('Pass without login').click();
    cy.url().should('include', '/home-page');
  });

  it('log in with email and password', () => {

    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('test123')

    // submit the form
    cy.get('.button').contains('Log in').click()
    cy.url().should('include', '/home-page');

    //TODO
    // verifier le nom d'utilisateru
  });

  it('log in with wrong email and password', () => {

    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('wrongtest123')

    // submit the form
    cy.get('.button').contains('Log in').click()
    cy.url().should('include', '/sign-in');
  })

  it('create account with email', () => {

    // fill in the form
    cy.get('input[type="email"]').type('newtest@test.com')

    // submit the form
    cy.get('.button').contains('Create account').click()
    cy.url().should('include', '/sign-up');
    cy.get('input[type="email"]').should('contain', 'test@test.com');
  })

  it('create account with password', () => {

    // fill in the form
    cy.get('input[type="password"]').type('test123')

    // submit the form
    cy.get('.button').contains('Create account').click()
    cy.url().should('include', '/sign-up');
    cy.get('input[type="password"]').should('contain', 'test123');
  })

  it('create account with email && password existing', () => {

    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('test123')

    // submit the form
    cy.get('.button').contains('Create account').click()
    cy.url().should('include', '/home-page');
  });

  it('create account with email existing', () => {

    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')

    // submit the form
    cy.get('.button').contains('Create account').click()

    // TODO
    // Champ en erreur + message
    cy.get('input[type="password"]').should('contain', 'test@test.com');
  })

});

