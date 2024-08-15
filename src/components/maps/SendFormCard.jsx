import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './SendFormCard.css';

const SendFormCard = ({ onFormSubmit, directions, distance, currentLocation }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [value, setValue] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientId, setRecipientId] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const generateTrackingNumber = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    setTrackingNumber(generateTrackingNumber());
  }, []);

  useEffect(() => {
    const lengthInCm = parseFloat(length) || 0;
    const widthInCm = parseFloat(width) || 0;
    const heightInCm = parseFloat(height) || 0;
    const weightInKg = parseFloat(weight) || 0;
    const parcelValue = parseFloat(value) || 0;

    const cost = 
      distance * 0.01 + 
      lengthInCm * widthInCm * heightInCm * 0.02 +
      weightInKg * 0.03 + 
      parcelValue * 0.02;
    
    setShippingCost(cost.toFixed(2));
  }, [distance, length, width, height, weight, value]);

  useEffect(() => {
    if (pickup && dropoff) {
      onFormSubmit(pickup, dropoff);
    }
  }, [pickup, dropoff, onFormSubmit]);

  const handleRecipientEmailChange = async (e) => {
    const email = e.target.value;
    setRecipientEmail(email);

    try {
      const response = await fetch(`https://sendit-server-j68q.onrender.com/users/${email}`);
      const data = await response.json();

      if (response.ok && data.user_id) {
        setRecipientId(data.user_id);
      } else {
        setRecipientId(null);
      }
    } catch (error) {
      console.error("Error fetching recipient ID:", error);
      setRecipientId(null);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Parcel Delivery Invoice', 14, 22);

    doc.setFontSize(12);
    doc.text(`Pickup Location: ${pickup}`, 14, 40);
    doc.text(`Dropoff Location: ${dropoff}`, 14, 50);
    doc.text(`Recipient Email: ${recipientEmail}`, 14, 60);
    doc.text(`Tracking Number: ${trackingNumber}`, 14, 70);
    doc.text(`Distance: ${distance} km`, 14, 80);
    doc.text(`Length: ${length} cm`, 14, 90);
    doc.text(`Width: ${width} cm`, 14, 100);
    doc.text(`Height: ${height} cm`, 14, 110);
    doc.text(`Weight: ${weight} kg`, 14, 120);
    doc.text(`Value: $${value}`, 14, 130);
    doc.text(`Shipping Cost: $${shippingCost}`, 14, 140);

    doc.save(`Invoice_${trackingNumber}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generatePDF();

    const parcelData = {
      pickup_location: pickup,
      dropoff_location: dropoff,
      recipient_email: recipientEmail,
      length: parseFloat(length),
      width: parseFloat(width),
      height: parseFloat(height),
      weight: parseFloat(weight),
      value: parseFloat(value),
      distance,
      shipping_cost: parseFloat(shippingCost),
      tracking_number: trackingNumber,
      recipient_id: recipientId,
    };

    try {
      const response = await fetch('https://sendit-server-j68q.onrender.com/parcels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parcelData),
      });

      if (response.ok) {
        console.log('Parcel created successfully.');
      } else {
        console.error('Failed to create parcel.');
      }
    } catch (error) {
      console.error('Error creating parcel:', error);
    }
  };

  return (
    <div className="send-form-card">
      <div className="send-form-card-content">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group form-group-half">
              <label>Pickup Location</label>
              <input
                type="text"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
              />
            </div>
            <div className="form-group form-group-half">
              <label>Dropoff Location</label>
              <input
                type="text"
                placeholder="Enter dropoff location"
                value={dropoff}
                onChange={e => setDropoff(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Recipient Email</label>
            <input
              type="email"
              placeholder="Enter recipient email"
              value={recipientEmail}
              onChange={handleRecipientEmailChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group form-group-half">
              <label>Length (cm)</label>
              <input
                type="number"
                placeholder="Enter length in cm"
                value={length}
                onChange={e => setLength(e.target.value)}
              />
            </div>
            <div className="form-group form-group-half">
              <label>Width (cm)</label>
              <input
                type="number"
                placeholder="Enter width in cm"
                value={width}
                onChange={e => setWidth(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group form-group-half">
              <label>Height (cm)</label>
              <input
                type="number"
                placeholder="Enter height in cm"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>
            <div className="form-group form-group-half">
              <label>Weight (kg)</label>
              <input
                type="number"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Value ($)</label>
            <input
              type="number"
              placeholder="Enter value in dollars"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Generate Invoice PDF</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendFormCard;
