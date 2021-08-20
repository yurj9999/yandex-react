import {
    URL_DATA,
    URL_REGISTRATION,
    URL_AUTORIZATION,
    URL_EXIT,
    URL_UPDATE_USER
} from '../constants';

import {actions as ingredientsActions} from '../slices/ingredients';
import {actions as userActions} from '../slices/user';
import {refreshTokenUpdater} from '../utils/refresh-token-updater';
import {setCookie, getCookie, deleteCookie} from '../utils/cookie-helper';

import {TDispatch} from '../../index';
import {TRootState} from '../reducers/index';

import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

import type {
    IUserData,
    IUserLogin,
    IIngredient
} from '../../interfaces';

export const WS_CONNECT_ORDER_TAPE: 'WS_CONNECT_ORDER_TAPE' = 'WS_CONNECT_ORDER_TAPE';
export const WS_DISCONNECT_ORDER_TAPE: 'WS_DISCONNECT_ORDER_TAPE' = 'WS_DISCONNECT_ORDER_TAPE';
export const WS_CONNECT_USER_ORDERS: 'WS_CONNECT_USER_ORDERS' = 'WS_CONNECT_USER_ORDERS';
export const WS_DISCONNECT_USER_ORDERS: 'WS_DISCONNECT_USER_ORDERS' = 'WS_DISCONNECT_USER_ORDERS';

const CONSTRUCTOR_SET_BUNS: 'constructor/setBuns' = 'constructor/setBuns';
const CONSTRUCTOR_SET_FILLINGS: 'constructor/setFillings' = 'constructor/setFillings';
const CONSTRUCTOR_UPDATE_FILLINGS: 'constructor/updateFillings' = 'constructor/updateFillings';
const CONSTRUCTOR_DELETE_INGREDIENT: 'constructor/deleteIngredient' = 'constructor/deleteIngredient';





interface IPayload {
    url: string;
}

interface IWsConnectOrderTape {
    readonly type: typeof WS_CONNECT_ORDER_TAPE;
    readonly payload: IPayload;
}

interface IWsDisconnectOrderTape {
    readonly type: typeof WS_DISCONNECT_ORDER_TAPE;
}

interface IWsConnectUserOrders {
    readonly type: typeof WS_CONNECT_USER_ORDERS;
    readonly payload: IPayload;
}

interface IWsDisconnectUserOrders {
    readonly type: typeof WS_DISCONNECT_USER_ORDERS;
}




interface IConstructorSetBuns {
    readonly type: typeof CONSTRUCTOR_SET_BUNS;
    readonly payload: IIngredient;
}

interface IConstructorSetFillings {
    readonly type: typeof CONSTRUCTOR_SET_FILLINGS;
    readonly payload: IIngredient;
}

interface IConstructorUpdateFillings {
    readonly type: typeof CONSTRUCTOR_UPDATE_FILLINGS;
    readonly payload: IIngredient;
}

interface IConstructorDeleteIngredient {
    readonly type: typeof CONSTRUCTOR_DELETE_INGREDIENT;
    readonly payload: IIngredient;
}









export type TWsActions = IWsConnectOrderTape | IWsDisconnectOrderTape | IWsConnectUserOrders | IWsDisconnectUserOrders;

export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>

export const getIngredients = (): TAppThunk => {
    const {setAllIngredientsError, setAllIngredientsRequest, setAllIngredientsSuccess} = ingredientsActions;

    return async (dispatch: TDispatch) => {
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

export const updateUserData = (newUserData: IUserData, token: string): TAppThunk => {
    const {setUserRequest, setUserError, setUserSuccess, setUpdatedTokens} = userActions;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    headers.set('authorization', getCookie('burgerAccessToken') as string);

    return async (dispatch: TDispatch) => {
        try {
            dispatch(setUserRequest());
            const request = await fetch(URL_UPDATE_USER, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(newUserData)
            });

            if (!request.ok) {
                const error: Error = await request.json();

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
                await updateUserData(newUserData, token);
            } else {
                dispatch(setUserError(error.message));
            }
        }
    }
}

export const setUserFromServer = (): TAppThunk => {
    const {setUserSuccess, setUserError, setUserRequest, setUpdatedTokens} = userActions;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    headers.set('authorization', getCookie('burgerAccessToken') as string);

    return async (dispatch: TDispatch) => {
        try {
            dispatch(setUserRequest());

            const request = await fetch(URL_UPDATE_USER, {
                method: 'GET',
                headers
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
                await setUserFromServer();
            } else {
                dispatch(setUserError(error.message));
                return error;
            }
        }
    }
}

export const exitUser = (refreshToken: string): TAppThunk => {
    const {setUserError, setUserRequest} = userActions;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return async (dispatch: TDispatch) => {
        dispatch(setUserRequest());
        try {
            const request = await fetch(URL_EXIT, {
                method: 'POST',
                headers,
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

export const setUser = (userData: IUserLogin, typeRequest: string): TAppThunk => {
    const {setUserRequest, setUserSuccess, setUserError} = userActions;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return async (dispatch: TDispatch) => {
        dispatch(setUserRequest());
        try {
            const request = await fetch(typeRequest === 'registration' ? URL_REGISTRATION : URL_AUTORIZATION, {
                method: 'POST',
                headers,
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
