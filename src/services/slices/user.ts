import {createSlice} from '@reduxjs/toolkit';

import {
    IUserState,
    TUpdatedToken,
    TUserSuccess,
    TUserError
} from '../../interfaces';

import {ISliceAction} from '../actions/index';

const userInitialState: IUserState = {
    success: false,
    user: {
        email: '',
        name: ''
    },
    accessToken: '',
    refreshToken: '',
    error: '',
    isBlocked: false,
    isExit: false
};

const slice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUserRequest(state) {
            state.isBlocked = true;
            state.isExit = false;
        },
        setUserError(state, action: ISliceAction<TUserError>) {
            state.success = action.payload.success;
            state.error = action.payload.error;
            state.user.email = '';
            state.user.name = '';
            state.accessToken = '';
            state.refreshToken = '';
            state.isBlocked = false;
            state.isExit = false;
        },
        setUserSuccess(state, action: ISliceAction<TUserSuccess>) {
            state.success = action.payload.success;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = '';
            state.isBlocked = false;
            state.isExit = false;
        },
        setUserClear(state) {
            state.success = true;
            state.user.email = '';
            state.user.name = '';
            state.accessToken = '';
            state.refreshToken = '';
            state.error = '';
            state.isBlocked = false;
            state.isExit = true;
        },
        setUpdatedTokens(state, action: ISliceAction<TUpdatedToken>) {
            state.accessToken = action.payload.accessToken;
        }
    }
});

export const {reducer, actions} = slice;
