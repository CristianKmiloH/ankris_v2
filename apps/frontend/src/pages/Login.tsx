import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/useTranslation';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await loginUser(email, password);
            login(data.token);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 9999,
            backgroundColor: 'var(--bg-primary)'
        }}>
            <div className="auth-card" style={{
                width: '90%',
                maxWidth: '400px',
                maxHeight: '90vh',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div className="auth-logo" style={{ marginBottom: '16px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0' }}>Ankris</h1>
                    <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Modern Learning, Supercharged</p>
                </div>

                <h2 className="auth-title" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Welcome Back</h2>

                {error && (
                    <div className="message-box message-error slide-in" style={{ padding: '10px' }}>
                        <svg className="message-icon" style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ fontSize: '0.9rem' }}>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form" style={{ gap: '16px' }}>
                    <div className="input-group">
                        <label className="input-label" style={{ fontSize: '0.85rem' }}>{t('email')}</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            style={{ padding: '12px 16px', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>



                    <div className="input-group">
                        <label className="input-label" style={{ fontSize: '0.85rem' }}>{t('password')}</label>
                        <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                style={{ padding: '12px 40px 12px 16px', fontSize: '1rem', width: '100%', boxSizing: 'border-box', appearance: 'none' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0px', // Strict right alignment
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0 12px', // Horizontal padding to expand touch area inwards
                                    height: '100%', // Full height to center vertically nicely
                                    width: '40px', // Fixed width area
                                    zIndex: 10
                                }}
                            >
                                {showPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading}
                        style={{ marginTop: '10px' }}
                    >
                        {isLoading ? <span className="loading">⏳</span> : t('login')}
                    </button>
                </form>

                <div className="auth-footer" style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '0.9rem' }}>
                        {t('dontHaveAccount')}{' '}
                        <Link to="/register">{t('createAccount')}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
