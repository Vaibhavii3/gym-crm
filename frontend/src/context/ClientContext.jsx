import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { mockClients } from '../data/mockData'

export const ClientContext = createContext()

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load clients from localStorage or use mock data
    const storedClients = localStorage.getItem('energygym_clients')
    
    if (storedClients) {
      setClients(JSON.parse(storedClients))
    } else {
      setClients(mockClients)
      localStorage.setItem('energygym_clients', JSON.stringify(mockClients))
    }
    
    setLoading(false)
  }, [])

  // Save clients to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('energygym_clients', JSON.stringify(clients))
    }
  }, [clients, loading])

  const addClient = (client) => {
    const newClient = {
      ...client,
      id: uuidv4(),
      joiningDate: new Date().toISOString(),
      status: client.status || 'Active'
    }
    
    setClients(prevClients => [...prevClients, newClient])
    return newClient
  }

  const updateClient = (id, updatedClient) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === id ? { ...client, ...updatedClient } : client
      )
    )
  }

  const deleteClient = (id) => {
    setClients(prevClients => 
      prevClients.filter(client => client.id !== id)
    )
  }

  const getClient = (id) => {
    return clients.find(client => client.id === id)
  }

  const getActiveClients = () => {
    return clients.filter(client => client.status === 'Active')
  }

  const getTotalFeesCollected = () => {
    // Calculate based on subscription type
    return clients.reduce((total, client) => {
      if (client.status !== 'Active') return total
      
      let fees = 0
      switch (client.subscriptionType) {
        case 'Monthly':
          fees = 1500
          break
        case '3 Months':
          fees = 4000
          break
        case '6 Months':
          fees = 7500
          break
        default:
          fees = 0
      }
      
      // Add personal trainer fees if applicable
      if (client.personalTrainer === 'Yes') {
        fees += 2000
      }
      
      return total + fees
    }, 0)
  }

  const getUpcomingRenewals = () => {
    const today = new Date()
    const thirtyDaysFromNow = new Date(today)
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    
    return clients.filter(client => {
      if (client.status !== 'Active') return false
      
      const joinDate = new Date(client.joiningDate)
      let renewalDate = new Date(joinDate)
      
      switch (client.subscriptionType) {
        case 'Monthly':
          renewalDate.setMonth(joinDate.getMonth() + 1)
          break
        case '3 Months':
          renewalDate.setMonth(joinDate.getMonth() + 3)
          break
        case '6 Months':
          renewalDate.setMonth(joinDate.getMonth() + 6)
          break
        default:
          return false
      }
      
      return renewalDate <= thirtyDaysFromNow && renewalDate >= today
    })
  }

  const value = {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
    getClient,
    getActiveClients,
    getTotalFeesCollected,
    getUpcomingRenewals
  }

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  )
}