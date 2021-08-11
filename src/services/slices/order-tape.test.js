import {reducer} from './order-tape';

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0
};

describe('order-tape reducer tests', () => {
    test('should return the initial state', () => expect(reducer(undefined, {})).toEqual(initialState));

    test('should handle order-tape/setOrders', () => expect(reducer(initialState, {
        type: 'order-tape/setOrders',
        payload: {
            orders: [1, 2, 3],
            total: 1,
            totalToday: 1
        }
    })).toEqual({
        orders: [1, 2, 3],
        total: 1,
        totalToday: 1
    }));

    test('should handle order-tape/clearOrders', () => expect(reducer(initialState, {
        type: 'order-tape/clearOrders'
    })).toEqual({
        orders: [],
        total: 0,
        totalToday: 0
    }));
});
