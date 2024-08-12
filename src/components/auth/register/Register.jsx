import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import axios from 'axios';
import './Register.css';
import ClientSignupPage from './ClientSignupPage';
import CourierEnrollment from './CourierEnrollment';

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
        navigate('/'); 
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'sender':
                return <div className="client-tab-content">{<ClientSignupPage />}</div>;
            case 'receiver':
                return <div className="corporate-tab-content">{<ClientSignupPage />}</div>;
            case 'courier':
                return <div className="courier-tab-content">{<CourierEnrollment />}</div>;
            default:
                return <div className="corporate-tab-content">{<ClientSignupPage />}</div>;
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/user-dashboard" replace />;
    }

    return (
        <div className="overlay">
            <div className="card">
                {/* Close Button */}
                <div className="close-button" onClick={onClose}>&times;</div>
                <div className="card-header">
                    <div
                        className={`card-tab ${activeTab === 'sender' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sender')}
                    >
                        Sender
                    </div>
                    <div
                        className={`card-tab ${activeTab === 'receiver' ? 'active' : ''}`}
                        onClick={() => setActiveTab('receiver')}
                    >
                        Receiver
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
                    
                </div>
            </div>
        </div>
    );
};

export default Register;
