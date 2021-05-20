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

export const constructorIngedientsReducer = (state = constructorIngedientsInitialState, action) => {
    switch(action.type) {
        case SET_BUNS:
            return {
                ...state,
                bun: {...action.item}
            };

        case SET_FILLINGS:
            return {
                ...state,
                fillings: [...state.fillings, action.item]
            };

        case UPDATE_FILLINGS:
            return {
                ...state,
                fillings: [...action.data]
            };

        case DELETE_INGREDIENT:
            return {
                ...state,
                fillings: [...action.elements]
            };

        default:
            return state;
    }
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch(action.type) {
        case GET_ALL_INGREDIENTS_REQUEST:
            return {
                ...state,
                blockedAll: true,
                error: ''
            };

        case GET_ALL_INGREDIENTS_ERROR:
            return {
                ingredients: [],
                error: action.error,
                blockedAll: false
            };

        case GET_ALL_INGREDIENTS_SUCCESS:
            return {
                blockedAll: false,
                ingredients: action.ingredients,
                error: ''
            };

        default:
            return state;
    }
}

export const modalReducer = (state = modalInitialState, action) => {
    switch(action.type) {
        case SET_MODAL_INGREDIENT:
            return {
                order: {},
                ingredient: action.ingredient,
                modalType: 'ingredient',
                error: '',
                blockedClick: false
            };

        case CLEAR_MODAL:
            return {
                ingredient: {},
                order: {},
                modalType: '',
                error: '',
                blockedClick: false
            };

        case GET_ORDER_ERROR:
            return {
                ingredient: {},
                order: {},
                modalType: '',
                error: action.error,
                blockedClick: false
            };

        case GET_ORDER_REQUEST:
            return {
                blockedClick: true,
                error: '',
                ingredient: {},
                order: {},
                modalType: '',
            };

        case GET_ORDER_SUCCESS:
            return {
                blockedClick: false,
                error: '',
                ingredient: {},
                order: action.order,
                modalType: 'order',
            };

        default:
            return state;
    }
}
