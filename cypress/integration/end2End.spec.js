import { makeEmail } from '../utils/utils'

describe('End to End scenarios',() => {
const RANDOM_EMAIL_ID = makeEmail()
const FIRST_NAME = 'First'

    before(() => {
        cy.visit('/')
        cy.contains('Signup').click().then(() => {
            cy.get('[data-testid="first-name"]').type(FIRST_NAME)
            cy.get('[data-testid="last-name"]').type('Name')
            cy.get('[data-testid="email"]').type(`${RANDOM_EMAIL_ID}@blackhole.email.com`)
            cy.get('[data-testid="password"]').type('Password123#')
            cy.get('[data-testid="confirm-password"]').type('Password123#')
            cy.get('[data-testid="submit"]').click()
            cy.url().should('contains', '/todo').then(() =>{
                cy.contains('Logout').click()
            })
        })
    })

    beforeEach(() =>{
        cy.visit('/')
        cy.get('[data-testid="email"]').type(`${RANDOM_EMAIL_ID}@blackhole.email.com`)
        cy.get('[data-testid="password"]').type('Password123#')
        cy.get('[data-testid="submit"]').click()
    })

    it('End to end scenario when a user is creating a Todo item', () => {
        cy.url().should('contains', '/todo').then(() => {
            cy.get('[data-testid="welcome"]').should('be.visible')
            cy.get('[data-testid="add"]').click()
            cy.url().should('contains','/todo/new').then(() =>{
                cy.get('[data-testid="header"]').invoke('text').should('eq','Create a new Todo')
                cy.get('[data-testid="new-todo"]').type('New todo')
                cy.contains('Create Todo').click().then(() => {
                    cy.url().should('eq','http://localhost:3000/todo')
                })
            })
        })
    })

    it('End to end scenario when a user is checking a Todo item',() => {
        cy.url().should('contains', '/todo').then(() => {
            cy.get('[data-testid="welcome"]').should('be.visible')
            cy.get('[data-testid="add"]').click()
            cy.url().should('contains','/todo/new').then(() =>{
                cy.get('[data-testid="header"]').invoke('text').should('eq','Create a new Todo')
                cy.get('[data-testid="new-todo"]').type('New todo 2')
                cy.contains('Create Todo').click().then(() => {
                    cy.url().should('eq','http://localhost:3000/todo')
                    cy.get('[data-testid="todo-item"]').contains('New todo 2').parent().within(() => {
                        cy.get('[data-testid="complete-task"]').click()
                    })
                })
            })
        })
    })
})