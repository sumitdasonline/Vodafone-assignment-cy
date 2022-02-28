import { makeEmail } from '../utils/utils'

describe('Feature scenarios',() => {
    const MORNING = new Date(Date.UTC(2022, 2, 22, 10, 0, 0)).getTime()
    const AFTERNOON = new Date(2022, 2, 22, 13, 0, 0).getTime()
    const EVENING = new Date(2022, 2, 22, 20, 0, 0).getTime()
    const NIGHT = new Date(2022, 2, 22, 1, 0, 0).getTime()
    const TIMES = [
        {
            "time": MORNING,
            "text": "Good morning"
        },
        {
            "time": AFTERNOON,
            "text": "Good afternoon"
        },
        {
            "time": EVENING,
            "text": "Good Evening"
        },
        {
            "time": NIGHT,
            "text": "Time to sleep"
        },
    ]
    const RANDOM_EMAIL_ID = makeEmail()
    const FIRST_NAME = 'First'

    before(() => {
        cy.createUser(FIRST_NAME,'LastName',`${RANDOM_EMAIL_ID}@blackhole.email.com`,'Password123#').as('user1')
    })

    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-testid="email"]').type(`${RANDOM_EMAIL_ID}@blackhole.email.com`)
        cy.get('[data-testid="password"]').type('Password123#')
        cy.get('[data-testid="submit"]').click()
    })

    it('Verify pagination when more than 5 tasks are added',()=> {
        cy.get('@user1').then(access_token=>{
            for(let i=0; i < 12; i++){
                cy.addTask(access_token,`Task no ${i}`)
            }
        })

        cy.reload().then(() =>{
            cy.get('[data-testid="todo-text"]').eq(0).invoke('text').should('eq','Task no 11')
            cy.get('[data-test-id="pagination-link"]').should('have.length', 3)
            cy.get('[data-test-id="pagination-link"]').eq(1).click().then(() => {
                cy.get('[data-testid="todo-text"]').eq(0).invoke('text').should('eq','Task no 6')
                cy.get('[data-test-id="pagination-link"]').eq(2).click().then(() => {
                    cy.get('[data-testid="todo-text"]').eq(0).invoke('text').should('eq','Task no 1')
                })
            })
        })
        
    })

    TIMES.forEach(obj => {
        it(`Verify header message with time of the day is ${obj.text}`,() => {
            console.log(`Time is ${obj.time} and text is ${obj.text}`)
            cy.clock(obj.time).then(() => {
                cy.url().should('contains', '/todo').then(() => {
                    cy.get('[data-testid="welcome"]').invoke('text').should('eq',`${obj.text} First`)
                })
            })
        })
    })
    
    it('Verify header message for different types of users',() => {})
})