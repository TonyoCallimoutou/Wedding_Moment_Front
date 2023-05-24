describe('User', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard;id=1');
    cy.get('mat-icon').contains('account_circle').click()
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
