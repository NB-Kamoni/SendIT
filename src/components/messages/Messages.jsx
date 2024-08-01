import React, { useState, useEffect } from 'react';
import { Drawer, Spin } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const Messages = ({ visible, onClose }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (visible) {
      fetch(`/api/user/messages/${currentUser.uid}`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
          setLoading(false);
        });
    }
  }, [visible, currentUser.uid]);

  return (
    <Drawer
      title="Messages"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {loading ? (
        <Spin />
      ) : messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <p><strong>From:</strong> {message.sender}</p>
              <p><strong>Message:</strong> {message.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found</p>
      )}
    </Drawer>
  );
};

export default Messages;