describe('Menu', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard;id=1');
    cy.get('mat-icon').contains('restaurant_menu').click();
  });

  it('Display Menu', () => {
    // TODO DISPLAY MENU
  });

  it('set menu', () => {
    // TODO SET MENU
  });

});
