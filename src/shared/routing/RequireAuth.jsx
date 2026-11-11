import React from 'react';
import { useLocation, Navigate } from 'react-router';
import authService from '../../Auth/auth.service';

const RequireAuth = ({ children, roles }) => {
  let location = useLocation();
  const userValue = authService.userValue;
  console.log('userValue', userValue)
  if (!userValue)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (roles && !roles.includes(userValue.role))
    authService.logout();

  return children;
};

export default RequireAuth;