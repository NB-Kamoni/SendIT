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
  }, [visible]);

  return (
    <Drawer
      title="User Profile"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {loading ? (
        <Spin />
      ) : (
        <div>
          {profileData.map(pd => (
            <div key={pd.id}>
              <p><strong>Name:</strong> {pd.name}</p>
              <p><strong>Email:</strong> {pd.email}</p>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default Profile;
