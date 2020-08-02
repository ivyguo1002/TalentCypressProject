/// <reference types="cypress" />
export const clickMenuItem = (menu) => {
    //cy.get(`a[href="${menu}"]`)
    cy.get('li[role="menuitem"]')
      .contains(menu)
      .click()
}

export const hoverMenuItem = (menu) => {
    cy.get('li[role="menuitem"]')
      .contains(menu)
      .trigger('mouseover')
}

export const logout = () => {
    cy.get('.antd-pro-app-src-components-global-header-index-account')
      .trigger('mouseover')
    cy.get('.anticon-logout').parent().click()
}

export const accountSetting = () => {
    cy.get('.antd-pro-app-src-components-global-header-index-account')
      .trigger('mouseover')
    cy.contains('Account Settings').click()
}
