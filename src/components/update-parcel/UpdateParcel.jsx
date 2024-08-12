import React, { useState, useEffect } from 'react';
import './UpdateParcel.css';


function UpdateParcel() {
  const [parcelId, setParcelId] = useState('');
  const [parcel, setParcel] = useState(null);
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (parcelId) {
      fetch(`https://sendit-server-j68q.onrender.com/parcels/${parcelId}`)
        .then(response => response.json())
        .then(data => {
          setParcel(data);
          setStatus(data.status);
          setLocation(data.location);
        })
        .catch(error => console.error('Error fetching parcel data:', error));
    }
  }, [parcelId]);

  const handleUpdate = () => {
    fetch(`https://sendit-server-j68q.onrender.com/parcels/${parcelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, location }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Parcel updated successfully!');
        setParcel(data);
      })
      .catch(error => console.error('Error updating parcel:', error));
  };

  return (
    <div>
      <div className='form'>
      <h1>Parcel Admin</h1>
      <input
        type="text"
        placeholder="Enter Parcel ID"
        value={parcelId}
        onChange={e => setParcelId(e.target.value)}
      />
      {parcel && (
        <div>
          <h2>Parcel Details</h2>
          <p><strong>Status:</strong> {parcel.delivery_status}</p>
          <p><strong>Location:</strong> {parcel.location}</p>

          <div>
            <input
              type="text"
              placeholder="Update Status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            />
            <input
              type="text"
              placeholder="Update Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <button className="update" onClick={handleUpdate}>Update Parcel</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default UpdateParcel;

  