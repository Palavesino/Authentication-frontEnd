// hooks/useTokenTimer.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth-context';
import { useNavigate} from 'react-router-dom';

export function useTokenTimer(expiresInSeconds: number = 60) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState<number>(() => {
        // Recuperar tiempo guardado en localStorage
        const savedTime = localStorage.getItem('token_time_left');
        if (savedTime && user) {
            return parseInt(savedTime);
        }
        return expiresInSeconds;
    });

    useEffect(() => {
        if (!user) return;

        // Guardar tiempo actual en localStorage
        localStorage.setItem('token_time_left', timeLeft.toString());

        if (timeLeft <= 0) {
            const autoLogout = async () => {
                if (user?.id) {
                    await logout(user.id);
                    localStorage.removeItem('token_time_left');
                    navigate('/');
                    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                }
            };
            autoLogout();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, user, logout, navigate]);

    // Limpiar cuando el usuario se desloguea
    useEffect(() => {
        if (!user) {
            localStorage.removeItem('token_time_left');
        }
    }, [user]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return { timeLeft, formatTime };
}