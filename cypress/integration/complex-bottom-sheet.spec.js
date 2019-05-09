/// <reference types="cypress" />

describe('Angular complex bottom sheet and actions', () => {

    it('loads correctly and sort filter functions', () => {
        cy.visit('localhost:4200');
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Complex Bottom Sheet')
            .and('contain', 'menu');
        cy.get('[data-cy=pxb-toolbar-menu]').click();
        cy.get('[data-cy=btm-sheet-sort]').should('contain', 'Time')
            .and('contain', 'Type');
        cy.get('[data-cy=btm-sheet-show]').should('contain', 'Active Alarms')
            .and('contain', 'Alarms')
            .and('contain', 'Settings')
            .and('contain', 'Sessions');
        cy.get('[data-cy=btm-sheet-close] > .mat-list-item > .mat-list-item-content').should('contain', 'Close');
        cy.get('[data-cy=btm-sheet-type-btn]').click()
        cy.get('[data-cy=btm-sheet-close-btn]').click()
        cy.get('.mat-list-item-content').should('have.length', '20');
        cy.get('[data-cy=pxb-toolbar-menu]').click();
        cy.wait(300)
        cy.get('[data-cy=sessions]').click();
        cy.get('[data-cy=btm-sheet-close-btn]').click();
        cy.get('.mat-list-item-content').should('not.contain', 'sessions');
        cy.get('[data-cy=pxb-toolbar-menu]').click();
        cy.wait(300)
        cy.get('[data-cy=active-alarms]').click();
        cy.get('[data-cy=btm-sheet-close-btn]').click();
        cy.get('.mat-list-item-content').should('not.contain', 'active')
        cy.get('[data-cy=pxb-toolbar-menu]').click();
        cy.wait(300)
        cy.get('[data-cy=alarms]').click();
        cy.get('.mat-list-item-content').should('not.contain', 'under').and('not.contain', 'over');
        cy.get('.mat-list-item-content').should('contain', 'settings')

    });
});