
/// <reference types="cypress" />
describe('Jobs Page', () => {
    beforeEach('login as employer', () => {
        cy.signinAs('employer')
        cy.visit('/jobs')
        //cy.jobsRoute()
     })

     it.only('change job status', () => {
        cy.get('.antd-pro-app-src-pages-job-common-job-list-jobCard').first().within(() => {
            //clear and seed a job with active status
            //need add step
            cy.get('.anticon-stop').click()
            cy.get('.ant-card-actions li:nth-child(2)').should('have.text', 'Reopen')
            //cy.wait("@changeJobStatus").its('status').should('eq', 200)
            cy.get('.ant-list-item-meta-title span:nth-child(2)')
              .should('have.text', 'Closed')
              .and('have.css', 'background-color', 'rgb(128, 128, 128)')
            
        })
     })
})