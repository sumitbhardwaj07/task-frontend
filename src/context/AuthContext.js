import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user)

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  async function login(email, password) {
    setIsLoading(true);
    try {
      const { user: loggedUser, token: jwt } = await loginApi(email, password);
      console.log(user);
      setUser(loggedUser);
      setToken(jwt);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  }

  const isLoggedIn = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading , isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

