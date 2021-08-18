import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    number: null,
    name: null,
    status: '',
    details: ''
};

const slice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setStartInfo(state) {
            state.number = null;
            state.name = 'Заказ принят';
            state.status = 'Ваш заказ начали готовить';
            state.details = 'Дождитесь готовности на орбитальной станции';
        },
        setEndInfo(state, action) {
            state.number = action.payload.number;
            state.name = action.payload.name;
            state.status = 'Заказ готов';
            state.details = 'Приятного аппетита';
        }
    }
});

export const {reducer, actions} = slice;
