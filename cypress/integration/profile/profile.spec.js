/// <reference types="cypress" />
import * as profilePage from '../../pages/profile.page'
describe('Profile', () => {
    beforeEach('login and open profile page', () => {
        cy.viewport("macbook-13")
        cy.signinAs('talent')
        //cy.clearTalentProfile()--need update
        //cy.visit('/profile')
    })

    describe('skills', () => {    
        const skill = {
            "name": "cypress",
            "level": "Beginner"
        } 
    
        const updateSkill = {
            "name": "Javascript",
            "level": "Expert"
        }
        
        beforeEach(() => {
            cy.skillsRoute()
        })

        it('add a new skill', () => {
            cy.visit('/profile')
            profilePage.expandHeader('Skill')
            profilePage.newSkill(skill)
            //cy.wait('@postSkill').its('status').should('eq', 200)
            profilePage.validateSuccessMessage()
        })

        it('display a skill', () => {
            //cy.addSkill(skill)
            cy.visit('/profile')
            profilePage.expandHeader('Skills')
            profilePage.validateSkillDisplay(skill)
        })
    
        it('update a skill', () => {
            //cy.addSkill(skill)
            cy.visit('/profile')
            profilePage.expandHeader('Skills')
            profilePage.updateSkill(skill, updateSkill)
            //cy.wait('@updateSkill').its('status').should('eq', 200)
            profilePage.validateSuccessMessage()
        })
    
        it('delete a skill', () => {
            //cy.addSkill(skill)
            cy.visit('/profile')
            profilePage.expandHeader('Skills')
            profilePage.deleteSkill(skill)
            //cy.wait('@deleteSkill').its('status').should('eq', 200)
            profilePage.validateSuccessMessage()
        })
    
    })
})
