import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeMessage from '../home/WelcomeMessage';
import { Grid, Header, Segment } from 'semantic-ui-react';

import './UserDashboard.css';
import TrackingTool from '../tracking/TrackinTool';
import TypingEffect from '../TypingEffect';
import SummaryMenu from './SummaryMenu';
import MapComponent from '../maps/MapComponent';
import UpdateParcel from '../update-parcel/UpdateParcel';
import ParcelList from '../admin-view/ParcelList';

const UserDashboard = () => {
    const { userRole } = useAuth();

    const renderContent = () => {
        switch (userRole) {
            case 'client':
                return (
                    
                                <MapComponent />
                       
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
                        <ParcelList />
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
