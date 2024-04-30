before(()=>{
    cy.visit('http://localhost:3000/')
  })

describe('US2-2', () => {

    const waitTime = 2000

    it('Menus', () => {
        cy.visit('http://localhost:3000/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type('Metch@gmail.com')
        cy.get('#input-password-for-credentials-provider').type('123456')
        cy.get('button').click()

        cy.wait(waitTime)
        cy.get('.bg-black').click()
        cy.get('[href="/car/65e44c37cb8aa54383faa2d2"]').click()
    
        cy.wait(waitTime/2)
        cy.get('.object-cover').eq(0).click()
        cy.get('.MuiButtonBase-root').click()

        cy.wait(waitTime)
        cy.contains('body','Bibimbap').should('be.visible');

    })
})