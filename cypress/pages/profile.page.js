/// <reference types="cypress" />
export const expandHeader = (section) => {
    cy.contains(`${section}`, {timeout: 30000}).click({timeout: 30000})
}

export const newSkill = (skill) => {
    cy.get('.ant-collapse-content-box > .ant-btn').click()
    cy.get('#name').type(skill.name)
    cy.get('#level').click()
    cy.selectDropdownMenu(skill.level)
    cy.get('.ant-collapse-content-active').find('[data-icon = "check"]').click()
}

export const updateSkill = (skill, updateSkill) => {
    cy.get('span > .anticon-edit').click()
    cy.get('#name').clear().type(updateSkill.name)
    cy.get('#level').click()
    cy.selectDropdownMenu(updateSkill.level)
    cy.get('.ant-collapse-content-active').find('[data-icon = "check"]').click()
}

export const deleteSkill = (skill) => {
    cy.get('.anticon-delete').click()
    cy.contains('OK').click()
}
export const validateSuccessMessage = () => {
    cy.get('.ant-message-success').should('be.visible')
}

export const validateSkillDisplay = (skill) => {
    cy.get('.ant-table-row > :nth-child(1)').should('have.text', skill.name)
    cy.get('.ant-table-row > :nth-child(2)').should('have.text', skill.level)
}