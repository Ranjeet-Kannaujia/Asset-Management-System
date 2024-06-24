import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute ({  path, element}){
  const token = !!localStorage.getItem('token');

  if (token) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;