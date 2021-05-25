import {
    URL_DATA,
    URL_ORDER
} from '../constants';

import {actions as ingredientsActions} from '../slices/ingredients';
import {actions as modalActions} from '../slices/modal';

export const getIngredients = () => {
    const {setAllIngredientsError, setAllIngredientsRequest, setAllIngredientsSuccess} = ingredientsActions;

    return async dispatch => {
        dispatch(setAllIngredientsRequest());
        try {
            const request = await fetch(URL_DATA);
            if (!request.ok) {
                throw new Error('Ошибка при запросе.');
            }
            const {data} = await request.json();
            dispatch(setAllIngredientsSuccess(data));
        } catch (error) {
            dispatch(setAllIngredientsError(error.message))
        }
    };
}

export const getOrderDetails = (ids) => {
    const {setOrderRequest, setOrderError, setOrderSuccess} = modalActions;

    return async (dispatch) => {
        dispatch(setOrderRequest());
        try {
            const request = await fetch(URL_ORDER, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  ingredients: ids
                })
            });
        
            if (!request.ok) {
                throw new Error('Ошибка при запросе.');
            }
        
            const data = await request.json();
            dispatch(setOrderSuccess(data));
        } catch (error) {
            dispatch(setOrderError(error.message));  
        }
    }
}
