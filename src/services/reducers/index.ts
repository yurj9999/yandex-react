import {combineReducers} from 'redux';

import {reducer as ingredientsReducer} from '../slices/ingredients';
import {reducer as constructorReducer} from '../slices/constructor';
import {reducer as userReducer} from '../slices/user';
import {reducer as orderTapeReducer} from '../slices/order-tape';
import {reducer as myOrdersReducer} from '../slices/my-orders';
import {reducer as modalReducer} from '../slices/modal';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    user: userReducer,
    orderTape: orderTapeReducer,
    myOrders: myOrdersReducer,
    modal: modalReducer
});

export type TRootState = ReturnType<typeof rootReducer>;
