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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser',(firstName, lastName, emailId, password) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/api/v1/users/register`,
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: {
            email: emailId,
            firstName: firstName,
            lastName: lastName,
            password: password
        }
    }).then(response => {
        expect(response.status).to.eq(201)
        return response.body.access_token
    })
})

Cypress.Commands.add('addTask',(access_token,taskname) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/api/v1/tasks`,
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${access_token}`
        },
        body: {
            item: taskname, 
            isCompleted: false
            }
        }
    )
})