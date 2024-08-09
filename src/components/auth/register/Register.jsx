import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import axios from 'axios';
import './Register.css';
import ClientSignupPage from './ClientSignupPage';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [activeTab, setActiveTab] = useState('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onClose = () => {
        navigate('/login'); // Redirect to /login
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'client':
                return <div className="client-tab-content">{/* Insert Client Sign-Up Component Here */}</div>;
            case 'corporate':
                return <div className="corporate-tab-content">{<ClientSignupPage />}</div>;
            case 'courier':
                return <div className="courier-tab-content">{/* Insert Courier Sign-Up Component Here */}</div>;
            default:
                return null;
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace />;
    }

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
