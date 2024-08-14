import React, { useState } from 'react';
import './TrackingPopCard.css';
import TrackReportCard from './TrackReportCard';

const TrackingPopCard = ({ results, onClose }) => {
  const [activeTab, setActiveTab] = useState('tab1');

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return results ? (
          <TrackReportCard results={results} onClose={onClose} />
        ) : (
          <div className="card-content">No Results</div>
        );
      case 'tab2':
        return <div className="card-content">Content for </div>;
      case 'tab3':
        return <div className="card-content">Content for Tab 3</div>;
      default:
        return <div className="card-content">Default Content</div>;
    }
  };

  return (
    <div className="overlay">
      <div className="card">
        {/* Close Button */}
        <div className="close-button" onClick={onClose}>&times;</div>
        
        {/* Card Header with Tabs */}
        <div className="card-header">
          <div
            className={`card-tab ${activeTab === 'tab1' ? 'active' : ''}`}
            onClick={() => setActiveTab('tab1')}
          >
            Parcel Status
          </div>
          <div
            className={`card-tab ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => setActiveTab('tab2')}
          >
            Parcel Location
          </div>
          <div
            className={`card-tab ${activeTab === 'tab3' ? 'active' : ''}`}
            onClick={() => setActiveTab('tab3')}
          >
            SendIT Support
          </div>
        </div>
        
        {/* Card Body */}
        <div className="card-body">
         
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TrackingPopCard;
