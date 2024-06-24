import React from 'react';
import { Routes, Route,  Link } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, path }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Link to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;