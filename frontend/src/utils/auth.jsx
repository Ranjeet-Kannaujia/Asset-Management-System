import jwt_decode from 'jwt-decode';

export const isLoggedIn = () => {
    const token = localStorage.getItem('userAuth');
    return !!token; // Return true if the token is present, otherwise false
  };

export const getUserRole = () => {
  const token = localStorage.getItem('userAuth');
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken;//if  role is stored in the token
  }
  return ""; // Return null if the token is not present
};