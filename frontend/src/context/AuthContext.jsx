import { createContext, useState, useEffect } from 'react'
// import { mockAdmin } from '../data/mockData'

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('energygym_user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to login');
      }
  
      const data = await res.json();
  
      const user = {
        id: data.admin._id,
        name: data.admin.name,
        email: data.admin.email,
        role: 'admin',
        avatar: ''
      };
  
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('energygym_user', JSON.stringify(user));
      localStorage.setItem('energygym_token', data.token);
  
      return user;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('energygym_user')
    localStorage.removeItem('energygym_token')
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}