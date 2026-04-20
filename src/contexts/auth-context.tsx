import React, { useContext, createContext, type ReactNode, useReducer } from 'react';
import { authReducer, initialState, AUTH_ACTION_TYPES } from '../reducers/auth-reducer';
import { api } from '../services/api';
import type { User } from '../interface/user';

interface AuthContextProps {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Hook personalizado para usar el reducer
function useAuthReducer() {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (email: string, password: string) => {
        dispatch({ type: AUTH_ACTION_TYPES.LOGIN_START });
        try {
            const response = await api.post('/users/login', { email, password });
            const { token, user } = response.data;

            dispatch({
                type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
                payload: user
            });

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        } catch (error: any) {
            dispatch({
                type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
                error: error.response?.data?.message || 'Error al iniciar sesión'
            });
        }
    };

    const register = async (name: string, email: string, password: string) => {
        dispatch({ type: AUTH_ACTION_TYPES.REGISTER_START });
        try {
            await api.post('/users/register', { name, email, password });
            await login(email, password);
        } catch (error: any) {
            dispatch({
                type: AUTH_ACTION_TYPES.REGISTER_FAILURE,
                error: error.response?.data?.message || 'Error al registrarse'
            });
        }
    };

    const logout = () => {
        dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
        delete api.defaults.headers.common['Authorization'];
    };

    const clearError = () => {
        dispatch({ type: AUTH_ACTION_TYPES.CLEAR_ERROR });
    };

    const setUser = (user: User | null) => {
        dispatch({ type: AUTH_ACTION_TYPES.SET_USER, payload: user });
    };

    return { state, login, register, logout, clearError, setUser };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { state, login, register, logout, clearError, setUser } = useAuthReducer();

    if (state.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isLoading: state.isLoading,
                error: state.error,
                login,
                register,
                logout,
                clearError,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};