import React, { useEffect, useState } from 'react';
import TrackingTool from '../tracking/TrackinTool';
import './ParcelList.css';

function ParcelList(){
    const [parcels, setParcels] = useState([])

    useEffect(() => {
        fetch("https://sendit-server-j68q.onrender.com/parcels")
            .then((r) => r.json())
            .then(data => setParcels(data))
            .catch(error => console.error('Error fetching parcels:', error));
        }, [])

        if (!parcels.length) {
            return <div>Loading...</div>;
        }

    return(
      <div className="card">
        <h2>
            <TrackingTool/>
        </h2>
        <h2 className="card-title">Parcels Available</h2>
        <table className="table">
         <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Courier</th>
            <th>Delivery Status</th>
          </tr>
         </thead>
         <tbody>
          {parcels.map(parcel=>(
            <tr key='id'>
              <td>{parcel.id}</td>
              <td>{parcel.sender_id}</td>
              <td>{parcel.recipient_id}</td>
              <td>{parcel.pickup_location}</td>
              <td>{parcel.drop_off_location}</td>
              <td>{parcel.courier_id}</td>
              <td>{parcel.delivery_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )

}

export default ParcelList;