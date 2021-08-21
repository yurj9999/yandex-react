import {Location} from 'history';

export interface ILocationState {
    modal?: Location;
}

export interface IUserLogin {
    name?: string;
    email: string;
}

export interface IUserState {
    success: boolean;
    user: IUserLogin;
    accessToken: string;
    refreshToken: string;
    error: string;
    isBlocked: boolean;
    isExit: boolean;
}

export interface IUserData extends IUserLogin {
    password: string;
}

export interface IOrderItem {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export interface IIngredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
}

export interface IMyOrdersState {
    orders: IOrderItem[];
}

export interface IOrderTape extends IMyOrdersState {
    total: number;
    totalToday: number;
}

export interface IConstructorState {
    bun: IIngredient | {};
    fillings: IIngredient[];
}

export interface IIngredientsState {
    blockedAll: boolean;
    error: string;
    ingredients: IIngredient[];
}

export interface IBaseModalState {
    number: number | null;
    name: string | null;
}

export interface IModalState extends IBaseModalState {
    status: string;
    details: string;
}

export type TUpdatedToken = Pick<IUserState, 'accessToken'>;

export type TUserSuccess = Pick<IUserState, 'success' | 'user' | 'accessToken' | 'refreshToken'>;

export type TUserError = Pick<IUserState, 'success' | 'error'>;

export interface IPasswordState {
    type: 'email' | 'password' | 'text' | undefined;
    value: string;
    icon: 'ShowIcon' | 'HideIcon';
}

export interface IExit {
    token: string;
}
