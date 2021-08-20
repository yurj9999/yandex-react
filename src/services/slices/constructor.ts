import {createSlice} from '@reduxjs/toolkit';

import {IConstructorState, IIngredient} from '../../interfaces';
import {ISliceAction} from '../actions/index';

const constructorInitialState: IConstructorState = {
    bun: {},
    fillings: []
};

const slice = createSlice({
    name: 'constructor',
    initialState: constructorInitialState,
    reducers: {
        setBuns(state, actions: ISliceAction<IIngredient>) {
            state.bun = actions.payload;
        },
        setFillings(state, actions: ISliceAction<IIngredient>) {
            state.fillings.push(actions.payload);
        },
        updateFillings(state, actions: ISliceAction<IIngredient[]>) {
            state.fillings = actions.payload;
        },
        deleteIngredient(state, actions: ISliceAction<IIngredient[]>) {
            state.fillings = actions.payload;
        }
    }
});

export const {reducer, actions} = slice;
