import React, { useState, useEffect } from 'react';
import MapCard from './MapCard';
import SendFormCard from './SendFormCard';
import './MapComponent.css'; // Import the CSS file

const MapComponent = () => {
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleFormSubmit = (pickup, dropoff) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log('Directions result:', result);
          setDirections(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <div className="map-component">
      <div className="grid-container">
        <div className="grid-item">
          <SendFormCard onFormSubmit={handleFormSubmit} />
        </div>
        <div className="grid-item">
          <MapCard currentLocation={currentLocation} directions={directions} />
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
