describe('video page', () => {

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video1.mp4", {fixture: 'thumbnails/video1.mp4-thumbnail.png'}).as('getThumbnailOne')
    cy.intercept("http://localhost:3000/thumbnail/video2.mp4", {fixture: 'thumbnails/video2.mp4-thumbnail.png'}).as('getThumbnailTwo')
    cy.visit('localhost:3001/videos')
  })

  it('all videos are listed with thumbnails and link to processing page', () => {
    cy.contains('p', 'Video Filename: video1.mp4')
    cy.contains('p', 'Video Filename: video2.mp4')
    cy.get('img[alt="video1.mp4"]').should('be.visible')
    cy.get('img[alt="video2.mp4"]').should('be.visible')
    cy.get('[data-cy="video-container"]').find('a').eq(0).invoke('attr', 'href').should('eq', '/preview/video1.mp4')
    cy.get('[data-cy="video-container"]').find('a').eq(1).invoke('attr', 'href').should('eq', '/preview/video2.mp4')
  })

})