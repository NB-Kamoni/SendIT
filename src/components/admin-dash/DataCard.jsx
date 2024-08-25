import React from 'react';
import './DataCard.css';

const DataCard = () => {
  return (
    <div className="horizontal-card">
      <div className="field">
        <span className="field-text">Income</span>
        <span className="field-subtext">$1500</span>
      </div>
      <div className="separator"></div>
      <div className="field">
        <span className="field-text">Expenses</span>
        <span className="field-subtext">$300</span>
      </div>
      <div className="separator"></div>
      <div className="field">
        <span className="field-text">Parcels in-progress</span>
        <span className="field-subtext">500</span>
      </div>
      <div className="separator"></div>
      <div className="field">
        <span className="field-text">Delivered parcels</span>
        <span className="field-subtext">5000</span>
      </div>
    </div>
  );
};

export default DataCard;

