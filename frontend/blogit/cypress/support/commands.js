Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })
  
  Cypress.Commands.add('createBlog', ({ content, important }) => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: { title, author, url },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedappUser')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })