import React, { useState } from 'react';
import { Container, Button, Form, Segment, Grid, Header, Message } from 'semantic-ui-react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const libraries = ['places'];

const Track = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orderId, setOrderId] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [mapOptions, setMapOptions] = useState({
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  // Handle search query for tracking parcels
  const handleSearch = () => {
    // Logic to handle search
    console.log('Searching for parcel:', searchQuery);
    setShowMap(true);
  };

  // Google Maps component
  const MapComponent = () => (
    <LoadScript googleMapsApiKey="AIzaSyCtWCfukPAF5k6GdPE_YZg9xO3ECQ8tEOg" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={mapOptions.center}
        zoom={mapOptions.zoom}
      >
        <Marker position={mapOptions.center} />
        {/* Additional Markers and Directions can be added here */}
      </GoogleMap>
    </LoadScript>
  );

  return (
    <Container>
      <Segment>
        <Header as='h2' textAlign='center'>Parcel Tracking System</Header>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Search Parcel</label>
                <input
                  placeholder='Enter Parcel ID or Tracking Number'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Field>
              <Button primary onClick={handleSearch}>Track Parcel</Button>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Button as={Link} to='/login' primary>Login</Button>
            <Button as={Link} to='/signup' secondary>Signup</Button>
          </Grid.Column>
        </Grid>
      </Segment>

      {showMap && (
        <Segment>
          <Header as='h3'>Parcel Delivery Details</Header>
          <MapComponent />
          <Button primary as={Link} to={`/order/${orderId}`}>View Order Details</Button>
          <Button secondary as={Link} to={`/order/${orderId}/edit`}>Change Destination</Button>
          <Button negative as={Link} to={`/order/${orderId}/cancel`}>Cancel Order</Button>
        </Segment>
      )}
    </Container>
  );
};

export default Track;
