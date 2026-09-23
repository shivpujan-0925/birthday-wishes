import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const Admin = () => {
  const { isAdminLoggedIn } = useAuth();

  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default Admin;
