describe('preview page routing', () => {

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4', 'video3.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video1.mp4", {fixture: 'thumbnails/video1.mp4-thumbnail.png'}).as('getThumbnailOne')
    cy.intercept("http://localhost:3000/thumbnail/video2.mp4", {fixture: 'thumbnails/video2.mp4-thumbnail.png'}).as('getThumbnailTwo')
    cy.visit("http://localhost:3001/preview/...")
    cy.wait(100)

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

  it('Changing select input renders thumbnail', () => {
    cy.get('[data-cy="select-video-input"]').click();
    cy.get('[role="option"]:contains("video1.mp4")').click()
    cy.get('img[alt="thumbnail of video before processing"]').as('firstVideo');

    cy.get('[data-cy="select-video-input"]').click();
    cy.get('[role="option"]:contains("video2.mp4")').click()
    cy.wait('@getThumbnailTwo')
    cy.wait(500)
    cy.get('img[alt="thumbnail of video before processing"]').should('not.eq', '@firstVideo')
  })
})

describe('preview page form', () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4', 'video3.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video1.mp4", {fixture: 'thumbnails/video1.mp4-thumbnail.png'}).as('getThumbnailOne')
    cy.intercept("http://localhost:3000/thumbnail/video2.mp4", {fixture: 'thumbnails/video2.mp4-thumbnail.png'}).as('getThumbnailTwo')
    cy.visit("http://localhost:3001/preview/video2.mp4")
    cy.wait(100)
  })

  it('User can use color input to change thumbnail', ()=> {
    cy.get('img[alt="thumbnail of video after processing"]').as('firstProcessedThumbnail');
    cy.get('[data-cy="color-input"]').invoke('val', '#793736').trigger('change');
    cy.wait(500)
    cy.get('img[alt="thumbnail of video after processing"]').should('not.eq', '@firstProcessedThumbnail')
    
  })
})