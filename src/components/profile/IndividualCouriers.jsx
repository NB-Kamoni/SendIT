import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const IndividualCourier = () => {
    const { userRole } = useAuth();

    const renderContent = () => {
        switch (userRole) {
            case 'client':
                return (
                    <div>
                        <h2 style={{ color: '#4169E1' }}>client Exams Dashboard</h2>
                        <p style={{ color: '#4169E1' }}>View your upcoming exams, past exam results, and study materials.</p>
                        {/* Add client-specific exam content here */}



                    </div>
                );
            case 'courier':
                return (
                    <div>
                        <h2 style={{ color: '#4169E1' }}>courier Exams Dashboard</h2>
                        <p style={{ color: '#4169E1' }}>Create exams, manage exam schedules, and review client submissions.</p>
                        {/* Add courier-specific exam content here */}





                    </div>
                );
            case 'admin':
                return (
                    <div>
                        <h2 style={{ color: '#4169E1' }}>Admin Exams Dashboard</h2>
                        <p style={{ color: '#4169E1' }}>Oversee exam policies, monitor exam conduct, and generate exam reports.</p>
                        {/* Add admin-specific exam content here */}





                    </div>
                );
            default:
                return (
                    <div>
                        <h2 style={{ color: '#4169E1' }}>Exams Dashboard</h2>
                        <p style={{ color: '#4169E1' }}>Please log in to view exam details.</p>
                        {/* We don't need general content */}
                    </div>
                );
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content-card">
                {renderContent()}
            </div>
        </div>
    );
};

export default IndividualCourier;