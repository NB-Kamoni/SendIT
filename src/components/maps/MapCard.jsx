import React from 'react';
import { LoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { Card } from 'semantic-ui-react';
import './MapCard.css'; // Import the CSS file

const MapCard = ({ currentLocation, directions }) => {
  return (
    <Card fluid className="map-card">
      <Card.Content className="map-card-content">
        {currentLocation && (
          <LoadScript googleMapsApiKey="AIzaSyDUnOM8BN3N1DlUhSfyHMw8T9OtmTc6pjg">
            <GoogleMap
              mapContainerClassName="google-map" /* Use the class for styling */
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
