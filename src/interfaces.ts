import {Location} from 'history';











//import {} from './services/actions/index';


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

export interface IMyOrdersInitialState {
    orders: ;
}

export type TInitialStateMiddleware = 
