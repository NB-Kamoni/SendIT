import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import './UserDashboard.css';
import TrackingTool from '../tracking/TrackingTool';
import MapComponent from '../maps/MapComponent';

const UserDashboard = () => {
    const { userRole } = useAuth();

    const renderContent = () => {
        switch (userRole) {
            case 'client':
                {/* Add client-specific components here */}
                return (
                    
                           <MapComponent />
                       
                );
            case 'courier':
                return (
                    <div className="content">
                        {/* Add courier-specific components here */}
                           <MapComponent />
                    </div>
                );
                case 'admin':
                return (
                    <div className="content">
                        {/* Add admin-specific components here */}
{/* -----------------------TrackingTool-------------------------------------- */}
                    <div className="grid-container-admin">  
                        <div className="grid-item-admin">
                            <TrackingTool />
                        </div>
                           <div className="grid-item-admin"></div>
                    </div>
{/* // -----------------------TrackingTool-END------------------------------------- */}

                       <DataCard/> 

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
