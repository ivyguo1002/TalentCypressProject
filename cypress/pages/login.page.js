
export const login = (user) => {
    if (user.email) {
        cy.get('#email')
          .type(user.email)
    }
    if (user.password) {
        cy.get('#password')
          .type(user.password)
    }
    cy.get('#btn_login')
      .click()
}

export const validateExplainMessage = (message) => {
    cy.get('.ant-form-explain')
      .should('contain', message)
}

export const validateErrorMessage = (message) => {
    cy.get('.ant-message')
      .should('contain', message)
}