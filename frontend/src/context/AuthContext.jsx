import { createContext, useState, useEffect } from 'react'
import { mockAdmin } from '../data/mockData'

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

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate server request
      setTimeout(() => {
        // Check credentials against mock data
        if (email === mockAdmin.email && password === mockAdmin.password) {
          const user = {
            id: mockAdmin.id,
            name: mockAdmin.name,
            email: mockAdmin.email,
            role: mockAdmin.role,
            avatar: mockAdmin.avatar
          }
          
          setCurrentUser(user)
          setIsAuthenticated(true)
          localStorage.setItem('energygym_user', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 800)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('energygym_user')
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