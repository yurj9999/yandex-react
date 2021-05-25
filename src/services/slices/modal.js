import {createSlice} from '@reduxjs/toolkit';

const modalInitialState = {
    ingredient: {},
    order: {},
    modalType: '',
    error: '',
    blockedClick: false
};

const slice = createSlice({
    name: 'modal',
    initialState: modalInitialState,
    reducers: {
        setModalIngredient(state, actions) {
            state.ingredient = actions.payload;
            state.modalType = 'ingredient';
            state.error = '';
        },
        clearModal(state) {
            state.ingredient = {};
            state.order = {};
            state.modalType = '';
        },
        setOrderError(state, actions) {
            state.ingredient = {};
            state.order = {};
            state.modalType = '';
            state.error = actions.payload;
            state.blockedClick = false;
        },
        setOrderRequest(state) {
            state.error = '';
            state.blockedClick = true;
        },
        setOrderSuccess(state, actions) {
            state.order = actions.payload;
            state.modalType = 'order';
            state.blockedClick = false;
        }
    }
});

export const {reducer, actions} = slice;
