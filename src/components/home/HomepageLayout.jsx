/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { InView } from 'react-intersection-observer'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import HomeSummary from './HomeSummary'
import HomeCalculating from './HomeCalculating'
import HomeTracking from './HomeTracking'
import { Link } from 'react-router-dom';




// Setting up responsive breakpoints
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

// Primary and secondary colors for the theme
const primaryColor = 'rgb(253, 197, 0)' // golden yellow
const secondaryColor = '#012169' // Dark Blue

// CSS-in-JS for button styles
const buttonStyles = {
  backgroundColor: primaryColor,
  color: '#012169',
}


const buttonStyles_blue = {
  backgroundColor: secondaryColor,
  color: 'white',
 

}

// CSS-in-JS for text styles
const textStyles = {
  color: 'white',
}

// HomepageHeading component with video background and color overlay
const HomepageHeading = ({ mobile }) => (
  <div style={{ position: 'relative', overflow: 'hidden', height: mobile ? '350px' : '700px', backgroundColor: 'rgba(255, 103, 0)' }}>
    <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
      <source src="/src/assets/AnimationHome.mp4" type="video/mp4" />
    </video>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(253, 197, 0, 0.8)', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
     
    }}>
      <Container text>
        <Header
          as='h1'
          content='SendIT'
          inverted
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'bold',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
            color: '#012169',
          }}
        />
        <Header
          as='h2'
          content='Connecting the World, One Parcel at a Time.'
          inverted
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
            color: '#012169',
          }}
        />
        <Button primary size='huge' style={buttonStyles_blue}>
          Track a Parcel
          <Icon name='right arrow' />
        </Button>
      </Container>
    </div>
  </div>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

// DesktopContainer for larger screens
class DesktopContainer extends Component {
  state = { fixed: false }

  // Toggle fixed menu when heading is in view
  toggleFixedMenu = (inView) => this.setState({ fixed: !inView })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
      <InView onChange={this.toggleFixedMenu}>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em', backgroundColor: '#012169'  }}
          vertical
        >
          <Menu 
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size='large'
            style={{ padding: '1em 0em', backgroundColor: fixed ? 'rgb(253, 197, 0, 0.9)' : '#012169'   }}
          >
            <Container >
              <Menu.Item as='a' active>
                Home
              </Menu.Item>
              <Menu.Item as='a'>Services</Menu.Item>
              <Menu.Item as='a'>About</Menu.Item>
              <Menu.Item as='a'>Contact</Menu.Item>
              <Menu.Item position='right'>
                <Button 
                  
                  as={Link}
                  to="/login" 
                  inverted={!fixed} 
                  primary={fixed} 
                  style={{ marginLeft: '0.5em', backgroundColor: fixed ? '#012169' : 'transparent', color: fixed ? 'white' : 'white' }}
                >
                  Log in
                </Button>
                <Button 
                  as={Link} to="/register"  
                  inverted={!fixed} 
                  primary={fixed} 
                  style={{ marginLeft: '0.5em', backgroundColor: fixed ? '#012169' : 'transparent', color: fixed ? 'white' : 'white' }}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading />
        </Segment>
      </InView>
      {children}
    </Media>
    
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

// MobileContainer for smaller screens
class MobileContainer extends Component {
  state = { sidebarOpened: false }

  // Close the sidebar
  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  // Open the sidebar
  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
            style={{ minHeight: 350, width: '100px', backgroundColor: '#012169' }}
            
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Services</Menu.Item>
            <Menu.Item as='a'>About</Menu.Item>
            <Menu.Item as='a'>Contact</Menu.Item>
            <Menu.Item as={Link} to="/login" >Log In</Menu.Item>
            <Menu.Item as={Link} to="/register" >Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em', backgroundColor: '#012169' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {/* when the screen is smaller */}
                    <Button as={Link} to="/login"  inverted>
                      Log in
                    </Button>
                    <Button as={Link} to="/register"  inverted style={{ marginLeft: '0.5em'  }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

// ResponsiveContainer for handling both Desktop and Mobile Containers
const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

// HomepageLayout component
const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em', backgroundColor: '#012169', color: 'white' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em', ...textStyles }}>
            Send and Receive Parcels Anywhere in the World
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              SendIT allows you to send and receive parcels to and from any location. Our reliable and efficient service ensures your parcels reach their destination safely and on time.
            </p>
            <Header as='h3' style={{ fontSize: '2em', ...textStyles }}>
              
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              With real-time tracking, you can monitor the status and location of your parcels every step of the way.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='/src/assets/gtruck1.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge' style={buttonStyles}>SendIT</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
{/* ------------------------------------------------------------------------------------------------------------------- */}
    <Segment style={{ padding: '0em', backgroundColor: '#012169' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em', ...textStyles }}>
              Track a Parcel
            </Header>
            <div style={{ 
  fontSize: '1.33em', 
  color: 'white', 
  position: 'relative', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center' 
}}>
   <HomeTracking />

</div>
          
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em', ...textStyles }}>
              Cost Estimator
            </Header>
            <div style={{ 
  fontSize: '1.33em', 
  color: 'white', 
  position: 'relative', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center' 
}}>
   <HomeCalculating />
</div>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
{/* --------------------------------------------------------------------------------------------- */}
    <Segment style={{ padding: '8em 0em', backgroundColor: '#012169' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em', ...textStyles }}>
          Easy to Use, Flexible Features
        </Header>
        <p style={{ fontSize: '1.33em', color: 'white' }}>
          Our platform is designed with the user in mind. Whether you need to create an account, manage parcel delivery orders, or track your shipments, SendIT provides an intuitive and seamless experience.
        </p>
        <Button as='a' size='large' style={buttonStyles}>
          Explore
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Sendit Community</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em', ...textStyles }}>
          Join Thousands of Happy Customers
        </Header>
        <p style={{ fontSize: '1.33em', ...textStyles  }}>
          Join the SendIT community and experience the best in parcel delivery services. See how we have helped others and how we can help you too.
        </p>
        <Button as='a' size='large' style={buttonStyles}>
          Join Now
        </Button>
        
      </Container>
    </Segment>
    <HomeSummary />


{/* footer */}
<Segment inverted vertical style={{ padding: '5em 0em', backgroundColor: 'rgba(253, 197, 0)', color: '#012169'}}>
  <Container>
    <Grid divided inverted stackable>
      <Grid.Row>
        <Grid.Column width={3}>
          <Header inverted as='h4' content='About' style={{ color: '#012169' }} />
          <List link inverted >
            <List.Item as='a' style={{ color: '#012169' }}>Sitemap</List.Item>
            <List.Item as='a' style={{ color: '#012169' }}>Contact Us</List.Item>
            <List.Item as='a' style={{ color: '#012169' }}>Terms and Conditions</List.Item>
            <List.Item as='a' style={{ color: '#012169' }}>Privacy Policy</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header inverted as='h4' content='Services' style={{ color: '#012169' }} />
          <List link inverted>
            <List.Item as='a' style={{ color: '#012169' }}>Parcel Delivery</List.Item>
            <List.Item as='a' style={{ color: '#012169' }}>Real-Time Tracking</List.Item>
            <List.Item as='a' style={{ color: '#012169' }}>International Shipping</List.Item>
            <List.Item as='a' style={{ color: '#012169' }}>Customer Support</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as='h4' inverted style={{ color: '#012169' }}>
            SendIT Support
          </Header>
          <p style={{ color: '#012169' }}>+254 725 142 55</p>
          <p style={{ color: '#012169' }}>support@sendit.m</p>
          
              
          
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
</Segment>

  </ResponsiveContainer>
)

export default HomepageLayout
