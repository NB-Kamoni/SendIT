import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeMessage from '../home/WelcomeMessage';
import { Grid, Header, Segment } from 'semantic-ui-react';

import './UserDashboard.css';
import TrackingTool from '../tracking/TrackinTool';
import TypingEffect from '../TypingEffect';
import SummaryMenu from './SummaryMenu';

const UserDashboard = () => {
    const { userRole } = useAuth();

    const renderContent = () => {
        switch (userRole) {
            case 'client':
                return (
                    <div className="content">
                        <div className="summary-container">
                            <div className="grid-item">
                                <TrackingTool />
                                <TypingEffect 
                                    style={{ color: 'red' }}
                                    texts={[
                                        "Track Your Package with Ease", 
                                        "Get Live Location Updates", 
                                        "Choose Your Preferred Courier", 
                                        "Receive a Free Quote Instantly", 
                                        "Reliable Support at Your Fingertips"
                                    ]}
                                    speed={100} 
                                    pause={1000} 
                                />
                            </div>
                            <div className="grid-item">
                                <SummaryMenu />
                            </div>
                        </div>
                    </div>
                );
            case 'courier':
                return (
                    <div className="content">
                        {/* Add courier-specific components here */}
                    </div>
                );
            case 'admin':
                return (
                    <div className="content">
                        {/* Add admin-specific components here */}
                    </div>
                );
            default:
                return (
                    <div>
                        <h2 style={{ color: '#4169E1' }}>User Dashboard</h2>
                        <p style={{ color: '#4169E1' }}>Please log in to view dashboard details.</p>
                    </div>
                );
        }
    };

    return (
        <div className="user-dashboard">
            <div className="content-card">
                <Sidebar />
                {renderContent()}
            </div>
        </div>
    );
};

export default UserDashboard;
