import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/store';
import { hasPermission } from '../config/permissions';

const OauthProtectedRoute = ({ requiredPermission }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    // User is logged in but doesn't have the required permission
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default OauthProtectedRoute;