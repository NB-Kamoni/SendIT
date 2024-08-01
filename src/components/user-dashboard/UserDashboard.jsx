import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeMessage from '../home/WelcomeMessage';
import {Grid, Header, Segment} from 'semantic-ui-react'

import './UserDashboard.css';
import TrackingTool from '../tracking/TrackinTool';
import TypingEffect from '../TypingEffect';



const UserDashboard = () => {
    const { userRole } = useAuth();

    const renderContent = () => {
        switch (userRole) {
            case 'student':
                return (
// ------------------------------------------------Client-Content-----------------------------------------------------------
                    <div>
                        <div className="container">
                            <div className="grid-item">
                                <WelcomeMessage />
                            </div>
                            <div className="grid-item">
                                <TrackingTool />
                                <TypingEffect style={{color: 'red'}}
      texts={["Track Your Package with Ease", "Get Live Location Updates", "Choose Your Preferred Courier", "Receive a Free Quote Instantly", "Reliable Support at Your Fingertips"]}
      speed={100} // Speed in milliseconds
      pause={1000} // Pause for 1 second after typing
    />
                                
                            </div>
                            <div className="grid-item">
                               
                            </div>
                        </div>


                       
               
                    </div>
// ------------------------------------------------Client-Content-END-----------------------------------------------------------                    
                );
            case 'instructor':
                return (
                    <div>
                        <div className="summary-container">
                            <WelcomeMessage />
                           {/* Add component here */}
                            {/* Note: AdminFinanceSummary is not included here for 'instructor' */}
                        </div>
                        <div className="content-container">
                            <div className="left-column">
                               {/* Add component here */}
                            </div>
                            <div className="left-column">
                                <div className="top-card">
                                 {/* Add component here */}
                                </div>
                                <div className="bottom-card">
                                   {/* Add component here */}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'admin':
                return (
                    <div>
                        <div className="summary-container">
                            <WelcomeMessage />
                          {/* Add component here */}
                    
                        </div>
                        <div className="content-container">
                            <div className="left-column">
                             {/* Add component here */}
                            </div>
                            <div className="left-column">
                                <div className="top-card">
                                {/* Add component here */}
                                </div>
                                <div className="bottom-card">
                                 {/* Add component here */}
                                </div>
                            </div>
                        </div>
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
        <div className="dashboard">
            <Sidebar />
            <div className="content-card">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserDashboard;