/// <reference types="cypress" />


describe('complex bottom sheet actions', () => {

    it('sort filter functions', () => {
        window.cy.visit('localhost:3000');
        window.cy.get('[data-cy=pxb-toolbar]').should('contain', 'Complex Bottom Sheet');
        window.cy.get('[data-cy=action-menu]').click();
        window.cy.get('[data-cy=btm-sheet-sort]').should('contain', 'Time')
            .and('contain', 'Type');
        window.cy.get('[data-cy=btm-sheet-show]').should('contain', 'Active Alarms')
            .and('contain', 'Alarms')
            .and('contain', 'Settings')
            .and('contain', 'Sessions');
        window.cy.get('[data-cy=btm-sheet-close]').should('contain', 'Close');
        // filter type
        window.cy.contains('Type').click();
        window.cy.get('[data-cy=btm-sheet-close-btn] > .MuiSvgIcon-root-58').click();
        window.cy.get('[data-cy=list-content]').children().should('have.length', '20');
        window.cy.get('[data-cy=action-menu]').click();
        // filter sessions
        window.cy.contains('Sessions').click()
        window.cy.get('[data-cy=btm-sheet-close-btn] > .MuiSvgIcon-root-58').click();
        window.cy.get('[data-cy=list-content]').children().should('not.contain', 'sessions');
        window.cy.get('[data-cy=action-menu]').click();
        // filter active alarms
        window.cy.contains('Active Alarms').click();
        window.cy.get('[data-cy=btm-sheet-close-btn] > .MuiSvgIcon-root-58').click();
        window.cy.get('[data-cy=list-content]').children().should('not.contain', 'active');
        window.cy.get('[data-cy=action-menu]').click();
        // filter settings
        window.cy.get('[data-cy=btm-sheet-show]').find('.MuiGrid-container-469').contains('Settings').click();
        window.cy.get('[data-cy=btm-sheet-close-btn] > .MuiSvgIcon-root-58').click();
        window.cy.get('[data-cy=list-content]').children().should('not.contain', 'Settings');



    });
});