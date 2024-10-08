import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const { userLoggedIn, setUserRole } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchUserRole = async (firebase_uid) => {
        try {
            const response = await fetch(`https://sendit-server-j68q.onrender.com/users/role/${firebase_uid}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user role');
            }
            const data = await response.json();
            return data.role;
        } catch (error) {
            console.error('Error fetching user role:', error);
            setErrorMessage('Failed to retrieve user role');
        }
    };

    const saveNewUser = async (firebase_uid, email) => {
        try {
            const response = await fetch('https://sendit-server-j68q.onrender.com/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firebase_uid, email, role: 'client' }),
            });

            if (!response.ok) {
                throw new Error('Failed to save new user');
            }
        } catch (error) {
            console.error('Error saving new user:', error);
            setErrorMessage('Failed to save user information');
        }
    };

    const handleLoginSuccess = async (userCredential) => {
        try {
            const firebaseUid = userCredential.user.uid;
            const token = await userCredential.user.getIdToken();
            console.log('Firebase ID Token:', token);

            let userRole = await fetchUserRole(firebaseUid);

            if (!userRole) {
                // If userRole is not found, save new user as 'client'
                await saveNewUser(firebaseUid, userCredential.user.email);
                userRole = 'client';
            }

            setUserRole(userRole);
            localStorage.setItem('userRole', userRole); // Store user role in localStorage
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Failed to complete login process');
        } finally {
            setIsSigningIn(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                const userCredential = await doSignInWithEmailAndPassword(email, password);
                await handleLoginSuccess(userCredential);
            } catch (err) {
                setErrorMessage('Invalid email or password');
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                const result = await doSignInWithGoogle();
                await handleLoginSuccess(result);
            } catch (err) {
                setErrorMessage('Google sign-in failed');
                setIsSigningIn(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/user-dashboard" replace />;
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div>
                    <img src="https://res.cloudinary.com/dan7dm7kx/image/upload/v1724591446/Black-logo_pb4qel.png" alt="Global Learn Logo" className="login-header-img" />
                </div>
                <form onSubmit={onSubmit} className="login-form">
                    <div className="login-field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="login-input"
                        />
                    </div>
                    <div className="login-field">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="login-input"
                        />
                    </div>
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`login-button ${isSigningIn ? 'disabled' : ''}`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <div className="register-link">
                    Don't have an account?{' '}
                    <Link to="/register" className="sign-up-link">
                        Sign up
                    </Link>
                </div>
                <div className="login-divider">
                    <div className="divider-line"></div>
                    <span>OR</span>
                    <div className="divider-line"></div>
                </div>
                <button
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                    className={`google-sign-in ${isSigningIn ? 'disabled' : ''}`}
                >
                    <svg
                        className="google-icon"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0)">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.0051 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </div>
        </div>
    );
};

export default Login;
