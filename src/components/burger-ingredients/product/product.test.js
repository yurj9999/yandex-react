import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import Product from './product';

const getProductComponent = (data, ingredients) => {
    const mockStore = configureStore([]);
    const store = mockStore({
        constructorIngredients: ingredients
    });

    return TestRenderer.create(
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <Product data={data}/>
            </Provider>
        </DndProvider>
    );
}

describe('Test Product component', () => {
    const bunData = {
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        name: "Краторная булка N-200i",
        price: 1255,
        type: "bun",
        _id: "60d3b41abdacab0026a733c6"
    };

    const fillingData = {
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        name: "Соус фирменный Space Sauce",
        price: 80,
        type: "sauce",
        _id: "60d3b41abdacab0026a733cd"
    };

    const emptyIngredients = {
        bun: {},
        fillings: []
    };

    const bunIngredients = {
        bun: {
            _id: "60d3b41abdacab0026a733c6"
        },
        fillings: []
    };

    const fillingIngredients = {
        bun: {},
        fillings: [
            {
                _id: "60d3b41abdacab0026a733cd"
            }
        ]
    };

    it("Shouldn't be different between last snapshot and Product component", () =>
        expect(getProductComponent(bunData, emptyIngredients).toJSON()).toMatchSnapshot());

    it('Should render Product component', () => expect(getProductComponent(bunData, emptyIngredients)
        .toJSON().props['data-qa']).toBe('product-component'));

    it('Should render counter bun equal to 2', () => {
        const product = getProductComponent(bunData, bunIngredients).toJSON();

        expect(product[1].children[0].children[0]).toBe('2');
    });

    it('Should render counter fillings equal to 1', () => {
        const product = getProductComponent(fillingData, fillingIngredients).toJSON();

        expect(product[1].children[0].children[0]).toBe('1');
    });
});
