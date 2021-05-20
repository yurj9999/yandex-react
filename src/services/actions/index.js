import {
    URL_DATA,
    URL_ORDER,
    GET_ALL_INGREDIENTS_REQUEST,
    GET_ALL_INGREDIENTS_ERROR,
    GET_ALL_INGREDIENTS_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR
} from '../constants';

export const getIngredients = () => {
    return async dispatch => {
        dispatch({
            type: GET_ALL_INGREDIENTS_REQUEST
        });

        try {
            const request = await fetch(URL_DATA);
            if (!request.ok) {
                throw new Error('Ошибка при запросе.');
            }

            const {data} = await request.json();
            dispatch({
                type: GET_ALL_INGREDIENTS_SUCCESS,
                ingredients: data
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_INGREDIENTS_ERROR,
                error: error.message
            });
        }
    };
}

export const getOrderDetails = (ids) => {
    return async (dispatch) => {
        dispatch({
            type: GET_ORDER_REQUEST
        });

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
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: data
            });
        } catch (error) {
            dispatch({
                type: GET_ORDER_ERROR,
                error: error.message
            });  
        }
    }
}
