import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import './register.css';

function RegisterAux() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const { register, isLoading, error, clearError } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        } else if (name.trim().length < 3) {
            setNameError('Name must be at least 3 characters');
            isValid = false;
        } else {
            setNameError('');
        }

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

        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) {
            return;
        }
        await register(name, email, password);
        navigate('/');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (nameError) setNameError('');
        if (error) clearError();
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (emailError) setEmailError('');
        if (error) clearError();
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError('');
        if (confirmPasswordError && password === confirmPassword) {
            setConfirmPasswordError('');
        }
        if (error) clearError();
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (confirmPasswordError) setConfirmPasswordError('');
        if (error) clearError();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <div className="register-icon">
                            <div className="register-icon-inner">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                        </div>
                        <h2>Create Account</h2>
                        <p>Sign up to get started</p>
                    </div>

                    {error && (
                        <div className="register-backend-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className={`register-form-group ${nameError ? 'error' : ''}`}>
                            <div className="register-input-group">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    disabled={isLoading}
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />
                                <div className="register-input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                            </div>
                            <span className={`register-error-message ${nameError ? 'show' : ''}`}>
                                {nameError}
                            </span>
                        </div>

                        <div className={`register-form-group ${emailError ? 'error' : ''}`}>
                            <div className="register-input-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    disabled={isLoading}
                                    required
                                    autoComplete="email"
                                    placeholder="Email address"
                                />
                                <div className="register-input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                            </div>
                            <span className={`register-error-message ${emailError ? 'show' : ''}`}>
                                {emailError}
                            </span>
                        </div>

                        <div className={`register-form-group ${passwordError ? 'error' : ''}`}>
                            <div className="register-input-group register-password-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    disabled={isLoading}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Password"
                                />
                                <div className="register-input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    className={`register-toggle ${showPassword ? 'show-password' : ''}`}
                                    onClick={togglePasswordVisibility}
                                    disabled={isLoading}
                                    aria-label="Toggle password visibility"
                                >
                                    <svg className="register-eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <svg className="register-eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                </button>
                            </div>
                            <span className={`register-error-message ${passwordError ? 'show' : ''}`}>
                                {passwordError}
                            </span>
                        </div>

                        <div className={`register-form-group ${confirmPasswordError ? 'error' : ''}`}>
                            <div className="register-input-group register-password-group">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    disabled={isLoading}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                />
                                <div className="register-input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    className={`register-toggle ${showConfirmPassword ? 'show-password' : ''}`}
                                    onClick={toggleConfirmPasswordVisibility}
                                    disabled={isLoading}
                                    aria-label="Toggle confirm password visibility"
                                >
                                    <svg className="register-eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <svg className="register-eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                </button>
                            </div>
                            <span className={`register-error-message ${confirmPasswordError ? 'show' : ''}`}>
                                {confirmPasswordError}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className={`register-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            <span className="register-btn-text">Sign Up</span>
                            <div className="register-btn-loader">
                                <div className="register-spinner"></div>
                            </div>
                        </button>
                    </form>

                    <div className="register-signup-link">
                        <p>Already have an account? <a href="/login">Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterAux;