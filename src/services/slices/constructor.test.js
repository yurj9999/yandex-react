import {reducer} from './constructor';

const initialState = {
    bun: {},
    fillings: []
};

describe('constructor reducer tests', () => {
    test('should return the initial state', () => expect(reducer(undefined, {})).toEqual(initialState));

    test('should handle constructor/setBuns', () => expect(reducer(initialState, {
        type: 'constructor/setBuns',
        payload: {
            name: 'test'
        }
    })).toEqual({
        fillings: [],
        bun: {
            name: 'test'
        }
    }));

    test('should handle constructor/setFillings', () => expect(reducer(initialState, {
        type: 'constructor/setFillings',
        payload: {
            name: 'test'
        }
    })).toEqual({
        bun: {},
        fillings: [
            {
                name: 'test'
            }
        ]
    }));

    test('should handle constructor/updateFillings', () => expect(reducer(initialState, {
        type: 'constructor/updateFillings',
        payload: [
            {
                name: 'first'
            },
            {
                name: 'second'
            }
        ]
    })).toEqual({
        bun: {},
        fillings: [
            {
                name: 'first'
            },
            {
                name: 'second'
            }
        ]
    }));

    test('should handle constructor/deleteIngredient', () => expect(reducer(initialState, {
        type: 'constructor/deleteIngredient',
        payload: [
            {
                name: 'test'
            }
        ]
    })).toEqual({
        bun: {},
        fillings: [
            {
                name: 'test'
            }
        ]
    }))
});