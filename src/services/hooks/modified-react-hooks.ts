import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

//import {TDispatch, TState} from '../actions/index';


import {store} from '../../index';

export type TDispatch = typeof store.dispatch;

export type TState = ReturnType<typeof store.getState>;
  
export const useDispatch = () => dispatchHook<TDispatch>();
export const useSelector: TypedUseSelectorHook<TState> = selectorHook;
