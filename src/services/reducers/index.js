import {combineReducers} from 'redux';

import {
    ingredientsReducer,
    modalReducer,
    constructorIngedientsReducer,
} from './reducers';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    constructorIngredients: constructorIngedientsReducer
});
