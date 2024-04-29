function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function generateRandomNumber(length: number) {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

before(()=>{
  cy.visit('http://localhost:3000/')
})
describe('US2-2', () => {
  
  const waitTime = 2000
  const add = generateRandomString(10)
  const dis = generateRandomString(5)
  const pro = generateRandomString(5)
  const pos = generateRandomNumber(5)
  const reg = generateRandomString(10)
 
  it('Add address', () => {
    cy.visit('http://localhost:3000/api/auth/signin')
    cy.get('#input-email-for-credentials-provider').type('Metch@gmail.com')
    cy.get('#input-password-for-credentials-provider').type('123456')
    cy.get('button').click()

    cy.visit('http://localhost:3000/address')
    cy.wait(waitTime)
    cy.get('.mt-4 > .MuiButtonBase-root').click()
    cy.wait(waitTime)

    cy.get('[data-testid="add"]').type(add)
    cy.get('[data-testid="dis"]').type(dis)
    cy.get('[data-testid="pro"]').type(pro)
    cy.get('[data-testid="pos"]').type(pos)
    cy.get('[data-testid="reg"]').type(reg)
    cy.get('.MuiButtonBase-root').click()

    cy.visit('http://localhost:3000/address')
    cy.wait(waitTime)

    cy.contains('body', add+', '+ dis+', '+ pro+', '+ pos).should('be.visible');
    
  })
})
