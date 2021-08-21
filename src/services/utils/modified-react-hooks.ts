import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import {TDispatch} from '../../index';
import {TRootState} from '../reducers/index';
  
export const useDispatch = () => dispatchHook<TDispatch>();
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
