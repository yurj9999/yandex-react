import {createReducer} from '@reduxjs/toolkit';

import {
    GET_ALL_INGREDIENTS_REQUEST,
    GET_ALL_INGREDIENTS_ERROR,
    GET_ALL_INGREDIENTS_SUCCESS,
    SET_MODAL_INGREDIENT,
    CLEAR_MODAL,
    GET_ORDER_ERROR,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    SET_BUNS,
    SET_FILLINGS,
    DELETE_INGREDIENT,
    UPDATE_FILLINGS
} from '../constants';

const ingredientsInitialState = {
    blockedAll: true,
    error: '',
    ingredients: []
};

const modalInitialState = {
    ingredient: {},
    order: {},
    modalType: '',
    error: '',
    blockedClick: false
};

const constructorIngedientsInitialState = {
    bun: {},
    fillings: []
};

export const constructorIngedientsReducer = createReducer(constructorIngedientsInitialState, builder => {
    builder
        .addCase(SET_BUNS, (state, action) => {
            state.bun = action.item;
        })
        .addCase(SET_FILLINGS, (state, action) => {
            state.fillings.push(action.item);
        })
        .addCase(UPDATE_FILLINGS, (state, action) => {
            state.fillings = action.data;
        })
        .addCase(DELETE_INGREDIENT, (state, action) => {
            state.fillings = action.elements;
        })
});

export const ingredientsReducer = createReducer(ingredientsInitialState, builder => {
    builder
        .addCase(GET_ALL_INGREDIENTS_REQUEST, (state) => {
            state.blockedAll = true;
        })
        .addCase(GET_ALL_INGREDIENTS_ERROR, (state, action) => {
            state.ingredients = [];
            state.error = action.error;
        })
        .addCase(GET_ALL_INGREDIENTS_SUCCESS, (state, action) => {
            state.blockedAll = false;
            state.ingredients = action.ingredients;
        })
});

export const modalReducer = createReducer(modalInitialState, builder => {
    builder
        .addCase(SET_MODAL_INGREDIENT, (state, action) => {
            state.ingredient = action.ingredient;
            state.modalType = 'ingredient';
            state.error = '';
        })
        .addCase(CLEAR_MODAL, (state) => {
            state.ingredient = {};
            state.order = {};
            state.modalType = '';
        })
        .addCase(GET_ORDER_ERROR, (state, action) => {
            state.ingredient = {};
            state.order = {};
            state.modalType = '';
            state.error = action.error;
            state.blockedClick = false;
        })
        .addCase(GET_ORDER_REQUEST, (state) => {
            state.error = '';
            state.blockedClick = true;
        })
        .addCase(GET_ORDER_SUCCESS, (state, action) => {
            state.order = action.order;
            state.modalType = 'order';
            state.blockedClick = false;
        })
});
