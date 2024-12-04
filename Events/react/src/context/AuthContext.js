import { createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  const signup = async (email, username, password, telephone, image) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('telephone', telephone);
      formData.append('image', image);

      const response = await axios.post('/api/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
