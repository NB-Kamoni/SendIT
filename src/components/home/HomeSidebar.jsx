import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Menu, Sidebar, Image } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthContext';
import { doSignOut } from '../../firebase/auth';
import './HomeSidebar.css';

const HomeSidebar = () => {
  const [visible, setVisible] = useState(false);
  const { userLoggedIn } = useAuth();

  const handleSidebarHide = () => setVisible(false);
  const handleToggle = () => setVisible(!visible);

  const logoUrl = '/src/assets/Yellow-logo.png'; 

  return (
    <>
      {!visible && (
        <Button icon onClick={handleToggle} className="sidebar-trigger">
          <Icon name="bars" />
        </Button>
      )}

      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        onHide={handleSidebarHide}
        visible={visible}
        width="thin"
        className="home-sidebar"
      >
        <Menu.Item className="sidebar-logo" onClick={handleSidebarHide}>
          <Image src={logoUrl} alt="Company Logo" size="small" centered />
        </Menu.Item>
        <Menu.Item as={Link} to="/" onClick={handleSidebarHide}>Home</Menu.Item>
        <Menu.Item as={Link} to="/couriers" onClick={handleSidebarHide}>Couriers</Menu.Item>
        <Menu.Item as={Link} to="/destinations" onClick={handleSidebarHide}>Destinations</Menu.Item>
        <Menu.Item as={Link} to="/services" onClick={handleSidebarHide}>Services</Menu.Item>
        <Menu.Item as={Link} to="/careers" onClick={handleSidebarHide}>Careers</Menu.Item>
        
        {userLoggedIn ? (
          <Menu.Item
            as="a"
            onClick={() => {
              doSignOut().then(() => handleSidebarHide());
            }}
          >
            Logout
          </Menu.Item>
        ) : (
          <>
            <Menu.Item as={Link} to="/login" onClick={handleSidebarHide}>Login</Menu.Item>
            <Menu.Item as={Link} to="/register" onClick={handleSidebarHide}>Signup</Menu.Item>
          </>
        )}

        <Button icon onClick={handleSidebarHide} className="close-sidebar">
          <Icon name="angle left" />
        </Button>
      </Sidebar>
    </>
  );
};

export default HomeSidebar;
