describe('Tabs', () => {
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

  it('test tabs', () => {
    cy.get('mat-icon').contains('restaurant_menu').click()
    cy.get('app-menu-page').should('be.visible')

    cy.get('mat-icon').contains('photo_camera').click()
    cy.get('app-post-page').should('be.visible')

    cy.get('mat-icon').contains('person_search').click()
    cy.get('app-plan-table-page').should('be.visible')

    cy.get('mat-icon').contains('account_circle').click()
    cy.get('app-user-page').should('be.visible')

    cy.get('mat-icon').contains('home').click()
    cy.get('app-presentation-page').should('be.visible')
  });

});
