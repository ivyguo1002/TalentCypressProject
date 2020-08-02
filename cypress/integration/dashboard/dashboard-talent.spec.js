
/// <reference types="cypress" />
import * as dashboardPage from '../../pages/dashboard.page'
describe('Talent Dashboard', () => {
    beforeEach('login as talent', () => {
       cy.signinAs('talent')
       cy.visit('/dashboard')
    })
 
    describe('top navigation menu', () => {
        it('navigate to profile page', () => {
            dashboardPage.clickMenuItem('Profile')
            cy.url().should('include', '/profile')
        })

        it('navigate to reference check page', () => {
            dashboardPage.hoverMenuItem('Tools')
            dashboardPage.clickMenuItem('Reference Check')
            cy.url().should('include', '/reference')
        })

        it('navigate to explore job page', () => {
            dashboardPage.hoverMenuItem('Jobs')
            dashboardPage.clickMenuItem('Explore Jobs')
            cy.url().should('include', '/jobs/explore')
        })

        it('navigate to job watch list page', () => {
            dashboardPage.hoverMenuItem('Jobs')
            dashboardPage.clickMenuItem('Watch List')
            cy.url().should('include', '/jobs/watchList')
        })

        it('navigate to dashboard page', () => {
            dashboardPage.clickMenuItem('Dashboard')
            cy.url().should('include', '/dashboard')
        })
    })
    
    describe('action menu', () => {
        it('log out', () => {
            dashboardPage.logout()
            cy.url().should('include', '/user/login')
        })
    
        it.only('navigate to account setting page', () => {
            dashboardPage.accountSetting()
            cy.url().should('include', '/settings/security')
        })
    })
   
})