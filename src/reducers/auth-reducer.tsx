
import type { AuthState } from "../interface/auth";
import type { User } from "../interface/user";

export const initialState: AuthState = {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    token: window.localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
};

export const AUTH_ACTION_TYPES = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    LOGOUT: 'LOGOUT',
    SET_USER: 'SET_USER',
    CLEAR_ERROR: 'CLEAR_ERROR',
} as const;

interface AuthAction {
    type: string;
    payload?: User | string | null;
    error?: string;
}

export const updateLocalStorage = (state: AuthState) => {
    if (state.user && state.token) {
        window.localStorage.setItem('user', JSON.stringify(state.user));
        window.localStorage.setItem('token', state.token);
    } else {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
    }
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    const { type, payload, error } = action;

    switch (type) {
        case AUTH_ACTION_TYPES.LOGIN_START:
        case AUTH_ACTION_TYPES.REGISTER_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
        case AUTH_ACTION_TYPES.REGISTER_SUCCESS: {
            const user = payload as User;
            const newState = {
                ...state,
                isLoading: false,
                user,
                token: user ? state.token : null,
                error: null,
            };
            updateLocalStorage(newState);
            return newState;
        }

        case AUTH_ACTION_TYPES.LOGIN_FAILURE:
        case AUTH_ACTION_TYPES.REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: error || 'Error de autenticación',
            };

        case AUTH_ACTION_TYPES.LOGOUT:
            const newState = {
                ...state,
                user: null,
                token: null,
                isLoading: false,
                error: null,
            };
            updateLocalStorage(newState);
            return newState;

        case AUTH_ACTION_TYPES.SET_USER:
            const setUserState = {
                ...state,
                user: payload as User | null,
            };
            updateLocalStorage(setUserState);
            return setUserState;

        case AUTH_ACTION_TYPES.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};