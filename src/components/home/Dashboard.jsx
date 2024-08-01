import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import WelcomeMessage from './WelcomeMessage';
import './Dashboard.css';




const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
                <div className="content-card">
                    {/* Content Goes Here */}
                  
                   
                </div>
            </div>
       
    );
};

export default Dashboard;