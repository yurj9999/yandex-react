import {reducer} from './ingredients';

const initialState = {
    blockedAll: true,
    error: '',
    ingredients: []
};

describe('ingredients reducer test', () => {
    test('should return the initial state', () => expect(reducer(undefined, {})).toEqual(initialState));

    /*test('should handle ingredients/setAllIngredientsSuccess', () => expect(reducer(initialState, {
        type: 'ingredients/setAllIngredientsSuccess',
        payload: [
            {name: 'test1'},
            {name: 'test2'}
        ],
        blockedAll: false
    })).toEqual({
        blockedAll: false,
        error: '',
        ingredients: [
            {name: 'test1'},
            {name: 'test2'}
        ]
    }));

    test('should handle ingredients/setAllIngredientsRequest', () => expect(reducer(initialState, {})).toEqual({
        blockedAll: true,
        error: '',
        ingredients: []
    }));

    test('should handle ingredients/setAllIngredientsError', () => expect(reducer(initialState, {
        type: 'ingredients/setAllIngredientsError',
        payload: 'error',
        ingredients: []
    })).toEqual({
        blockedAll: true,
        error: 'error',
        ingredients: []
    }));*/
});
