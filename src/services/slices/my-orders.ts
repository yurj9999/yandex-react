import {createSlice} from '@reduxjs/toolkit';

import {IMyOrdersState} from '../../interfaces';
import {ISliceAction} from '../actions/index';

const initialState: IMyOrdersState = {
    orders: []
};

const slice = createSlice({
    name: 'my-orders',
    initialState: initialState,
    reducers: {
        setOrders(state, action: ISliceAction<IMyOrdersState>) {
            state.orders = action.payload.orders;
        },
        clearOrders(state) {
            state.orders = [];
        }
    }
});

export const {reducer, actions} = slice;
