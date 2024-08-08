import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import axios from 'axios';
import './Register.css';

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

    const uploadProfilePhoto = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dan7dm7kx/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.secure_url; // URL of the uploaded image
        } catch (error) {
            console.error('Failed to upload image:', error);
            return '';
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            setErrorMessage('Please fill in all required fields');
            return;
        }

        setIsRegistering(true);
        try {
            const profilePhotoUrl = profilePhoto ? await uploadProfilePhoto(profilePhoto) : '';

            if (activeTab === 'client') {
                // Create user in Firebase Authentication
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/login');
            } else {
                // Handle corporate and courier registrations
                const adminEmail = 'admin@example.com'; // Replace with actual admin email
                const templateId = activeTab === 'corporate' ? 'corporate_template_id' : 'courier_template_id';
                const variables = {
                    email,
                    admin_email: adminEmail,
                    company_name: activeTab === 'corporate' ? companyName : undefined,
                    contact_person: activeTab === 'corporate' ? contactPerson : undefined,
                    profile_photo: profilePhotoUrl
                };

                await sendEmail(templateId, variables);
                navigate('/onboarding');
            }
        } catch (err) {
            setErrorMessage('Failed to create account');
            setIsRegistering(false);
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const renderContent = () => {
        const images = {
            client: 'src/assets/individual.png',
            corporate: 'src/assets/redcontainer.png',
            courier: 'src/assets/anim.png'
        };

        return (
            <div className="content-wrapper">
                <form onSubmit={onSubmit} className="register-form">
                    <div className="register-field">
                        <label>First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="register-input"
                            autoComplete="given-name"
                        />
                    </div>
                    <div className="register-field">
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="register-input"
                            autoComplete="family-name"
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
                    {activeTab === 'corporate' && (
                        <>
                            <div className="register-field">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                    className="register-input"
                                    autoComplete="organization"
                                />
                            </div>
                            <div className="register-field">
                                <label>Contact Person</label>
                                <input
                                    type="text"
                                    value={contactPerson}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    required
                                    className="register-input"
                                    autoComplete="name"
                                />
                            </div>
                        </>
                    )}
                    {activeTab === 'courier' && (
                        <>
                            <div className="register-field">
                                <label>Contact Person</label>
                                <input
                                    type="text"
                                    value={contactPerson}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    required
                                    className="register-input"
                                    autoComplete="name"
                                />
                            </div>
                        </>
                    )}
                    <div className="register-field">
                        <label>Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePhoto(e.target.files[0])}
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
                <div className="image-container">
                    <img src={images[activeTab]} alt={`${activeTab} illustration`} className="tab-image" />
                </div>
            </div>
        );
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
