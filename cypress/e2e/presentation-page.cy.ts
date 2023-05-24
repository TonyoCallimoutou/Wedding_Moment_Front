describe('Presentation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard;id=1');
    cy.get('mat-icon').contains('home').click()
  });

  it('Display Picture', () => {
    cy.contains('error');
  });

  it('Display Text Presentation', () => {
    cy.contains('error');
  });

  it('set presentation text', () => {
    cy.contains('error');
  });

  it('set picture', () => {
    cy.contains('error');
  });


});
