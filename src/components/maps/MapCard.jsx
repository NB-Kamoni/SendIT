import React from 'react';
import { LoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { Card } from 'semantic-ui-react';
import './MapCard.css'; // Import the CSS file

const MapCard = ({ currentLocation, directions }) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <Card fluid className="map-card">
      <Card.Content className="map-card-content">
        {currentLocation && (
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerClassName="google-map"
              center={currentLocation}
              zoom={14}
            >
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                />
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </Card.Content>
    </Card>
  );
};

export default MapCard;
