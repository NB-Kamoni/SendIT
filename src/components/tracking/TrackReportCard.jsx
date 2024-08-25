import React, { useEffect, useState } from 'react';
import './TrackReportCard.css';
import DotLoader from 'react-spinners/DotLoader'; 
import { Button, Icon } from 'semantic-ui-react'; 
// import InvoiceGenerator from './InvoiceGenerator'; 

const TrackReportCard = ({ results, currentUser }) => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [courierName, setCourierName] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async (userId, setName) => {
      try {
        const response = await fetch(`https://sendit-server-j68q.onrender.com/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setName(`${data.first_name} ${data.last_name}`);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchData = async () => {
      await fetchUserData(results.sender_id, setSenderName);
      await fetchUserData(results.recipient_id, setRecipientName);
      await fetchUserData(results.courier_id, setCourierName);
      setLoading(false); 
    };

    fetchData();
  }, [results.sender_id, results.recipient_id, results.courier_id]);

  const stages = [
    { id: 'posted', label: 'Parcel has been posted by', location: results.pickup_location, person: senderName, time: results.created_at },
    { id: 'in_progress', label: 'is on the way with your parcel', location: '', person: courierName, time: results.updated_at },
    { id: 'delivered', label: 'Parcel has been delivered at', location: results.drop_off_location, time: results.updated_at },
    { id: 'received', label: 'has collected the parcel', location: '', person: recipientName, time: results.updated_at },
  ];

  const isCancelButtonActive = 
    currentUser === results.sender_id && results.delivery_status !== 'delivered';

  const isDownloadButtonActive = currentUser === results.sender_id;

  const handleDownload = () => {
    // Call your InvoiceGenerator component or function here
    InvoiceGenerator.generatePDF(results); 
  };

  return (
    <div className="trackreport-card">
      {loading && (
        <div className="loading-overlay">
          <DotLoader
            color="rgb(253, 197, 0)"
            size={80}
            speedMultiplier={0.75}
          />
        </div>
      )}
      <div className="logo-container">
        <img src="https://res.cloudinary.com/dan7dm7kx/image/upload/v1724591446/Black-logo_pb4qel.png" alt="Logo" className="logo" /> {/* Replace with your logo path */}
      </div>
      <div className="tracking-container">
        {stages.map((stage, index) => {
          const isCompleted = results.delivery_status === stage.id || stages.findIndex(s => s.id === results.delivery_status) > index;
          return (
            <div className={`status-item ${isCompleted ? 'status-green' : 'status-black'}`} key={index}>
              <div className="status-content">
                <div className="status-time">{isCompleted ? stage.time : ' '}</div>
                <div className="status-circle">
                  {!isCompleted && <div className="status-number">{index + 1}</div>}
                  {isCompleted && <div className="checkmark">✓</div>}
                </div>
                <div className="status-info">
                  <div>{`${stage.label} ${stage.person || ''} ${stage.location ? `at ${stage.location}` : ''}`}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        {results.delivery_status !== 'received' && (
          <Button
            className="custom-menubutton"
            disabled={!isCancelButtonActive}
          >
            Cancel
          </Button>
        )}
        <Button
          icon
          labelPosition='right'
          className="custom-menubutton"
          disabled={!isDownloadButtonActive}
          onClick={handleDownload}
        >
          <Icon name='file pdf' />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default TrackReportCard;
