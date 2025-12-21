
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookies';

const AuthProtectedRoute = () => {
  const token = Cookies.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthProtectedRoute;