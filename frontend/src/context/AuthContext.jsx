import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthModal from '../components/AuthModal';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authConfig, setAuthConfig] = useState({ onSuccess: null, message: '' });

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    };
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const openAuthModal = (onSuccess = null, message = '') => {
    setAuthConfig({ onSuccess, message });
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthConfig({ onSuccess: null, message: '' });
  };

  const handleSuccess = (userData) => {
    setUser(userData);
    if (authConfig.onSuccess) {
      authConfig.onSuccess(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        openAuthModal,
        closeAuthModal,
        logout,
      }}
    >
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onSuccess={handleSuccess}
        initialMessage={authConfig.message}
      />
    </AuthContext.Provider>
  );
};
