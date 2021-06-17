import '@4tw/cypress-drag-drop';

describe('dnd test', () => {
    it('should be dnd in constructor page', () => {
        cy.visit('http://localhost:3000');

        cy.get('[class^=burger-ingredients_menuWrapper__]').as('ingredients');
        cy.get('[class^=burger-constructor_itemWrapper__]').as('constructor');

        cy.get('@ingredients').find('[class^=burger-ingredients_block__]').eq(0).as('buns');
        cy.get('@buns').find('[class^=product-group_ingredientWrapper__]').first().as('bun');

        cy.get('@ingredients').find('[class^=burger-ingredients_block__]').eq(1).as('sauces');
        cy.get('@sauces').find('[class^=product-group_ingredientWrapper__]').first().as('sauce');

        cy.get('@ingredients').find('[class^=burger-ingredients_block__]').eq(2).as('fillings');
        cy.get('@fillings').find('[class^=product-group_ingredientWrapper__]').first().as('filling');

        cy.get('@bun').drag('@constructor');
        cy.get('@constructor').children().should('have.length', '2');

        cy.get('@sauce').drag('@constructor');
        cy.get('@filling').drag('@constructor');
        cy.get('@constructor').children().should('have.length', '3');

        cy.get('@constructor').find('[class^=burger-constructor_mainIngredientsWrapper__]').children().as('fillingArr');
        cy.get('@fillingArr').should('have.length', '2');

        cy.get('@fillingArr').eq(0).as('first');
        cy.get('@fillingArr').eq(1).as('second');

        cy.get('@first').find('[class^=constructor-element__text]').should('contain', 'Соус Spicy-X');
        cy.get('@second').find('[class^=constructor-element__text]').should('contain', 'Филе Люминесцентного тетраодонтимформа');

        cy.get('@first').drag('@second');

        cy.get('@constructor').find('[class^=burger-constructor_mainIngredientsWrapper__]').children().as('newFillingArr');

        cy.get('@newFillingArr').eq(0).as('newFirst');
        cy.get('@newFillingArr').eq(1).as('newSecond');

        cy.get('@newFirst').find('[class^=constructor-element__text]').should('contain', 'Филе Люминесцентного тетраодонтимформа');
        cy.get('@newSecond').find('[class^=constructor-element__text]').should('contain', 'Соус Spicy-X');
    });
});
