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
    cy.get('button').contains('Log in').click()
    cy.url().should('include', '/home-page');

    //TODO
    // verifier le nom d'utilisateru
  });

  it('log in with wrong email and password', () => {

    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('wrongtest123')

    // submit the form
    cy.get('button').contains('Log in').click()
    cy.url().should('include', '/sign-in');
  })

  it('create account with email existing', () => {

    cy.get('.switch-button').contains('Register').click()

    // fill in the form
    cy.get('input[type="text"]').type('Test Name')
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').first().type('newPassword')
    cy.get('input[type="password"]').last().type('newPassword')

    // submit the form
    cy.get('button').contains('Create account').click()

    cy.on('window:alert',(t)=>{
      //assertions
      expect(t).to.contains('The email address is already in use by another account');
    })
  })

  it('create account new user', () => {

    cy.get('.switch-button').contains('Register').click()

    // fill in the form
    cy.get('input[type="text"]').type('Test Name')
    cy.get('input[type="email"]').type('newtest@test.com')
    cy.get('input[type="password"]').first().type('newPassword')
    cy.get('input[type="password"]').last().type('newPassword')

    // submit the form
    cy.get('button').contains('Create account').click()

    // Send verification
    cy.url().should('include', '/verify-email-address');

  })

});

