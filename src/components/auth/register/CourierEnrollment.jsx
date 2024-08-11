import React, { useState } from 'react';
import './CourierEnrollment.css'; // Ensure your CSS is imported

const countryData = [
    { name: 'Kenya', code: '+254' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Canada', code: '+1' },
    { name: 'Australia', code: '+61' },
    // Add more countries here
];

const CourierEnrollment = () => {
    const [courierType, setCourierType] = useState('individual');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phoneNumber: '',
        address: '',
        modeOfTransport: '',
        companyName: ''
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
                phoneNumber: selectedCountry.code // Automatically sets the area code
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = courierType === 'corporate' ? 'corporate_courier' : 'individual_courier';

        const dataToSend = {
            ...formData,
            role,
            user_status: 'pending'
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                alert('Courier enrolled successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    country: '',
                    phoneNumber: '',
                    address: '',
                    modeOfTransport: '',
                    companyName: ''
                });
            } else {
                const errorText = await response.text();
                setError(`Error enrolling courier: ${errorText}`);
            }
        } catch (error) {
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
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="courier-enrollment-input"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
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
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
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
                        name="modeOfTransport"
                        placeholder="Mode of Transport"
                        value={formData.modeOfTransport}
                        onChange={handleChange}
                        required
                    />

                    {courierType === 'corporate' && (
                        <input
                            className="courier-enrollment-input"
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
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
