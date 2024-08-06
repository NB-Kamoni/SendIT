import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doSignOut } from '../../firebase/auth';
import { Button, Menu, Image, Icon } from 'semantic-ui-react';
import Profile from '../profile/Profile'; // Ensure correct import path
import NotificationsDrawer from '../notifications/NotificationsDrawer'; // Ensure correct import path
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [notificationsDrawerVisible, setNotificationsDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkNewNotifications = async () => {
      // Replace with your actual API call
      const response = await fetch('/api/notifications/unread');
      const data = await response.json();
      setHasNewNotifications(data.hasUnread);
    };

    checkNewNotifications();
  }, []);

  const navbarStyle = {
    backgroundColor: isScrolled ? 'rgb(253, 197, 0)' : 'transparent',
    padding: '16px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'background-color 3s',
  };

  const logoUrl = '/src/assets/Black-logo.png';

  return (
    <Menu secondary style={navbarStyle} className="navbar">
      <Menu.Item as={Link} to="/" className="custom-image">
        <Image src={logoUrl} alt="Company Logo" size="small" />
      </Menu.Item>

      {!userLoggedIn ? (
        <>
          <Menu.Item className='custom-menuitem' as={Link} to="/">Home</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/couriers">Couriers</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/destinations">Destinations</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/services">Services</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/careers">Careers</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item className='custom-menuitem' as={Link} to="/">Home</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/dashboard">Dashboard</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/my-orders">My Orders</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/billing">Billing</Menu.Item>
          <Menu.Item className='custom-menuitem' as={Link} to="/profile">Profile</Menu.Item>
        </>
      )}

      <div className="vertical-line"></div>

      {userLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item onClick={() => setNotificationsDrawerVisible(true)} className="menu-item-icon">
            <Icon name="bell" size="large" />
            <span className={hasNewNotifications ? 'notification-indicator-red' : 'notification-indicator-green'} />
          </Menu.Item>
          <Menu.Item onClick={() => setProfileDrawerVisible(true)} className="menu-item-icon">
            <div className="profile-circle">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-initials">{currentUser.displayName.charAt(0)}</div>
              )}
            </div>
          </Menu.Item>
        </Menu.Menu>
      )}

      {!userLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              className='custom-menubutton'
              inverted
              as={Link}
              to="/login"
            >
              Login
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              className='custom-menubutton'
              inverted
              as={Link}
              to="/register"
            >
              Signup
            </Button>
          </Menu.Item>
        </Menu.Menu>
      )}

      <Profile visible={profileDrawerVisible} onClose={() => setProfileDrawerVisible(false)} />
      <NotificationsDrawer visible={notificationsDrawerVisible} onClose={() => setNotificationsDrawerVisible(false)} />
    </Menu>
  );
};

export default Navbar;
