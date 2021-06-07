import {combineReducers} from 'redux';

import {reducer as ingredientsReducer} from '../slices/ingredients';
import {reducer as constructorReducer} from '../slices/constructor';
import {reducer as modalReducer} from '../slices/modal';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    constructorIngredients: constructorReducer
});
