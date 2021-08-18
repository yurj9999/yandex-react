import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0
};

const slice = createSlice({
    name: 'order-tape',
    initialState: initialState,
    reducers: {
        setOrders(state, action) {
            state.orders = JSON.parse(action.payload).orders;
            state.total = JSON.parse(action.payload).total;
            state.totalToday = JSON.parse(action.payload).totalToday;
        },
        clearOrders(state) {
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        }
    }
});

export const {reducer, actions} = slice;
