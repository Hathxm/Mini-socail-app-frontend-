import React from 'react';
import { Navigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    // No token, redirect to login
    return <Navigate to="/" replace />;
  }

 

  return children;
};

export default PrivateRoute;

