import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5432/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isLoginPage = window.location.pathname === '/login';
        const isRegisterPage = window.location.pathname === '/register';

        if (error.response?.status === 401 && !originalRequest._retry && !isLoginPage && !isRegisterPage) {
            originalRequest._retry = true;

            localStorage.clear();
            delete api.defaults.headers.common['Authorization'];

            window.location.href = '/login';

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);