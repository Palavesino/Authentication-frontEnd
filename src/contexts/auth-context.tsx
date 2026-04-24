import React, { useContext, createContext, type ReactNode, useReducer } from 'react';
import { authReducer, initialState, AUTH_ACTION_TYPES } from '../reducers/auth-reducer';
import { api } from '../services/api';
import type { User, UserComplete } from '../interface/user';

interface AuthContextProps {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    users: User[];
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: (userId: string,) => void;
    clearError: () => void;
    setUser: (user: User | UserComplete | null) => void;
    getCompleteUser: () => Promise<UserComplete | null>;
    getAllUsers: () => Promise<User[] | null>;
    updateUserRol: (userId: string, rol: string) => Promise<User | null>;
    updateUserBlocked: (userId: string, blocked: boolean) => Promise<User | null>;
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

    const login = async (email: string, password: string): Promise<boolean> => {
        dispatch({ type: AUTH_ACTION_TYPES.LOGIN_START });
        try {
            const response = await api.post('/users/login', { email, password });
            const { token, user } = response.data;

            dispatch({
                type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
                payload: user,
                token: token
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return true;
        } catch (error: any) {
            dispatch({
                type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
                error: error.response?.data?.message || 'Error al iniciar sesión'
            });
            return false;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        dispatch({ type: AUTH_ACTION_TYPES.REGISTER_START });
        try {
            await api.post('/users', { name, email, password });
            await login(email, password);
        } catch (error: any) {
            dispatch({
                type: AUTH_ACTION_TYPES.REGISTER_FAILURE,
                error: error.response?.data?.message || 'Error al registrarse'
            });
        }
    };

    const logout = async (userId: string) => {
        try {
            if (userId) {
                await api.post('/users/logout', { userId });
            }
        } finally {
            dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
            delete api.defaults.headers.common['Authorization'];
        }
    };

    const clearError = () => {
        dispatch({ type: AUTH_ACTION_TYPES.CLEAR_ERROR });
    };

    const setUser = async (user: User | UserComplete | null) => {
        try {
            if (user?.id) {
                const { id, rol, ...updateData } = user;
                await api.put(`/users/${id}`, updateData);
            }
        } catch (error: any) {
            console.error('Error al actualizar usuario:', error);
            dispatch({
                type: AUTH_ACTION_TYPES.UPDATE_FAILURE,
                error: error.response?.data?.message || 'Error al actualizar usuario'
            });
        } finally {
            dispatch({ type: AUTH_ACTION_TYPES.SET_USER, payload: user });
        }
    };

    const getCompleteUser = async (): Promise<UserComplete | null> => {
        const userId = state.user?.id;

        if (!userId) {
            return null;
        }

        try {
            const response = await api.get(`/users/${userId}`);
            const completeUser = response.data;

            dispatch({ type: AUTH_ACTION_TYPES.SET_USER, payload: completeUser });

            return completeUser;
        } catch (error: any) {
            console.error('Error obteniendo usuario completo:', error);
            return null;
        }
    };

    const getAllUsers = async (): Promise<User[] | null> => {

        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error: any) {
            console.error('Error obteniendo usuarios:', error);
            return null;
        }
    };
    const updateUserRol = async (userId: string, rol: string): Promise<User | null> => {

        try {
            const response = await api.patch(`/users/${userId}/rol`, { rol });
            const updatedUser = response.data;
            if (state.user?.id === userId) {
                dispatch({ type: AUTH_ACTION_TYPES.SET_USER, payload: updatedUser });
            }
            return updatedUser;
        } catch (error: any) {
            console.error('Error actualizando rol:', error);
            return null;
        }
    };

    const updateUserBlocked = async (userId: string, blocked: boolean): Promise<User | null> => {

        try {
            const response = await api.patch(`/users/${userId}/blocked`, { blocked });
            const updatedUser = response.data;
            if (state.user?.id === userId) {
                dispatch({ type: AUTH_ACTION_TYPES.SET_USER, payload: updatedUser });
            }
            return updatedUser;
        } catch (error: any) {
            console.error('Error actualizando estado bloqueado:', error);
            return null;
        }
    };

    return {
        state,
        login,
        register,
        logout,
        clearError,
        setUser,
        getCompleteUser,
        getAllUsers,
        updateUserBlocked,
        updateUserRol

    };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { state, login, register, logout, clearError, setUser, getCompleteUser, getAllUsers, updateUserRol, updateUserBlocked } = useAuthReducer();

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
                users: [],
                login,
                register,
                logout,
                clearError,
                setUser,
                getCompleteUser,
                getAllUsers,
                updateUserRol,
                updateUserBlocked
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};