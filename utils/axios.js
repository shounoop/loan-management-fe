import axios from 'axios';
import { useState } from 'react';

function useAxios() {
  // Function to get token string from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      const tokenString = localStorage.getItem('token');
      return tokenString ? JSON.parse(tokenString) : null;
    }
    return null;
  };

  // Function to get user string from localStorage
  const getUser = () => {
    if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    }
    return null;
  };

  // Initialize state with values from localStorage
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());

  // Function to save token and user details to localStorage
  const saveToken = (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);
    }
  };

  // Function to clear localStorage (logout)
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      setToken(null);
      setUser(null);
    }
  };

  // Axios instance with default configuration
  const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      // Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true,
  });

  return {
    http,
    saveToken,
    logout,
    token,
    user,
    getToken,
  };
}

export default useAxios;
