import {createSlice} from '@reduxjs/toolkit';

import {IOrderTape} from '../../interfaces';
import {ISliceAction} from '../actions/index';

const initialState: IOrderTape = {
    orders: [],
    total: 0,
    totalToday: 0
};

const slice = createSlice({
    name: 'order-tape',
    initialState: initialState,
    reducers: {
        setOrders(state, action: ISliceAction<IOrderTape>) {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        clearOrders(state) {
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        }
    }
});

export const {reducer, actions} = slice;
