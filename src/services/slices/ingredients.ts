import {createSlice} from '@reduxjs/toolkit';

import {IIngredientsState, IIngredient} from '../../interfaces';
import {ISliceAction} from '../actions/index';

const ingredientsInitialState: IIngredientsState = {
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
        setAllIngredientsError(state, actions: ISliceAction<string>) {
            state.ingredients = [];
            state.error = actions.payload;
        },
        setAllIngredientsSuccess(state, actions: ISliceAction<IIngredient[]>) {
            state.blockedAll = false;
            state.ingredients = actions.payload;
        }
    }
});

export const {reducer, actions} = slice;
