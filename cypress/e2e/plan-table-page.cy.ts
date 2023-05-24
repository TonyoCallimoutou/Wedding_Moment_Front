describe('Plan table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard;id=1');
    cy.get('mat-icon').contains('person_search').click()
  });

  it('Display Plan Table', () => {
    // TODO PLAN TABLE
    cy.contains('error');
  });

  it('set plan table', () => {
    // TODO PLAN TABLE
    cy.contains('error');
  });


});
