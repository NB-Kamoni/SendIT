import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import './Register.css';

const Register = ({ onClose }) => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [activeTab, setActiveTab] = useState('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    const renderContent = () => {
        switch (activeTab) {
            case 'client':
                return (
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
                            className={`register-button ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                );
            case 'corporate':
                return (
                    <form onSubmit={onSubmit} className="register-form">
                        <div className="register-field">
                            <label>Company Name</label>
                            <input
                                type="text"
                                required
                                className="register-input"
                            />
                        </div>
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
                        <div className="register-field">
                            <label>Contact Person</label>
                            <input
                                type="text"
                                required
                                className="register-input"
                            />
                        </div>
                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`register-button ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                );
            case 'courier':
                return (
                    <form onSubmit={onSubmit} className="register-form">
                        <div className="register-field">
                            <label>Name</label>
                            <input
                                type="text"
                                required
                                className="register-input"
                            />
                        </div>
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
                        <div className="register-field">
                            <label>Vehicle Type</label>
                            <input
                                type="text"
                                required
                                className="register-input"
                            />
                        </div>
                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`register-button ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                );
            default:
                return <div className="card-content">Default Content</div>;
        }
    };

    return (
        <div className="overlay">
            <div className="card">
                {/* Close Button */}
                <div className="close-button" onClick={onClose}>&times;</div>
                <div className="card-header">
                    <div
                        className={`card-tab ${activeTab === 'client' ? 'active' : ''}`}
                        onClick={() => setActiveTab('client')}
                    >
                        Client
                    </div>
                    <div
                        className={`card-tab ${activeTab === 'corporate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('corporate')}
                    >
                        Corporate
                    </div>
                    <div
                        className={`card-tab ${activeTab === 'courier' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courier')}
                    >
                        Courier
                    </div>
                </div>
                <div className="card-body">
                    {renderContent()}
                    <div className="login-link">
                        Already have an account?{' '}
                        <Link to="/login" className="login-link-text">
                            Continue
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
