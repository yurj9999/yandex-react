import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import {render, getByTestId, fireEvent} from '@testing-library/react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {
    INGREDIENTS,
    EMPTY_INGREDIENTS,
    BURGER_INGREDIENTS_LOCATION
} from '../../services/constants';
import BurgerIngredients from './burger-ingredients';

describe('Burger-ingredients tests', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({
        ingredients: {
            ingredients: INGREDIENTS
        },
        constructorIngredients: EMPTY_INGREDIENTS
    });

    const getBurgerIngredientsElement = (store, location, dndBackend) => (
        <Provider store={store}>
            <BrowserRouter>
                <Switch location={location}>
                    <Route path="/" exact>
                        <DndProvider backend={dndBackend}>
                            <BurgerIngredients/>
                        </DndProvider>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );

    it("Shouldn't be different between last snapshot and Burger-ingredients component", () => {
        const burgerIngredients = TestRenderer.create(getBurgerIngredientsElement(store, BURGER_INGREDIENTS_LOCATION,
            HTML5Backend));

        expect(burgerIngredients.toJSON()).toMatchSnapshot();
    });

    it('Should change tabs onclick', () => {
        // костыль, чтобы jest при тестировании увидел ф-ю scrollIntoView
        window.HTMLElement.prototype.scrollIntoView = function() {};

        const {container} = render(getBurgerIngredientsElement(store, BURGER_INGREDIENTS_LOCATION, HTML5Backend));

        const breadsTab = getByTestId(container, 'tabs').children[0];
        const saucesTab = getByTestId(container, 'tabs').children[1];
        const fillingsTab = getByTestId(container, 'tabs').children[2];

        expect(breadsTab.outerHTML.indexOf('tab_type_current')).not.toBe(-1);

        fireEvent.click(saucesTab);
        expect(saucesTab.outerHTML.indexOf('tab_type_current')).not.toBe(-1);

        fireEvent.click(fillingsTab);
        expect(fillingsTab.outerHTML.indexOf('tab_type_current')).not.toBe(-1);
    });
});
