import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Card, Form, Button } from 'semantic-ui-react';

const MapComponent = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
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

  const handleSubmit = () => {
    if (!pickup || !dropoff) {
      console.error('Pickup and Dropoff locations are required.');
      return;
    }

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
    <Card fluid>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Pickup Location"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={e => setPickup(e.target.value)}
          />
          <Form.Input
            label="Dropoff Location"
            placeholder="Enter dropoff location"
            value={dropoff}
            onChange={e => setDropoff(e.target.value)}
          />
          <Button type="submit">Get Route</Button>
        </Form>
      </Card.Content>
      <Card.Content>
        {currentLocation && (
          <LoadScript googleMapsApiKey="AIzaSyDUnOM8BN3N1DlUhSfyHMw8T9OtmTc6pjg">
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%' }}
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

export default MapComponent;
