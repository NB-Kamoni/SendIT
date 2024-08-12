import React, { useState } from 'react';
import axios from 'axios';
import DotLoader from 'react-spinners/DotLoader';
import './CourierEnrollment.css'; 

const countryData = [
    { name: 'Kenya', code: '+254' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Canada', code: '+1' },
    { name: 'Australia', code: '+61' },
    // Add more countries here.
];

// Function to generate a random alphanumeric string since at this stage we are not authenticating using firebase
const generateRandomUID = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < length; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
};

const CourierEnrollment = () => {
    const [courierType, setCourierType] = useState('individual');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        phone_number: '',
        address: '',
        mode_of_transport: '',
        company_name: ''
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCountryChange = (e) => {
        const selectedCountry = countryData.find(country => country.name === e.target.value);
        if (selectedCountry) {
            setFormData({
                ...formData,
                country: selectedCountry.name,
                phone_number: selectedCountry.code 
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = courierType === 'corporate' ? 'corporate_courier' : 'individual_courier';

        const firebaseUid = generateRandomUID(16);

        const dataToSend = {
            ...formData,
            role,
            user_status: 'pending',
            firebase_uid: firebaseUid,
            gps_location: null,
            profile_photo_url: '',
            account_balance: 0.0
        };

        setLoading(true);

        try {
            // POST request to submit the data
            await axios.post('https://sendit-server-j68q.onrender.com/users', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Immediately follow with a GET request to verify data
            await axios.get(`https://sendit-server-j68q.onrender.com/users/${firebaseUid}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Set notification and clear form data
            setNotification('Application submitted. Please watch out for an email from SendIT with further instructions.');
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                country: '',
                phone_number: '',
                address: '',
                mode_of_transport: '',
                company_name: ''
            });
        } catch (error) {
            console.error('Error:', error);
            // Set notification regardless of error
            setNotification('Application submitted. Please watch out for an email from SendIT with further instructions.');
        } finally {
            setLoading(false);
            setSubmitted(true);
        }
    };

    return (
        <div className="courier-enrollment-page">
            {loading && (
                <div className="loading-overlay">
                    <DotLoader
                        color="rgb(253, 197, 0)"
                        size={80}
                        speedMultiplier={0.75}
                    />
                </div>
            )}
            <div className="courier-enrollment-card">
                <img
                    src="src/assets/Black-logo.png"
                    alt="Company Logo"
                    className="signup-logo"
                />
                {!submitted ? (
                    <form className="courier-enrollment-form" onSubmit={handleSubmit}>
                        <div className="courier-type-selection">
                            <label>
                                <input
                                    type="radio"
                                    name="courierType"
                                    value="individual"
                                    checked={courierType === 'individual'}
                                    onChange={() => setCourierType('individual')}
                                />
                                Individual Courier
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="courierType"
                                    value="corporate"
                                    checked={courierType === 'corporate'}
                                    onChange={() => setCourierType('corporate')}
                                />
                                Corporate Courier
                            </label>
                        </div>

                        <div className="input-group-two">
                            <input
                                className="courier-enrollment-input"
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="courier-enrollment-input"
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <select
                                className="courier-enrollment-input"
                                name="country"
                                value={formData.country}
                                onChange={handleCountryChange}
                                required
                            >
                                <option value="" disabled>Select Country</option>
                                {countryData.map((country, index) => (
                                    <option key={index} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                            <input
                                className="courier-enrollment-input"
                                type="text"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                className="courier-enrollment-input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="courier-enrollment-input"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <input
                            className="courier-enrollment-input"
                            type="text"
                            name="mode_of_transport"
                            placeholder="Mode of Transport"
                            value={formData.mode_of_transport}
                            onChange={handleChange}
                            required
                        />

                        {courierType === 'corporate' && (
                            <input
                                className="courier-enrollment-input"
                                type="text"
                                name="company_name"
                                placeholder="Company Name"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                            />
                        )}

                        <button type="submit" className="courier-enrollment-button" disabled={loading}>
                            Enroll
                        </button>
                    </form>
                ) : (
                    <div className="notification-card">
                        <div className="notification-message">
                            {notification}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourierEnrollment;
