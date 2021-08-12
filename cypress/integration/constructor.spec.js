import '@4tw/cypress-drag-drop';

describe('dnd test', () => {
    it('should be dnd in constructor page', () => {
        cy.visit('http://localhost:3000');
        cy.viewport(1280, 720);

        cy.get('[data-cy^=ingredients-list]').as('ingredients-list');
        cy.get('[data-cy^=constructor]').as('constructor');

        cy.get('[data-cy^=buns]').as('buns');
        cy.get('@buns').find('[data-cy^=ingredient]').first().as('bun');
        
        cy.get('[data-cy^=sauces]').as('sauces');
        cy.get('@sauces').find('[data-cy^=ingredient]').first().as('sauce');

        cy.get('[data-cy^=fillings]').as('fillings');
        cy.get('@fillings').find('[data-cy^=ingredient]').first().as('filling');

        cy.get('@bun').drag('@constructor');
        cy.get('@constructor').children().should('have.length', '2');

        cy.get('@sauce').drag('@constructor');
        cy.get('@filling').drag('@constructor');
        cy.get('@constructor').children().should('have.length', '3');

        cy.get('@constructor').find('[data-cy^=filling-arr]').children().as('fillingArr');
        cy.get('@fillingArr').should('have.length', '2');

        cy.get('@fillingArr').eq(0).as('first');
        cy.get('@fillingArr').eq(1).as('second');

        cy.get('@first').children().eq(0).children().eq(0).children().eq(1).should('contain', 'Соус Spicy-X');
        cy.get('@second').children().eq(0).children().eq(0).children().eq(1).should('contain', 'Филе Люминесцентного тетраодонтимформа');

        cy.get('@first').drag('@second');

        cy.get('@constructor').find('[data-cy^=filling-arr]').children().as('newFillingArr');

        cy.get('@newFillingArr').eq(0).as('newFirst');
        cy.get('@newFillingArr').eq(1).as('newSecond');

        cy.get('@newFirst').children().eq(0).children().eq(0).children().eq(1).should('contain', 'Филе Люминесцентного тетраодонтимформа');
        cy.get('@newSecond').children().eq(0).children().eq(0).children().eq(1).should('contain', 'Соус Spicy-X');
    });
});
