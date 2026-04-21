// pages/Home.tsx
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useTokenTimer } from "../../hooks/useTokenTimer";

export function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { timeLeft, formatTime } = useTokenTimer(900); 

    const handleLogout = async () => {
        if (user?.id) {
            await logout(user.id);
            navigate('/');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center mb-4">
                        <h1>🏠 Mi Aplicación</h1>
                        <p className="lead">Bienvenido a tu plataforma de autenticación</p>
                    </div>

                    {user ? (
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">👤 Panel de Usuario</h5>
                                <button 
                                    onClick={handleLogout} 
                                    className="btn btn-danger btn-sm"
                                >
                                    🚪 Cerrar sesión
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="alert alert-warning text-center">
                                    <strong>⏱️ Token expira en:</strong> {formatTime(timeLeft)}
                                    {timeLeft <= 10 && timeLeft > 0 && (
                                        <div className="text-danger mt-1">
                                            ⚠️ ¡Sesión a punto de expirar!
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>📛 Nombre:</strong> {user.name}</p>
                                        <p><strong>📧 Email:</strong> {user.email}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>🎭 Rol:</strong>
                                            <span className={`badge ${user.rol === 'ADMIN' ? 'bg-danger' : 'bg-secondary'
                                                } ms-2`}>
                                                {user.rol}
                                            </span>
                                        </p>
                                        <p><strong>🆔 ID:</strong> {user.id.substring(0, 8)}...</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="text-center">
                                    <a href="/profile" className="btn btn-primary">Ir a mi perfil</a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card shadow">
                            <div className="card-header bg-secondary text-white">
                                <h5 className="mb-0">🌍 Modo Visitante</h5>
                            </div>
                            <div className="card-body text-center">
                                <p className="fs-1">👋</p>
                                <h4>Bienvenido, visitante</h4>
                                <p className="text-muted">
                                    Actualmente estás navegando sin una sesión activa.
                                </p>
                                <p>Para acceder a contenido exclusivo, inicia sesión o regístrate:</p>
                                <div className="mt-4">
                                    <a href="/login" className="btn btn-primary btn-lg me-3">
                                        🔐 Iniciar sesión
                                    </a>
                                    <a href="/register" className="btn btn-outline-secondary btn-lg">
                                        📝 Registrarse
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}