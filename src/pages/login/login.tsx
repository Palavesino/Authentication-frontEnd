import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Usuarios de prueba
  const testUsers = [
    { email: 'usuario2@gmail.com', password: '123456', rol: 'USER' },
    { email: 'Admin1@gmail.com', password: '123456', rol: 'ADMIN' }
  ];

  const handleTestUserClick = (testUser: { email: string; password: string }) => {
    setEmail(testUser.email);
    setPassword(testUser.password);
    setEmailError('');
    setPasswordError('');
    if (error) clearError();
  };

  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
    if (error) clearError();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
    if (error) clearError();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="neu-icon">
                <div className="icon-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <h2>Welcome back</h2>
              <p>Please sign in to continue</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className={`form-group ${emailError ? 'error' : ''}`}>
                <div className="input-group neu-input">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isLoading}
                    required
                    autoComplete="email"
                    placeholder=" "
                  />
                  <label htmlFor="email">Email address</label>
                  <div className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                </div>
                <span className={`error-message ${emailError ? 'show' : ''}`} id="emailError">
                  {emailError}
                </span>
              </div>

              <div className={`form-group ${passwordError ? 'error' : ''}`}>
                <div className="input-group neu-input password-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    required
                    autoComplete="current-password"
                    placeholder=" "
                  />
                  <label htmlFor="password">Password</label>
                  <div className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className={`password-toggle neu-toggle ${showPassword ? 'show-password' : ''}`}
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                    aria-label="Toggle password visibility"
                  >
                    <svg className="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg className="eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
                <span className={`error-message ${passwordError ? 'show' : ''}`} id="passwordError">
                  {passwordError}
                </span>
              </div>

              {error && (
                <div className="login-backend-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={`neu-button login-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                <span className="btn-text">Sign In</span>
                <div className="btn-loader">
                  <div className="neu-spinner"></div>
                </div>
              </button>
            </form>

            <div className="signup-link">
              <p>Don't have an account? <a href="/register">Sign up</a></p>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios de prueba */}
        <div className="test-users-card">
          <h3 className="test-users-title">Test Users</h3>
          <p className="test-users-subtitle">Click on any user to auto-fill credentials</p>
          <table className="test-users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
                <th>Rol</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {testUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <span className={`role-badge ${user.rol === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td>
                    <button
                      className="test-user-btn"
                      onClick={() => handleTestUserClick(user)}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Use
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="test-users-note">Note: These are test credentials for development purposes</p>
        </div>
      </div>
    </div>
  );
}

export default Login;