import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const IndividualCourierSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const auth = getAuth();

    const saveUserData = async (userData) => {
        const token = await auth.currentUser.getIdToken();

        const response = await fetch('https://your-flask-app.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsSubmitting(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUid = userCredential.user.uid;

            const userData = {
                email,
                firebase_uid: firebaseUid,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                address,
                profile_photo_url: profilePhotoUrl,
                role: 'individual_courier',  // Automatically allocate 'individual_courier' role
            };

            const savedUser = await saveUserData(userData);
            console.log('User saved:', savedUser);

            navigate('/login');
        } catch (err) {
            console.error('Error creating user:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already in use');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email format');
            } else if (err.code === 'auth/weak-password') {
                setError('Password is too weak');
            } else {
                setError('Failed to create account');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-page">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Individual Courier Signup</h2>
                <div className="signup-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="signup-field">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="signup-field">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="signup-field">
                    <label>Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>
                <div className="signup-field">
                    <label>Profile Photo URL</label>
                    <input
                        type="text"
                        value={profilePhotoUrl}
                        onChange={(e) => setProfilePhotoUrl(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default IndividualCourierSignup;
