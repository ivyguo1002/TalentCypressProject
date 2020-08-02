// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const identity_api = Cypress.env("TALENT_APP_IDENTITY_API")
const talent_api = Cypress.env("TALENT_APP_API")

Cypress.Commands.add('getLoginToken', user => {
     return cy.request('POST', `${identity_api}/api/auth/signin`, {
                "email": user.email,
                "password": user.password
           })    
           .its('body.token')
           .should('exist')
 })

Cypress.Commands.add('signinAs', userRole => {
     cy.fixture('credentials').as('credentials')
     cy.get('@credentials').then((credentials) => {
          const user = Cypress._.find(credentials, {"userRole": userRole})
          cy.getLoginToken(user).then(token => {
               localStorage.setItem('access_token', token.token)
               localStorage.setItem('username', token.username)
               localStorage.setItem('expiry_on', token.expires)
               localStorage.setItem('talent-permission-scope', '["' + token.userRole + '"]')
          })
     })
})

Cypress.Commands.add('getTalentProfile', () => {
     const token = localStorage.getItem('access_token')
     return cy.request({
               method: 'GET',
               url: `${talent_api}/api/profile`,
               auth: {
                    'bearer': token
               }
           })
          .its('body.profile')
          .should('exist')
})

Cypress.Commands.add('clearTalentProfile', () => {
     const token = localStorage.getItem('access_token')
     cy.getTalentProfile().then(profile => {
          const id = profile.id
          const talentProfile = {
               "id": id,
               "firstName": "talent",
               "middleName": null,
               "lastName": "MVP",
               "username": "talent",
               "gender": null,
               "email": "talent.ivy@mvp.studio",
               "phone": null,
               "mobilePhone":null,
               "isMobilePhoneVerified": true,
               "address": {
                   "number": "",
                   "street": "",
                   "suburb": "",
                   "postCode": 0,
                   "city": "",
                   "country": ""
               },
               "nationality": null,
               "visaStatus": null,
               "visaExpiryDate": null,
               "profilePhoto": "start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png",
               "profilePhotoUrl": "https://www.remove.bg/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png",
               "videoName": null,
               "videoUrl": "",
               "cvName": null,
               "cvUrl": "",
               "summary": null,
               "description": null,
               "linkedAccounts": [],
               "jobSeekingStatus": {},
               "languages": [],
               "skills": [],
               "educations": [],
               "certifications": [],
               "experiences": []
            }
          cy.request({
               method: 'POST', 
               url: `${talent_api}/api/profile`, 
               body: talentProfile,
               auth: {
                    'bearer': token
               }
          })
          .its('status')
          .should('eq', 200)
     })
})

Cypress.Commands.add('addSkill', skill => {
     const token = localStorage.getItem('access_token')
     cy.request({
          method: 'POST',
          url: `${talent_api}/api/profile/skills`,
          body: skill,
          auth: {
               'bearer': token
          }
     })
     .its('body.id')
     .should('exist')
})

Cypress.Commands.add('skillsRoute', () => {
     cy.server()
     cy.route('POST', `${talent_api}/api/profile/skills`).as('postSkill')
     cy.route('PUT', `${talent_api}/api/profile/skills`).as('updateSkill')
     cy.route('DELETE', `${talent_api}/api/profile/skills`).as('deleteSkill')
})

Cypress.Commands.add('selectDropdownMenu', (value) => {
     cy.get('.ant-select-dropdown-menu-item').contains(value).click()
}) 

Cypress.Commands.add('jobsRoute', () => {
     cy.server()
     //cy.route('')
})