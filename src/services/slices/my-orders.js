import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    orders: []
};

const slice = createSlice({
    name: 'my-orders',
    initialState: initialState,
    reducers: {
        setOrders(state, action) {
            state.orders = action.payload.orders;
        },
        clearOrders(state) {
            state.orders = [];
        }
    }
});

export const {reducer, actions} = slice;
