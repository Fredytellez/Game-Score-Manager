
const registerUser = async (userData) => {
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Error registering user');
      }
  
      return await response.json();
    } catch (error) {
      console.log('Error registering user:', error);
      throw error;
    }
  };
  
  export default registerUser;
  