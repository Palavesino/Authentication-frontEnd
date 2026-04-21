// pages/register/register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setPasswordError('');

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

      await register(name, email, password);
      navigate('/'); 
    
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Registro</h3>

        {(error || passwordError) && (
          <div className="alert alert-danger">{error || passwordError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">
            ¿Ya tenés cuenta? Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;