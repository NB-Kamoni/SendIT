import React, { useState } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';

const SendFormCard = ({ onFormSubmit }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const handleSubmit = () => {
    onFormSubmit(pickup, dropoff);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
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
    </Card>
  );
};

export default SendFormCard;
