import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ allowedRoles }) => {
  const role = sessionStorage.getItem('userRole');

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // If we pass allowedRoles array and user's role is not inside it
  if (allowedRoles && !allowedRoles.includes(role)) {
    toast.error('Access Denied');
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
