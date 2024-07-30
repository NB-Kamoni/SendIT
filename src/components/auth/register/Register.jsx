import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/dashboard');
            } catch (err) {
                setErrorMessage('Failed to create account');
                setIsRegistering(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-header">Welcome to Global Learn</h2>
                <form onSubmit={onSubmit} className="register-form">
                    <div className="register-field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                            autoComplete="email"
                        />
                    </div>
                    <div className="register-field">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="register-field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="register-input"
                            autoComplete="off"
                        />
                    </div>
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`register-button ${
                            isRegistering ? 'disabled' : ''
                        }`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <div className="login-link">
                        Already have an account?{' '}
                        <Link to="/login" className="login-link-text">
                            Continue
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;