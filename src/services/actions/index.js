import {
    URL_DATA,
    URL_REGISTRATION,
    URL_AUTORIZATION,
    URL_EXIT,
    URL_UPDATE_USER,
    URL_UPDATE_TOKEN
} from '../constants';

import {actions as ingredientsActions} from '../slices/ingredients';
import {actions as userActions} from '../slices/user';

import {setCookie, getCookie, deleteCookie} from '../utils/cookie-helper';

export const WS_CONNECT_ORDER_TAPE = 'WS_CONNECT_ORDER_TAPE';
export const WS_DISCONNECT_ORDER_TAPE = 'WS_DISCONNECT_ORDER_TAPE';
export const WS_CONNECT_USER_ORDERS = 'WS_CONNECT_USER_ORDERS';
export const WS_DISCONNECT_USER_ORDERS = 'WS_DISCONNECT_USER_ORDERS';

const refreshTokenUpdater = async (dispatcher, action) => {
    try {
        const request = await fetch(URL_UPDATE_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: localStorage.getItem('burgerRefreshToken')})
        });

        if (!request.ok) {
            throw new Error('Ошибка при запросе.');
        }
        
        const data = await request.json();

        setCookie('burgerAccessToken', data.accessToken);
        localStorage.setItem('burgerRefreshToken', data.refreshToken);

        dispatcher(action(data));
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUserData = (newUserData, token) => {
    const {setUserRequest, setUserError, setUserSuccess, setUpdatedTokens} = userActions;

    return async dispatch => {
        try {
            dispatch(setUserRequest());
            const request = await fetch(URL_UPDATE_USER, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: getCookie('burgerAccessToken')
                },
                body: JSON.stringify(newUserData)
            });

            if (!request.ok) {
                const error = await request.json();

                if (error.message === 'jwt expired') {
                    await refreshTokenUpdater(dispatch, setUpdatedTokens);
                    throw new Error(error.message);
                } else {
                    throw new Error('Ошибка');
                }
            }
            const data = await request.json();

            dispatch(setUserSuccess({
                ...data,
                accessToken: token,
                refreshToken: localStorage.getItem('burgerRefreshToken')
            }));
        } catch(error) {
            if (error.message === 'jwt expired') {
                await updateUserData(newUserData, token)(dispatch);
            } else {
                dispatch(setUserError(error.message));
            }
        }
    }
}

export const setUserFromServer = () => {
    const {setUserSuccess, setUserError, setUserRequest, setUpdatedTokens} = userActions;

    return async dispatch => {
        try {
            dispatch(setUserRequest());

            const request = await fetch(URL_UPDATE_USER, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: getCookie('burgerAccessToken')
                }
            });

            if (!request.ok) {
                const error = await request.json();

                if (error.message === 'jwt expired') {
                    deleteCookie('burgerAccessToken');
                    await refreshTokenUpdater(dispatch, setUpdatedTokens);
                    throw new Error(error.message);
                } else {
                    throw new Error('Ошибка');
                }
            }

            const data = await request.json();

            dispatch(setUserSuccess({
                ...data,
                accessToken: getCookie('burgerAccessToken'),
                refreshToken: localStorage.getItem('burgerRefreshToken')
            }));
        } catch(error) {
            if (error.message === 'jwt expired') {
                await setUserFromServer()(dispatch);
            } else {
                dispatch(setUserError(error.message));
                return error;
            }
        }
    }
}

export const exitUser = (refreshToken) => {
    const {setUserError, setUserRequest} = userActions;

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

            deleteCookie('burgerAccessToken');
            localStorage.removeItem('burgerRefreshToken');
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

            setCookie('burgerAccessToken', data.accessToken);
            localStorage.setItem('burgerRefreshToken', data.refreshToken);
            
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
