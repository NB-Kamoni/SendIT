import React, { useState } from 'react';
import { Card, Button, Input, Modal, Form } from 'semantic-ui-react';
import './HomeCalculating.css';

const HomeCalculating = () => {
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [open, setOpen] = useState(false);

  const handleCalculate = () => {
    setOpen(true);
    // Simulate calculation delay
    setTimeout(() => {
      setOpen(false);
      alert('Cost estimation result');
    }, 2000);
  };

  return (
    <Card className="cost-card">
      <Card.Content>
        <Card.Header></Card.Header>
        <Form>
            <p style={{textAlign: 'justify'}}> Enter Weight of the Parcel in KGs</p>
          <Form.Field>
            <Input
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fluid
            />
          </Form.Field>
          <p style={{textAlign: 'justify'}}> Enter Dinstace From Origin to Destination in KMs</p>
          <Form.Field>
            <Input
              placeholder="Distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              fluid
            />
          </Form.Field>
          <p style={{textAlign: 'justify'}}> Enter Value of Goods in the Parcel</p>
          <Form.Field>
            <Input
              placeholder="Value"
              value={time}
              onChange={(e) => setValue(e.target.value)}
              fluid
            />
          </Form.Field>
        </Form>
      </Card.Content>
      <Card.Content extra>
        <Button size='huge' primary onClick={handleCalculate}>Calculate</Button>
      </Card.Content>
      <Modal open={open} onClose={() => setOpen(false)} size="small">
        <Modal.Content>
          <div className="cost-popup">Calculating...</div>
        </Modal.Content>
      </Modal>
    </Card>
  );
};

export default HomeCalculating;
