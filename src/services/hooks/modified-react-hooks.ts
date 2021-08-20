import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import {TDispatch, TState} from '../actions/index';
  
export const useDispatch = () => dispatchHook<TDispatch>();
export const useSelector: TypedUseSelectorHook<TState> = selectorHook;
