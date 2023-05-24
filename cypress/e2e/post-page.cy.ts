describe('Post', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard;id=1');
    cy.get('mat-icon').contains('photo_camera').click()
  });

  it('Display Picture', () => {
    cy.contains('error');
  });

  it('add picture', () => {
    cy.contains('error');
  });

  it('remove picture', () => {
    cy.contains('error');
  });

  it('switch grid view', () => {
    cy.contains('error');
  });

  it('like post', () => {
    cy.contains('error');
  });

  it('dislike post', () => {
    cy.contains('error');
  });

});
