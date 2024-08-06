import React, { useState, useEffect } from 'react';
import { Drawer, Spin } from 'antd';

const NotificationsDrawer = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (visible) {
      fetch(`http://127.0.0.1:5555/notifications`)
        .then((response) => response.json())
        .then((data) => {
          setNotifications(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
          setLoading(false);
        });
    }
  }, [visible]);

  return (
    <Drawer
      title="Notifications"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {loading ? (
        <Spin />
      ) : (
        <div>
          {notifications.map(notification => (
            <div key={notification.id} className={notification.read ? '' : 'unread-notification'}>
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default NotificationsDrawer;
