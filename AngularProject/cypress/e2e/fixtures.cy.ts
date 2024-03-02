
//Register/signUp user and after succes visit loginpage to login
describe('working with fixture data to signup', ()=>{

  it('signup through login1 data and tries to signup', ()=>{
    cy.visit('/signup')
    cy.fixture('signup1.json').then((data)=>{

          cy.get('.userName').type(data.userName)
          cy.get('.email').type(data.email)
          cy.get('.password').type(data.password)

          //after signup to login page and login
          cy.get('.sign-btn').click().then(el=>{
          cy.visit('/login')

          })

    })
})
})



//registering with fixed data correct details and wrong details
describe('working with fixture data to login', ()=>{

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
              }
              else if(data.email == 'compgodwin@gmail.com' && data.password! == '123456'){
                cy.get('.loginbtn').click()
                cy.contains('Incorrect password')
            }
          })
      })
  })

})



 //intercepting
describe('Request without hitting backend', ()=>{
  beforeEach(()=>{
      cy.visit( '/login') })

  it('should handle login port request', ()=>{
      cy.intercept('POST', 'http://localhost:3100/auth/login', {
          body:{
              message: "Logged in successfully"
          }
      }).as('loginRequest')

      cy.get('.login-btn').click()

      cy.wait('@loginRequest').then(interception =>{
          expect( interception.request.body).to.exist;
1
          cy.get('.sucessMsg').should('contain', 'Logged In Successfully')
      })
   })

})


