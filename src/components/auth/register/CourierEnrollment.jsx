import React, { useState } from 'react';
import axios from 'axios';
import './CourierEnrollment.css'; // Ensure your CSS is imported

const countryData = [
    { name: 'Kenya', code: '+254' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Canada', code: '+1' },
    { name: 'Australia', code: '+61' },
    // Add more countries here
];

// Function to generate a random alphanumeric string
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
    const [error, setError] = useState('');

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
                phone_number: selectedCountry.code // Automatically sets the area code
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = courierType === 'corporate' ? 'corporate_courier' : 'individual_courier';

        // Build the complete data object with all necessary fields
        const dataToSend = {
            ...formData,
            role,
            user_status: 'pending',
            firebase_uid: generateRandomUID(16), // Generate a random alphanumeric UID
            gps_location: null,
            profile_photo_url: '',
            account_balance: 0.0
        };

        try {
            const response = await axios.post('https://sendit-server-j68q.onrender.com/users', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert('Courier enrolled successfully!');
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
            } else {
                console.error('Error response:', response);
                setError(`Error enrolling courier: ${response.data}`);
            }
        } catch (error) {
            console.error('Catch error:', error); // Log the caught error
            setError(`Error enrolling courier: ${error.message}`);
        }
    };

    return (
        <div className="courier-enrollment-page">
            <div className="courier-enrollment-card">
                <img
                    src="src/assets/Black-logo.png"
                    alt="Company Logo"
                    className="signup-logo"
                />
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
                    <input
                        className="courier-enrollment-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
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
                    <input
                        className="courier-enrollment-input"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
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

                    <button type="submit" className="courier-enrollment-button">
                        Enroll
                    </button>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CourierEnrollment;
