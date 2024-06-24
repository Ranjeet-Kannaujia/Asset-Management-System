import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserRole, isLoggedIn } from '../utils/auth'

import Home from '../Pages/Home';

const ProtectedRegister = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    
    // Use the navigate function inside a useEffect hook 
    if (!isLoggedIn()) {
      navigate('/');
    }
  }, []); //this effect runs once after the initial render
 

  return isLoggedIn()  ? <props.component/> : <Home />;


};

export default ProtectedRegister