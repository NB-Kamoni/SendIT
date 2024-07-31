import React, { useState } from 'react';
import { Card, Button, Input, Modal, Form } from 'semantic-ui-react';
import './HomeTracking.css';

const HomeTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [email, setEmail] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [open, setOpen] = useState(false);

  const handleTrack = () => {
    setOpen(true);
    // Simulate tracking delay
    setTimeout(() => {
      setOpen(false);
      alert('Tracking result');
    }, 2000);
  };

  return (
    <Card className="tracking-card">
      <Card.Content>
        
        <Form>
            <p style={{textAlign: 'justify'}}>Enter Tracking Number</p>
          <Form.Field>
            <Input
              placeholder="Enter Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              fluid
            />
          </Form.Field>
          <p style={{textAlign: 'justify'}}>Enter Email</p>
          <Form.Field>
            <Input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fluid
            />
          </Form.Field>
          <p style={{textAlign: 'justify'}}>Enter 12-Digit Security Key (ABCD-EFGH-IJKL)</p>
          <Form.Field>
            <Input
              placeholder="Enter 12-Digit Security Key"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              fluid
            />
          </Form.Field>
        </Form>
      </Card.Content>
      <Card.Content extra>
        <Button size='huge' primary onClick={handleTrack}>Track</Button>
      </Card.Content>
      <Modal open={open} onClose={() => setOpen(false)} size="small">
        <Modal.Content>
          <div className="tracking-popup">Tracking...</div>
        </Modal.Content>
      </Modal>
    </Card>
  );
};

export default HomeTracking;
