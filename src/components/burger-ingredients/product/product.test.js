import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {
    BUN_DATA,
    FILLING_DATA,
    EMPTY_INGREDIENTS,
    BUN_INGREDIENTS,
    FILLING_INGREDIENTS
} from '../../../services/constants';
import Product from './product';

describe('Test Product component', () => {
    const getProductComponent = (data, ingredients) => {
        const mockStore = configureStore([]);
        const store = mockStore({
            constructorIngredients: ingredients
        });

        return TestRenderer.create(

                <Provider store={store}>
                    <DndProvider backend={HTML5Backend}>
                        <Product data={data}/>
                    </DndProvider>
                </Provider>

        );
    }

    it("Shouldn't be different between last snapshot and Product component", () =>
        expect(getProductComponent(BUN_DATA, EMPTY_INGREDIENTS).toJSON()).toMatchSnapshot());

    it('Should render Product component', () => expect(getProductComponent(BUN_DATA, EMPTY_INGREDIENTS)
        .toJSON().props['data-qa']).toBe('product-component'));

    it('Should render counter bun equal to 2', () => {
        const product = getProductComponent(BUN_DATA, BUN_INGREDIENTS).toJSON();

        expect(product[1].children[0].children[0]).toBe('2');
    });

    it('Should render counter fillings equal to 1', () => {
        const product = getProductComponent(FILLING_DATA, FILLING_INGREDIENTS).toJSON();

        expect(product[1].children[0].children[0]).toBe('1');
    });
});
