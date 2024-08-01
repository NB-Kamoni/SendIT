// src/components/profile/Profile.js
import React, { useState, useEffect } from 'react';
import { Drawer, Spin } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const Profile = ({ visible, onClose }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    if (visible) {
      fetch(`http://127.0.0.1:5555/clients`)
        .then((response) => response.json())
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          setLoading(false);
        });
    }
  }, [visible, currentUser.uid]);

  return (
    <Drawer
      title="User Profile"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {/* {loading ? (
        <Spin />
      ) : profileData ? (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Registration No:</strong> {profileData.reg_no}</p>
          {/* Add more profile fields as needed */}
        {/* </div>
      ) : (
        <p>No profile data found</p>
      )} */} 
      <div>
        {profileData.map(pd => (
          <>
          <h4>Name:{pd.name}</h4>
          <h4>Email:{pd.email}</h4>
          </>
        ))}
      </div>
    </Drawer>
  );
};

export default Profile;