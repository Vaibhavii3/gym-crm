import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { mockNotifications } from '../data/mockData'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Load notifications from localStorage or use mock data
    const storedNotifications = localStorage.getItem('energygym_notifications')
    
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications)
      setNotifications(parsedNotifications)
      setUnreadCount(parsedNotifications.filter(n => !n.read).length)
    } else {
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter(n => !n.read).length)
      localStorage.setItem('energygym_notifications', JSON.stringify(mockNotifications))
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('energygym_notifications', JSON.stringify(notifications))
  }, [notifications])

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      read: false
    }
    
    setNotifications(prevNotifications => 
      [newNotification, ...prevNotifications]
    )
    setUnreadCount(prevCount => prevCount + 1)
    return newNotification
  }

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    )
    setUnreadCount(prevCount => Math.max(0, prevCount - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    )
    setUnreadCount(0)
  }

  const clearNotification = (id) => {
    const notification = notifications.find(n => n.id === id)
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    )
    
    if (notification && !notification.read) {
      setUnreadCount(prevCount => Math.max(0, prevCount - 1))
    }
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}