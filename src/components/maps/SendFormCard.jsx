import React, { useState } from 'react';
import './SendFormCard.css'; // Import the CSS file

const SendFormCard = ({ onFormSubmit }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(pickup, dropoff);
  };

  return (
    <div className="send-form-card">
      <div className="send-form-card-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              placeholder="Enter pickup location"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Dropoff Location</label>
            <input
              type="text"
              placeholder="Enter dropoff location"
              value={dropoff}
              onChange={e => setDropoff(e.target.value)}
            />
          </div>
          <button type="submit">Get Route</button>
        </form>
      </div>
    </div>
  );
};

export default SendFormCard;
