describe('preview page routing', () => {

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4', 'video3.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video1.mp4", {fixture: 'thumbnails/video1.mp4-thumbnail.png'}).as('getThumbnailOne')
    cy.intercept("http://localhost:3000/thumbnail/video2.mp4", {fixture: 'thumbnails/video2.mp4-thumbnail.png'}).as('getThumbnailTwo')
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

  it('Changing select input renders thumbnail', () => {
    cy.get('[data-cy="select-video-input"]').click();
    cy.get('[role="option"]:contains("video1.mp4")').click()
    cy.get('img[alt="thumbnail of video before processing"]').as('firstVideo');

    cy.get('[data-cy="select-video-input"]').click();
    cy.get('[role="option"]:contains("video2.mp4")').click()
    cy.wait('@getThumbnailTwo')
    cy.get('img[alt="thumbnail of video before processing"]').should('not.eq', '@firstVideo')
  })
})

describe('preview page form', () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/jobs", [ ['fake-job-id-1234', {csvFile: 'video2.csv'}]])
    cy.intercept("http://localhost:3000/api/videos", ['video1.mp4', 'video2.mp4', 'video3.mp4']).as('getVideos')
    cy.intercept("http://localhost:3000/thumbnail/video2.mp4", {fixture: 'thumbnails/video2.mp4-thumbnail.png'}).as('getThumbnailTwo')
    cy.visit("http://localhost:3001/preview/video2.mp4")
  })

  // '[data-cy="color-input"]' '#793736'
  it('User can use color input to change thumbnail', ()=> {
    cy.get('img[alt="thumbnail of video after processing"]').invoke('attr', 'src').as('firstProcessedThumbnail');
    cy.changeInputValue('[data-cy="color-input"]', '#793736');
    cy.get('img[alt="thumbnail of video after processing"]').invoke('attr', 'src').should('not.eq', '@firstProcessedThumbnail')
  })

  it('User can submit processing job', () => {
    cy.get('img[alt="thumbnail of video after processing"]').invoke('attr', 'src').as('firstProcessedThumbnail');
    cy.changeInputValue('[data-cy="color-input"]', '#793736', 'input');
    cy.get('img[alt="thumbnail of video after processing"]').invoke('attr', 'src').should('not.eq', '@firstProcessedThumbnail')
    cy.intercept('POST', "http://localhost:3000/process/video2.mp4?targetColor=793736&threshold=30", {
      statusCode: 202,
      body: {
        jobId: 'fake-job-id-1234'
      }
    }).as('postJob');
    cy.intercept('GET', 'http://localhost:3000/process/fake-job-id-1234/status', { status: "processing"}).as('getJob');
    cy.get('[data-cy="submit-job-button"]').click()
    cy.url().should('include', 'fake-job-id-1234');
    cy.get('[data-cy="status-refresh-button"]').click()
    cy.contains('p', "processing");
    cy.intercept('GET', 'http://localhost:3000/process/fake-job-id-1234/status', {
      statusCode: 200,
      body: { status: "done", result: '/video2.csv'}
    }).as('getJob');
    cy.intercept('GET', 'http://localhost:3000/video2.csv', {fixture: 'video2'}).as('getCsvFile');
    cy.get('[data-cy="status-refresh-button"]').click()
    cy.contains('p', 'done');
    cy.contains('button', 'video2.csv');
    cy.contains('a', 'fake-job-id-1234').invoke('attr', 'href').should('eq', '/status/fake-job-id-1234');

  })
})