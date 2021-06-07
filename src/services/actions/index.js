import {
    URL_DATA,
    URL_ORDER,
    URL_REGISTRATION,
    URL_AUTORIZATION,
    URL_EXIT
} from '../constants';

import {actions as ingredientsActions} from '../slices/ingredients';
import {actions as modalActions} from '../slices/modal';
import {actions as userActions} from '../slices/user';

import {setCookie, deleteCookie} from '../utils/cookie-helper';

export const exitUser = (refreshToken, userName) => {
    const {setUserClear, setUserError, setUserRequest} = userActions;

    return async dispatch => {
        dispatch(setUserRequest());
        try {
            const request = await fetch(URL_EXIT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(refreshToken)
            });

            if (!request.ok) {
                throw new Error('Ошибка при запросе.');
            }
            const data = await request.json();

            localStorage.removeItem('refreshToken');
            deleteCookie(userName);

            dispatch(setUserClear(data));
        } catch (error) {
            dispatch(setUserError(error.message));
            return error;
        }
    }
}

export const setUser = (userData, typeRequest) => {
    const {setUserRequest, setUserSuccess, setUserError} = userActions;

    return async dispatch => {
        dispatch(setUserRequest());
        try {
            const request = await fetch(typeRequest === 'registration' ? URL_REGISTRATION : URL_AUTORIZATION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(userData)
            });

            if (!request.ok) {
                throw new Error('Ошибка при запросе.');
            }
            const data = await request.json();

            setCookie(data.user.name, data.accessToken);
            localStorage.setItem('refreshToken', `${data.user.name}=${data.refreshToken}`);
            
            dispatch(setUserSuccess(data));
        } catch (error) {
            dispatch(setUserError(error.message));
            return error;
        }
    }
}

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
