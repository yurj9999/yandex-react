import {reducer} from './my-orders';

const initialState = {
    orders: []
};

describe('my-orders reducer tests', () => {
    test('should return the initial state', () => expect(reducer(undefined, {})).toEqual(initialState));

    test('should handle my-orders/setOrders', () => expect(reducer(initialState, {
        type: 'my-orders/setOrders',
        payload: {
            orders: [1, 2, 3]
        }
    })).toEqual({
        orders: [1, 2, 3]
    }));

    test('should handle my-orders/clearOrders', () => expect(reducer(initialState, {
        type: 'my-orders/clearOrders'
    })).toEqual({
        orders: []
    }));
});
