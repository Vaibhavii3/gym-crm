import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';


export const ClientContext = createContext()

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;


  const fetchClients = async  () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('energygym_token');
      console.log('Token used for request:', token);
      const response = await axios.get(`${API_URL}/api/v1/clients/getClients`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClients(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchClients();
  }, []);

  // hope
  const addClient = async (clientData) => {
    try {
      const token = localStorage.getItem('energygym_token');
  
      const isFormData = clientData instanceof FormData;
  
      const response = await axios.post(`${API_URL}/api/v1/clients/createClient`, clientData, {
        headers: {
          ...(isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' }),
          Authorization: `Bearer ${token}`,
        },
      });
  
      setClients((prev) => [...prev, response.data.client]);
      return response.data.client;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  };
  
  

  const updateClient = async (id, updateData) => {
    try {
      const token = localStorage.getItem('energygym_token');
      const response = await axios.put(`${API_URL}/api/v1/clients/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setClients((prev) =>
        prev.map((client) => (client._id === id ? response.data : client))
      );
      return response.data;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  };

  const deleteClient = async (id) => {
    try {
      const token = localStorage.getItem('energygym_token');
      await axios.delete(`${API_URL}/api/v1/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients((prev) => prev.filter((client) =>client._id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  };

  const getMonthlyJoinings = async (startDate, endDate) => {
    try {
      const token = localStorage.getItem('energygym_token');
      const response = await axios.get(`${API_URL}/api/v1/clients/joining`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { 
          startDate: startDate,
          endDate: endDate 
        }
      });

      console.log('Monthly joinings data:', response.data);

      return response.data || [];
    } catch (error) {
      console.error('Error fetching monthly joinings:', error);

      // Check the specific error
    if (error.response) {
      console.error('Response error data:', error.response.data);
      console.error('Response error status:', error.response.status);
    }

      return [];
    }
  };
  
  const getClientsWithDuePayments = async () => {
    try {
      const token = localStorage.getItem('energygym_token');
      const response = await axios.get(`${API_URL}/api/v1/clients/due-payment`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Clients with due payments:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching clients with due payments:', error);
      
      if (error.response) {
        console.error('Response error data:', error.response.data);
        console.error('Response error status:', error.response.status);
      }
      
      return [];
    }
  };

  const getClient = (id) => clients.find(client => client._id === id);

  const getActiveClients = () => {
    return clients.filter((client) => client.status?.toLowerCase() === 'active' );
  };

  const getTotalFeesCollected = () => {
    return clients.reduce((total, client) => {
      if(client.status !== 'active') return total;
      return total + (client.totalPaid || 0);
    }, 0);
  };

  // const markClientAsPaid = async (clientId) => {
  const markClientAsPaid = async (clientId) => {
    try {
      const token = localStorage.getItem('energygym_token');
      // const response = await axios.patch(`${API_URL}/api/v1/clients/${clientId}/mark-paid`, {}, {
      const response = await axios.put(`${API_URL}/api/v1/clients/mark-paid/${clientId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error marking client as paid:', error);
      throw error;
    }
  };
  

  const getClientsWithUpcomingRenewals = async () => {
    try {
      const token = localStorage.getItem('energygym_token');
      const response = await axios.get(`${API_URL}/api/v1/clients/due-memberships`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log('Clients with upcoming renewals:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching upcoming renewals:', error);
  
      if (error.response) {
        console.error('Response error data:', error.response.data);
        console.error('Response error status:', error.response.status);
      }
  
      return [];
    }
  };
  
  const getUpcomingBirthdays = async () => {
    try {
      const token = localStorage.getItem('energygym_token');
      const response = await axios.get(`${API_URL}/api/v1/clients/birthday`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Clients with upcoming birthdays:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching upcoming birthdays:', error);
  
      if (error.response) {
        console.error('Response error data:', error.response.data);
        console.error('Response error status:', error.response.status);
      }
  
      return [];
    }
  };
  


  const value = {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
    getClient,
    getActiveClients,
    getTotalFeesCollected,
    getClientsWithUpcomingRenewals,
    fetchClients,
    getMonthlyJoinings,
    getClientsWithDuePayments,
    getUpcomingBirthdays,
    markClientAsPaid,
  }

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  )
}

