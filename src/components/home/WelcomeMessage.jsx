import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Profile from '../profile/Profile';
import Messages from '../messages/Messages';
import './WelcomeMessage.css';

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

const WelcomeMessage = () => {
  const { currentUser, userRole } = useAuth();
  const greeting = getGreeting();
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [messagesDrawerVisible, setMessagesDrawerVisible] = useState(false);

  const userName = currentUser.displayName
    ? currentUser.displayName.split(' ')[0]
    : extractFirstName(currentUser.email);

  const showProfileDrawer = () => {
    setProfileDrawerVisible(true);
  };

  const closeProfileDrawer = () => {
    setProfileDrawerVisible(false);
  };

  const showMessagesDrawer = () => {
    setMessagesDrawerVisible(true);
  };

  const closeMessagesDrawer = () => {
    setMessagesDrawerVisible(false);
  };

  return (
    <div className="welcome-card">
      <div className="profile-circle">
        {currentUser.photoURL ? (
          <img src={currentUser.photoURL} alt="Profile" className="profile-image" onClick={showProfileDrawer} />
        ) : (
          <div className="profile-initials">{userName.charAt(0)}</div>
        )}
      </div>
      <div className="welcome-greeting">
        {greeting}, {userName}!
      </div>
      <div className="welcome-message">
        Welcome to the {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard.
        
      </div>
      <Profile visible={profileDrawerVisible} onClose={closeProfileDrawer} />
      <Messages visible={messagesDrawerVisible} onClose={closeMessagesDrawer} />
    </div>
  );
};

export default WelcomeMessage;