/// <reference types="cypress" />
import * as loginPage from '../../pages/login.page.js'
describe('Login', () => {
    beforeEach('visit login page', () => {
        cy.fixture('login').as('login')
        cy.visit('/')
    }) 

    it('check url', () =>{
        cy.url().should('include', '/user/login')
    })

    it('require email', () => {
        loginPage.login({ email: null, password: "password"})
        loginPage.validateExplainMessage('Please enter your email address')
    })

    it('require password', () => {
        loginPage.login({ email: "talent@mvp.studio", password: null})
        loginPage.validateExplainMessage('Please enter your password')
    })

    it('login with invalid email address', () => {
        loginPage.login({ email: "talent", password: "GLobalTalent" })
        loginPage.validateErrorMessage('The Email field is not a valid e-mail address.')
    })

    it('login with valid credential', () => {
        cy.get('@login').then((credentials) => {
            const validUser = Cypress._.find(credentials, {"key": "valid"})
            loginPage.login(validUser)
            cy.url().should('include', '/dashboard')
         })
    })
    
    it('login with invalid credential', () => {
        cy.get('@login').then((credentials) => {
            const invalidUser = Cypress._.find(credentials, {"key": "invalid"})
            loginPage.login(invalidUser)
            loginPage.validateErrorMessage('You have entered an invalid username or password')
         })
    })

})