// Ejemplo de uso
import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth-context';

export function Profile() {
    const { user, getCompleteUser } = useAuth();

    const loadCompleteUser = async () => {
        const completeUser = await getCompleteUser();
        console.log('Usuario completo:', completeUser);
    };

    useEffect(() => {
        if (user?.id) {
            loadCompleteUser();
        }
    }, [user?.id]);

    return (
        <div>
            <p>Nombre: {user?.name}</p>
            <p>Email: {user?.email}</p>
        </div>
    );
}