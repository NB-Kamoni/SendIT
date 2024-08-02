import React from 'react'
import { Button, Container, Header, Icon } from 'semantic-ui-react'
import './HomeLanding.css' // Import the CSS file

const HomeLanding = () => (
  <div className="homepage-heading">
    
    <video
      autoPlay
      loop
      muted
      className="homepage-heading video"
    >
      <source src="/src/assets/AnimationHome.mp4" type="video/mp4" />
    </video>

    <div className="homepage-heading-overlay">
      <Container text>
        <Header
          as="h1"
          content="SendIT"
          inverted
          className="homepage-heading-title"
        />
        <Header
          as="h2"
          content="Connecting the World, One Parcel at a Time."
          inverted
          className="homepage-heading-subtitle"
        />
        <Button primary size="huge" className="homepage-heading-button">
          Track a Parcel
          <Icon name="right arrow" />
        </Button>
      </Container>
    </div>
  </div>
)

export default HomeLanding
