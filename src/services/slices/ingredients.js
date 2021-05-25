import {createSlice} from '@reduxjs/toolkit';

const ingredientsInitialState = {
    blockedAll: true,
    error: '',
    ingredients: []
};

const slice = createSlice({
    name: 'ingredients',
    initialState: ingredientsInitialState,
    reducers: {
        setAllIngredientsRequest(state) {
            state.blockedAll = true;
        },
        setAllIngredientsError(state, actions) {
            state.ingredients = [];
            state.error = actions.payload;
        },
        setAllIngredientsSuccess(state, actions) {
            state.blockedAll = false;
            state.ingredients = actions.payload;
        }
    }
});

export const {reducer, actions} = slice;
