import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doSignOut } from '../../firebase/auth';
import { Button, Menu, Image } from 'semantic-ui-react';
import './Navbar.css'; // Ensure this file contains the updated CSS
import SearchBar from './SearchBar'; // Import if needed

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Track if the navbar is scrolled
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  // Detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll); 
    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  const navbarStyle = {
    backgroundColor: isScrolled ? 'rgb(9, 105, 125, 0.9)' : 'transparent', 
    padding: '16px', 
    position: 'fixed',
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 1000,
    transition: 'background-color 0.3s', // Match CSS transition
  };

  const logoUrl = 'https://github.com/NB-Kamoni/Images/blob/main/GLMS%20New.png?raw=true';

  return (
    <Menu secondary style={navbarStyle} className="navbar">
      {/* Logo as the first item, linking to the home page */}
      <Menu.Item as={Link} to="/" className="custom-image">
        <Image src={logoUrl} alt="Company Logo" size="small" />
      </Menu.Item>

      <Menu.Item className='custom-menuitem' as={Link} to="/couriers">Couriers</Menu.Item>
      <Menu.Item className='custom-menuitem' as={Link} to="/destinations">Destinations</Menu.Item>
      <Menu.Item className='custom-menuitem' as={Link} to="/services">Services</Menu.Item>
      <Menu.Item className='custom-menuitem' as={Link} to="/careers">Careers</Menu.Item>

      {/* Vertical line after menu items */}
      <div className="vertical-line"></div>

     

      {userLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              basic
              inverted
              onClick={() => {
                doSignOut().then(() => navigate('/login'));
              }}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
      )}

      {!userLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              basic
              inverted
              as={Link}
              to="/login"
              style={{ marginRight: '0.5em' }}
            >
              Login
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              basic
              inverted
              as={Link}
              to="/register"
              style={{ marginLeft: '0.5em' }}
            >
              Signup
            </Button>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default Navbar;
