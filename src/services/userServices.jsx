export const createUserInBackend = async (userData) => {
    try {
      const response = await fetch('https://sendit-server-j68q.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.firebaseToken}`,
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user in the backend');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating user in backend:', error);
      throw error;
    }
  };
  