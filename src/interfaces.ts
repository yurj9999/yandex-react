import {Location} from 'history';



export interface ILocationState {
    modal?: Location;
}

export interface IUserLogin {
    name: string;
    email: string;
}

export interface IUserData extends IUserLogin {
    password: string;
}

interface IOrderItem {
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





export interface IMyOrdersInitialState {
    orders: IOrderItem[];
}

export interface IOrderTape extends IMyOrdersInitialState {
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