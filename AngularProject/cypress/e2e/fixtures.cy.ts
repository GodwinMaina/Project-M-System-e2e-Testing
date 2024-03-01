describe('working with fixtures',()=>{

  let data:{email: string, password:string}

  before(()=>{
      cy.fixture('login').then((info)=>{
          data = info
      })
  })

  it ('logs in user using the fixture data'), (()=>{
      cy.visit('/login')

      cy.fixture('login1.json').then((data)=>{
          cy.get('.email').type(data.email)
          cy.get('password').type(data.password)
          cy.get('.login-btn').click().then(el=>{
              cy.location('pathname').should('not.eq', '/login')
              cy.location('pathname').should('equal', '/users')
              cy.get('[data-cy="login"]')

          })

      })
  })

})

describe('working with fixtues with multiple data', ()=>{

  let data: {email: string, password: string}

  before(()=>{
      cy.fixture('login').then((info)=>{
          data = info
      })
  })

  it('iterates through login2 data and tries to login', ()=>{
      cy.visit('/login')

      cy.fixture('login2.json').then((dataarray)=>{
          dataarray.forEach((data:{email: string, password: string})=>{
              cy.get('.email').type(data.email)
              cy.get('.password').type(data.password)

              if(data.email == 'compgodwin@gmail.com' && data.password == '123456'){
                  cy.get('.login-btn').click().then(el=>{
                      cy.location('pathname').should('equal', '/admin')
                      cy.get('[data-cy="logout-link"]').click()
                      cy.visit('/login')
                  })
              }else if (data.email == "compgodwin@.com" && data.password !=='123456'){
                  cy.get('.login-btn').click()
                  cy.contains('Incorrect password')
              }
          })
      })
  })
})

describe('Request without hitting backend', ()=>{
  beforeEach(()=>{
      cy.visit('/login')
  })

  it('should handle login port request', ()=>{
      cy.intercept('POST', 'http://localhost:3100:auth/login', {
          body:{
              message: "Logged in successfully"
          }
      }).as('loginRequest')

      cy.get('.login-btn').click()

      cy.wait('@loginRequest').then(interception =>{
          expect( interception.request.body).to.exist;

          cy.get('.sucessMsg').should('contain', 'Logged In Successfully')
      })
  })
})
