
describe('home page', () => {

  beforeEach(() => {
    cy.visit('localhost:3001')
    
  })

  it('User can use navigation bar to change page', () => {
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video1.mp4", {fixture: 'thumbnails/video1.mp4-thumbnail.png'}).as('getThumbnailOne')
    cy.intercept("http://localhost:3000/thumbnail/video2.mp4", {fixture: 'thumbnails/video2.mp4-thumbnail.png'}).as('getThumbnailTwo')

    cy.get('[data-cy="nav-video-link"]').click()
    cy.url().should('include', 'videos');
    cy.get('[data-cy="nav-preview-link"]').click()
    cy.url().should('include', 'preview/...');
    cy.get('[data-cy="nav-home-link"]').click()
    cy.url().should('include', 'http://localhost:3001');
  })
})