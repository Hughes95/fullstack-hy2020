describe('Blog app', () => {
    beforeEach(function() {
        //cy.request('POST', 'http://localhost:3001/api/testing/reset')
       // const user = {
         // name: 'Matti Luukkainen',
         // username: 'mluukkai',
         // password: 'salainen'
        //}
        //cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', () => {
      cy.visit('http://localhost:3000')
      cy.contains('Log in to application')
    })

    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('log in').click()
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        
            cy.contains('Matti Luukkainen logged in')
        })
        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('xxxxxxx')
            cy.get('#login-button').click()
        
            cy.get('.error')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        
            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        })
    })

    describe('When log in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })
    
        it('Create new blog', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('mooc')
            cy.get('#author').type('mooc@cs.helsinki.fi')
            cy.get('#url').type('https://www.mooc.fi/')
            cy.get('#create-button').click()
        })
        it('Created blog exist', function () {
            cy.contains('mooc mooc@cs.helsinki.fi').parent().get('#view').click()
            cy.contains('mooc mooc@cs.helsinki.fi').parent().find('#hide')
              .should('contain', 'hide')
        })
        it('blog can like.', function () {
            cy.contains('mooc mooc@cs.helsinki.fi').parent().find('#view').click()
            cy.contains('mooc mooc@cs.helsinki.fi').parent().find('#likes').click()
        })
        //it('blog can remove.', function () {
           // cy.contains('mooc mooc@cs.helsinki.fi').parent().find('#view').click()
           // cy.contains('mooc mooc@cs.helsinki.fi').parent().find('#poista').click()
        //})
    })
})