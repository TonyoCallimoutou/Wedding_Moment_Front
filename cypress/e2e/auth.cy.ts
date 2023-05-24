describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard;id=1');
    cy.get('mat-icon').contains('account_circle').click();
  });

  it('log in with email and password', () => {

    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('test123')

    // submit the form
    cy.get('button').contains('Log in').click()
    // TODO USER INFORMATION
  });

  it('log in with wrong email and password', () => {

    // fill in the form
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('wrongtest123')

    // submit the form
    cy.get('button').contains('Log in').click();
    // TODO ERROR MESSAGE
  });

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
  });

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
    // TODO VERIFICATION EMAIL
  });

});

