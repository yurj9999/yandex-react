import {createSlice} from '@reduxjs/toolkit';

import {IConstructorState} from '../../interfaces';

import {} from '../actions/index';

const constructorInitialState: IConstructorState = {
    bun: {},
    fillings: []
};

const slice = createSlice({
    name: 'constructor',
    initialState: constructorInitialState,
    reducers: {
        setBuns(state, actions: ) {
            state.bun = actions.payload;
        },
        setFillings(state, actions) {
            state.fillings.push(actions.payload);
        },
        updateFillings(state, actions) {
            state.fillings = actions.payload;
        },
        deleteIngredient(state, actions) {
            state.fillings = actions.payload;
        }
    }
});

export const {reducer, actions} = slice;
