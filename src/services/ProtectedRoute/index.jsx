import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenExpired = () => {
  const now = Date.now();
  const expiryTime = localStorage.getItem('tokenExpiry');
  return now > expiryTime;
};
const ProtectedRoute = ({ element: Component, ...rest }) => {
  let token;
  if(isTokenExpired()){
token = false

  }else{

    token = localStorage.getItem('token')
  }
  

  return token ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
