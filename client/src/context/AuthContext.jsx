import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [birthdayGirl, setBirthdayGirl] = useState('Tanisha');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check saved tokens in localStorage
    const viewerToken = localStorage.getItem('birthday_viewer_token');
    const savedName = localStorage.getItem('birthday_girl_name');
    const adminToken = localStorage.getItem('birthday_admin_token');

    if (viewerToken) {
      setIsUnlocked(true);
      if (savedName) setBirthdayGirl(savedName);
    }

    if (adminToken) {
      setIsAdminLoggedIn(true);
    }

    setLoading(false);
  }, []);

  const unlockWebsite = (token, name = 'Tanisha') => {
    localStorage.setItem('birthday_viewer_token', token);
    localStorage.setItem('birthday_girl_name', name);
    setIsUnlocked(true);
    setBirthdayGirl(name);
  };

  const lockWebsite = () => {
    localStorage.removeItem('birthday_viewer_token');
    setIsUnlocked(false);
  };

  const loginAdmin = (token) => {
    localStorage.setItem('birthday_admin_token', token);
    setIsAdminLoggedIn(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('birthday_admin_token');
    setIsAdminLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isUnlocked,
        birthdayGirl,
        isAdminLoggedIn,
        loading,
        unlockWebsite,
        lockWebsite,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
