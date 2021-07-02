import {reducer} from './user';

const initialState = {
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

describe('user reducer tests', () => {
    test('should return the initial state', () => expect(reducer(undefined, {})).toEqual(initialState));

    test('should handle user/setUserRequest', () => expect(reducer(initialState, {
        type: 'user/setUserRequest',
        isBlocked: true,
        isExit: false
    })).toEqual({
        success: false,
        user: {
            email: '',
            name: ''
        },
        accessToken: '',
        refreshToken: '',
        error: '',
        isBlocked: true,
        isExit: false
    }));

    test('should handle user/setUserError', () => expect(reducer(initialState, {
        type: 'user/setUserError',
        payload: {
            success: false
        }
    })).toEqual({
        success: false,
        error: {
            success: false
        },
        user: {
            email: '',
            name: ''
        },
        accessToken: '',
        refreshToken: '',
        isBlocked: false,
        isExit: false
    }));

    test('should handle user/setUserSuccess', () => expect(reducer(initialState, {
        type: 'user/setUserSuccess',
        payload: {
            success: true,
            user: {
                name: 'test',
                email: 'test'
            },
            accessToken: 'asdasdasd',
            refreshToken: '13212asddasd',
            error: '',
            isBlocked: false,
            isExit: false
        }
    })).toEqual({
        success: true,
            user: {
                name: 'test',
                email: 'test'
            },
            accessToken: 'asdasdasd',
            refreshToken: '13212asddasd',
            error: '',
            isBlocked: false,
            isExit: false
    }));

    test('should handle user/setUserClear', () => expect(reducer(initialState, {
        type: 'user/setUserClear'
    })).toEqual({
        success: true,
        user: {
            name: '',
            email: ''
        },
        accessToken: '',
        refreshToken: '',
        error: '',
        isBlocked: false,
        isExit: true
    }));

    test('should handle user/setUpdatedTokens', () => expect(reducer(initialState, {
        type: 'user/setUpdatedTokens',
        payload: {
            accessToken: 'test'
        }
    })).toEqual({
        success: false,
        user: {
            email: '',
            name: ''
        },
        accessToken: 'test',
        refreshToken: '',
        error: '',
        isBlocked: false,
        isExit: false
    }));
});
