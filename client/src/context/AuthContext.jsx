import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('gg_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('gg_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('gg_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session expired or invalid token:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();

    const handleAuthChange = () => {
      logout();
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.data?.token && res.data?.user) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('gg_token', res.data.token);
      localStorage.setItem('gg_user', JSON.stringify(res.data.user));
    }
    return res;
  };

  const googleLogin = async (payload) => {
    const res = await authService.googleLogin(payload);
    if (res.data?.token && res.data?.user) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('gg_token', res.data.token);
      localStorage.setItem('gg_user', JSON.stringify(res.data.user));
    }
    return res;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.data?.token && res.data?.user) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('gg_token', res.data.token);
      localStorage.setItem('gg_user', JSON.stringify(res.data.user));
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gg_token');
    localStorage.removeItem('gg_user');
  };

  const updateProfile = async (data) => {
    const res = await authService.updateProfile(data);
    if (res.data?.user) {
      setUser(res.data.user);
      localStorage.setItem('gg_user', JSON.stringify(res.data.user));
    }
    return res;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    googleLogin,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
