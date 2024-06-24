import axios from 'axios';

const getProtectedData = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No token found');
    return;
  }
  
  try {
    const response = await axios.get('http://localhost:9000/', {
      headers: {
        Authorization: token,
      },
    });

    console.log('Protected data:', response.data);
  } catch (error) {
    console.error('Unauthorized:', error);
  }
};

export default getProtectedData;