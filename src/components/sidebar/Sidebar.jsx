import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faChevronLeft, faChevronRight, faBox, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

const extractFirstName = (email) => {
  const namePart = email.split('@')[0];
  const firstName = namePart.split('.')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};

const Sidebar = () => {
  const { currentUser, userRole } = useAuth();
  const greeting = getGreeting();
  const [isOpen, setIsOpen] = useState(true);

  const userName = currentUser.displayName
    ? currentUser.displayName.split(' ')[0]
    : extractFirstName(currentUser.email);

  const renderMenuItems = () => {
    switch (userRole) {
      case 'client':
        return (
          <>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faHome} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Home</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faUser} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Dashboard</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faBox} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>My Orders</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faMoneyBill} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Billing</span>
            </div>
          </>
        );
      case 'courier':
        return (
          <>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faHome} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Home</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faUser} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Dashboard</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faBox} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Deliveries</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faMoneyBill} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Invoicing</span>
            </div>
          </>
        );
      case 'admin':
        return (
          <>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faHome} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Home</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faUser} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Dashboard</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faUser} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Couriers</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faUser} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Clients</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faMoneyBill} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Finance</span>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faHome} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Home</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faUser} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Login</span>
            </div>
            <div className="menu-item">
              <FontAwesomeIcon className={`menu-icon ${isOpen ? '' : 'closed'}`} icon={faUser} />
              <span className={`menu-text ${isOpen ? '' : 'closed'}`}>Signup</span>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`sidebar-container ${isOpen ? '' : 'closed'}`}>
      <div className={`profile-section ${isOpen ? '' : 'closed'}`}>
        <div className="profile-circle">
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="profile-picture" />
          ) : (
            <div className="profile-initials">{userName[0]}</div>
          )}
        </div>
        {isOpen && (
          <>
            <h2>{`${greeting}, ${userName}`}</h2>
          </>
        )}
      </div>
      {renderMenuItems()}
      <button className="dashtoggle-button" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
      </button>
    </div>
  );
};

export default Sidebar;
