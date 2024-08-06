import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeMessage from '../home/WelcomeMessage';
import {Grid, Header, Segment} from 'semantic-ui-react'

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
// ------------------------------------------------Client-Content-----------------------------------------------------------
                    <div>
                        <div className="Summarycontainer">
                            
                            <div className="grid-item">
                                <TrackingTool />
                                <TypingEffect style={{color: 'red'}}
      texts={["Track Your Package with Ease", "Get Live Location Updates", "Choose Your Preferred Courier", "Receive a Free Quote Instantly", "Reliable Support at Your Fingertips"]}
      speed={100} // Speed in milliseconds
      pause={1000} // Pause for 1 second after typing
    />
                                
                            </div>
                            <div className="grid-item">
                               <SummaryMenu />
                            
                            </div>
                        </div>


                       
               
                    </div>
// ------------------------------------------------Client-Content-END-----------------------------------------------------------                    
                );
            case 'courier':
                return (
                    <div>
                        <div className="summarycontainer">
                        <Sidebar />
                           
                           {/* Add component here */}
                            {/* Note: AdminFinanceSummary is not included here for 'courier' */}
                        </div>
                        <div className="contentcontainer">
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
                
 // ------------------------------------------------Client-Content-END-----------------------------------------------------------   
            case 'admin':
                return (
                    <div>
                        <div className="summarycontainer">
                        <Sidebar />
                         
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
        <div className="user-dashboard">
            
            <div className="content-card">
                <Sidebar />
                {renderContent()}
            </div>
        </div>
    );
};

export default UserDashboard;