import {combineReducers} from 'redux';

import {reducer as ingredientsReducer} from '../slices/ingredients';
import {reducer as constructorReducer} from '../slices/constructor';
import {reducer as userReducer} from '../slices/user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    user: userReducer 
});
