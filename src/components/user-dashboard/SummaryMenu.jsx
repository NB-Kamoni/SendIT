import React from 'react';
import { FaTag, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';
import './SummaryMenu.css'; // Import the CSS file for styling

const SummaryMenu = () => {
  const handleClick = (url) => {
    window.location.href = url; // Navigate to the specified URL
  };

  return (
    <div className="summary-menu-card">
      <div className="summary-menu-item" onClick={() => handleClick('/quote')}>
        <FaTag className="summary-menu-icon" />
        <p>Get a Quote</p>
      </div>
      <div className="summary-menu-item" onClick={() => handleClick('/location')}>
        <FaMapMarkerAlt className="summary-menu-icon" />
        <p>Find Location</p>
      </div>
      <div className="summary-menu-item" onClick={() => handleClick('/courier')}>
        <FaTruck className="summary-menu-icon" />
        <p>Select Courier</p>
      </div>
    </div>
  );
};

export default SummaryMenu;
