import React from 'react';
import { Segment, Grid, Header, Image, Button } from 'semantic-ui-react';
import './HomeIntro.css'

const HomeIntro = () => (
  <Segment className="home-intro" vertical>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" className="header-text">
            Send and Receive Parcels Anywhere in the World
          </Header>
          <p className="intro-text">
            SendIT allows you to send and receive parcels to and from any location. Our reliable and efficient service ensures your parcels reach their destination safely and on time.
          </p>
          <Header as="h3" className="header-text">
            With real-time tracking, you can monitor the status and location of your parcels every step of the way.
          </Header>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image bordered rounded size="large" src="src/assets/yellow-container.png" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button size="huge" className="sendit-button">SendIT</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default HomeIntro;
