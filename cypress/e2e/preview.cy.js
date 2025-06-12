describe('preview page routing', () => {

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4', 'video3.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video1.mp4", {fixture: 'thumbnails/video1.mp4-thumbnail.png'}).as('getThumbnail')
    cy.visit("http://localhost:3001/preview/...")

  })

  it('Videos in select input', () => {
    cy.get('[data-cy="select-video-input"]').click();

    cy.contains('li', 'video1.mp4');
  })

  it('Changing select input video reroutes user', () => {
    cy.get('[data-cy="select-video-input"]').click();
    cy.get('[role="option"]:contains("video1.mp4")').click()
    cy.url().should('include', 'video1.mp4')

  })
})

describe('preview page form', () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4', 'video3.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video1.mp4", {fixture: 'thumbnails/video1.mp4-thumbnail.png'}).as('getThumbnail')
    cy.visit("http://localhost:3001/preview/video1.mp4")

  })
})