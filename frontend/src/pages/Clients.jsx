// import { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { FaPlus, FaSearch } from 'react-icons/fa'
// import { useClient } from '../hooks/useClient'
// import { useNotification } from '../hooks/useNotification'
// import ClientCard from '../components/clients/ClientCard'
// import ClientForm from '../components/clients/ClientForm'
// import Modal from '../components/ui/Modal'
// import DeleteConfirmation from '../components/ui/DeleteConfirmation'

// const ClientsContainer = styled.div`
//   padding: 20px 0;
// `

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
//   gap: 15px;
// `

// const PageTitle = styled.h1`
//   color: var(--text-primary);
//   margin: 0;
//   font-size: 32px;
//   font-weight: 700;
// `

// const ActionButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 12px 20px;
//   background-color: var(--primary);
//   color: var(--secondary);
//   border: none;
//   border-radius: var(--border-radius);
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: var(--glow-yellow);
//   }
  
//   svg {
//     font-size: 16px;
//   }
// `

// const SearchContainer = styled.div`
//   position: relative;
//   max-width: 400px;
//   width: 100%;
//   margin: 20px 0;
// `

// const SearchInput = styled.input`
//   width: 100%;
//   padding: 12px 16px 12px 45px;
//   border: 2px solid var(--border-color);
//   border-radius: var(--border-radius);
//   background-color: rgba(0, 0, 0, 0.1);
//   color: var(--text-light);
//   font-size: 16px;
//   transition: all 0.3s ease;
  
//   &:focus {
//     border-color: var(--primary);
//     outline: none;
//     box-shadow: var(--glow-yellow);
//   }
// `

// const SearchIcon = styled.div`
//   position: absolute;
//   left: 15px;
//   top: 50%;
//   transform: translateY(-50%);
//   color: var(--primary);
//   font-size: 18px;
// `

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 15px;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
// `

// const FilterButton = styled.button`
//   padding: 8px 16px;
//   border: 1px solid var(--border-color);
//   border-radius: var(--border-radius);
//   background-color: ${props => props.active ? 'var(--primary)' : 'transparent'};
//   color: ${props => props.active ? 'var(--secondary)' : 'var(--text-light)'};
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: ${props => props.active ? 'var(--primary)' : 'rgba(255, 215, 0, 0.1)'};
//   }
// `

// const ClientsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//   gap: 20px;
  
//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//   }
// `

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 50px 0;
//   color: var(--text-light);
//   opacity: 0.6;
  
//   h3 {
//     font-size: 24px;
//     margin-bottom: 10px;
//   }
  
//   p {
//     font-size: 16px;
//     margin-bottom: 20px;
//   }
// `

// const Clients = () => {
//   const { clients, deleteClient, fetchClients, loading } = useClient()
//   const { addNotification } = useNotification()
  
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [selectedClient, setSelectedClient] = useState(null)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filter, setFilter] = useState('all')

//   useEffect(() => {
//     fetchClients();
//   }, [fetchClients]);
  
//   const handleAddClient = () => {
//     setShowAddModal(true)
//   }
  
//   const handleEditClient = (client) => {
//     setSelectedClient(client)
//     setShowEditModal(true)
//   }
  
//   const handleDeleteClick = (clientId) => {
//     const client = clients.find(c => c._id === clientId)
//     setSelectedClient(client)
//     setShowDeleteModal(true)
//   }
  
//   const confirmDelete = () => {
//     if (selectedClient) {
//       deleteClient(selectedClient._id)
//       addNotification({
//         type: 'client',
//         title: 'Client Deleted',
//         message: `${selectedClient.name} has been removed from the system.`
//       })
//       setShowDeleteModal(false)
//       setSelectedClient(null)
//     }
//   }
  
//   const filteredClients = clients.filter(client => {
//     // Apply search term filter
//     const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           client.phone.includes(searchTerm);
    
//     // Apply status/subscription filter
//     let matchesFilter = true;
//     if (filter === 'active') matchesFilter = client.status === 'Active';
//     if (filter === 'inactive') matchesFilter = client.status === 'Inactive';
//     if (filter === 'monthly') matchesFilter = client.subscriptionType === 'Monthly';
//     if (filter === '3-months') matchesFilter = client.subscriptionType === '3 Months';
//     if (filter === '6-months') matchesFilter = client.subscriptionType === '6 Months';
//     if (filter === 'personal-trainer') matchesFilter = client.personalTrainer === 'Yes';
    
//     return matchesSearch && matchesFilter;
//   });
  
//   return (
//     <ClientsContainer>
//       <Header>
//         <PageTitle>Clients</PageTitle>
//         <ActionButton onClick={handleAddClient}>
//           <FaPlus /> Add New Client
//         </ActionButton>
//       </Header>
      
//       <SearchContainer>
//         <SearchIcon>
//           <FaSearch />
//         </SearchIcon>
//         <SearchInput
//           type="text"
//           placeholder="Search by name or phone number..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </SearchContainer>
      
//       <FilterContainer>
//         <FilterButton 
//           active={filter === 'all'} 
//           onClick={() => setFilter('all')}
//         >
//           All Clients
//         </FilterButton>
//         <FilterButton 
//           active={filter === 'active'} 
//           onClick={() => setFilter('active')}
//         >
//           Active
//         </FilterButton>
//         <FilterButton 
//           active={filter === 'inactive'} 
//           onClick={() => setFilter('inactive')}
//         >
//           Inactive
//         </FilterButton>
//         <FilterButton 
//           active={filter === 'monthly'} 
//           onClick={() => setFilter('monthly')}
//         >
//           Monthly
//         </FilterButton>
//         <FilterButton 
//           active={filter === '3-months'} 
//           onClick={() => setFilter('3-months')}
//         >
//           3 Months
//         </FilterButton>
//         <FilterButton 
//           active={filter === '6-months'} 
//           onClick={() => setFilter('6-months')}
//         >
//           6 Months
//         </FilterButton>
//         <FilterButton 
//           active={filter === 'personal-trainer'} 
//           onClick={() => setFilter('personal-trainer')}
//         >
//           Personal Trainer
//         </FilterButton>
//       </FilterContainer>
      
//       {filteredClients.length === 0 ? (
//         <EmptyState>
//           <h3>No clients found</h3>
//           <p>Try adjusting your search or filters, or add a new client.</p>
//           <ActionButton onClick={handleAddClient}>
//             <FaPlus /> Add New Client
//           </ActionButton>
//         </EmptyState>
//       ) : (
//         <ClientsGrid>
//           {filteredClients.map(client => (
//             <ClientCard
//               key={client.id}
//               client={client}
//               onEdit={() => handleEditClient(client)}
//               onDelete={() => handleDeleteClick(client._id)}
//             />
//           ))}
//         </ClientsGrid>
//       )}
      
//       {/* Add Client Modal */}
//       <Modal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//       >
//         <ClientForm onClose={() => setShowAddModal(false)} />
//       </Modal>
      
//       {/* Edit Client Modal */}
//       <Modal
//         isOpen={showEditModal}
//         onClose={() => {
//           setShowEditModal(false)
//           setSelectedClient(null)
//         }}
//       >
//         <ClientForm 
//           client={selectedClient} 
//           onClose={() => {
//             setShowEditModal(false)
//             setSelectedClient(null)
//           }} 
//         />
//       </Modal>
      
//       {/* Delete Confirmation Modal */}
//       <Modal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false)
//           setSelectedClient(null)
//         }}
//       >
//         <DeleteConfirmation 
//           itemName={selectedClient ? selectedClient.name : 'this client'} 
//           onDelete={confirmDelete}
//           onCancel={() => {
//             setShowDeleteModal(false)
//             setSelectedClient(null)
//           }}
//         />
//       </Modal>
//     </ClientsContainer>
//   )
// }

// export default Clients

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaPlus, FaSearch, FaUser, FaCalendarAlt, FaCreditCard, FaDumbbell } from 'react-icons/fa'
import { useClient } from '../hooks/useClient'
import { useNotification } from '../hooks/useNotification'
import ClientCard from '../components/clients/ClientCard'
import ClientForm from '../components/clients/ClientForm'
import Modal from '../components/ui/Modal'
import DeleteConfirmation from '../components/ui/DeleteConfirmation'
import axios from 'axios'

const ClientsContainer = styled.div`
  padding: 20px 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`

const PageTitle = styled.h1`
  color: var(--text-primary);
  margin: 0;
  font-size: 32px;
  font-weight: 700;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: var(--primary);
  color: var(--secondary);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow-yellow);
  }
  
  svg {
    font-size: 16px;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  margin: 20px 0;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 45px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-light);
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: var(--glow-yellow);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
  font-size: 18px;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--secondary)' : 'var(--text-light)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary)' : 'rgba(255, 215, 0, 0.1)'};
  }
`

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 0;
  color: var(--text-light);
  opacity: 0.6;
  
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
`

const ClientDetailContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-top: 20px;
`

const ClientDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`

const ClientImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary);
  box-shadow: var(--glow-yellow);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ClientInfo = styled.div`
  flex: 1;
`

const ClientName = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: var(--text-primary);
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
  background-color: ${props => props.status === 'active' ? 'rgba(0, 255, 0, 0.15)' : 'rgba(255, 0, 0, 0.15)'};
  color: ${props => props.status === 'active' ? '#4caf50' : '#f44336'};
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`

const DetailCard = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius);
  padding: 15px;
  display: flex;
  flex-direction: column;
`

const DetailTitle = styled.h3`
  font-size: 14px;
  color: var(--text-light);
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: var(--primary);
  }
`

const DetailValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
`

const CloseDetailButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary);
    color: var(--secondary);
  }
`

const Clients = () => {
  const { clients: initialClients, deleteClient, fetchClients } = useClient()
  const { addNotification } = useNotification()
  
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientDetail, setClientDetail] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch clients from your backend API
  useEffect(() => {
    const getClients = async () => {
      try {
        setLoading(true)
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
        console.error('Error fetching clients:', error)
        addNotification({
          type: 'error',
          title: 'Failed to load clients',
          message: 'There was an error loading client data. Please try again.'
        })
        setLoading(false)
      }
    }
    
    getClients()
  }, [fetchClients, addNotification])

  // Update local clients state when initialClients changes
  // useEffect(() => {
  //   fetchClients();
  // }, [fetchClients]);
  
  const handleAddClient = () => {
    setShowAddModal(true)
  }
  
  const handleEditClient = (client) => {
    setSelectedClient(client)
    setShowEditModal(true)
  }
  
  const handleDeleteClick = (clientId) => {
    const client = clients.find(c => c._id === clientId)
    setSelectedClient(client)
    setShowDeleteModal(true)
  }
  
  const confirmDelete = () => {
    if (selectedClient) {
      deleteClient(selectedClient._id)
      addNotification({
        type: 'client',
        title: 'Client Deleted',
        message: `${selectedClient.name} has been removed from the system.`
      })
      setShowDeleteModal(false)
      setSelectedClient(null)
      
      // Close detail view if the deleted client was being viewed
      if (clientDetail && clientDetail._id === selectedClient._id) {
        setClientDetail(null)
      }
    }
  }

  


  // Function to view client details
  const handleViewDetails = async (clientId) => {
    try {
      setLoading(true)
      // In a real app, you'd fetch detailed client data
      const token = localStorage.getItem('energygym_token');
      const response = await axios.get(`http://localhost:5000/api/v1/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setClientDetail(response.data)
      
      // For now, let's use the client from our existing data
      const client = clients.find(c => c._id === clientId)
      
      // If we want to simulate fetching detailed data:
      // Let's add a short timeout to simulate an API call
      setTimeout(() => {
        setClientDetail(client)
        setLoading(false)
      }, 300)
    } catch (error) {
      console.error('Error fetching client details:', error)
      addNotification({
        type: 'error',
        title: 'Failed to load client details',
        message: 'There was an error loading detailed client information.'
      })
      setLoading(false)
    }
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const filteredClients = clients.filter(client => {
    // Apply search term filter
    const matchesSearch = client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.phone?.includes(searchTerm) ||
                          client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client._id?.includes(searchTerm);
    
    // Apply status/subscription filter
    let matchesFilter = true;
    
    // Make filters case-insensitive
    const clientStatus = client.status?.toLowerCase() || '';
    const membershipType = client.membershipType?.toLowerCase() || client.subscriptionType?.toLowerCase() || '';
    const hasTrainer = (client.personalTrainer === true || client.personalTrainer === 'Yes');
    
    if (filter === 'active') matchesFilter = clientStatus === 'active';
    if (filter === 'inactive') matchesFilter = clientStatus === 'inactive';
    if (filter === 'monthly') matchesFilter = membershipType === 'monthly';
    if (filter === '3-months') matchesFilter = membershipType === '3-months';
    if (filter === '6-months') matchesFilter = membershipType === '6-months';
    if (filter === 'personal-trainer') matchesFilter = hasTrainer;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <ClientsContainer>
      <Header>
        <PageTitle>Clients</PageTitle>
        <ActionButton onClick={handleAddClient}>
          <FaPlus /> Add New Client
        </ActionButton>
      </Header>
      
      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search by name, phone, email or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      <FilterContainer>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All Clients
        </FilterButton>
        <FilterButton 
          active={filter === 'active'} 
          onClick={() => setFilter('active')}
        >
          Active
        </FilterButton>
        <FilterButton 
          active={filter === 'inactive'} 
          onClick={() => setFilter('inactive')}
        >
          Inactive
        </FilterButton>
        <FilterButton 
          active={filter === 'monthly'} 
          onClick={() => setFilter('monthly')}
        >
          Monthly
        </FilterButton>
        <FilterButton 
          active={filter === '3-months'} 
          onClick={() => setFilter('3-months')}
        >
          3 Months
        </FilterButton>
        <FilterButton 
          active={filter === '6-months'} 
          onClick={() => setFilter('6-months')}
        >
          6 Months
        </FilterButton>
        <FilterButton 
          active={filter === 'personal-trainer'} 
          onClick={() => setFilter('personal-trainer')}
        >
          Personal Trainer
        </FilterButton>
      </FilterContainer>
      
      {/* Client Detail View */}
      {clientDetail && (
        <ClientDetailContainer>
          <ClientDetailHeader>
            <ClientImage>
              {clientDetail.image ? (
                <img src={clientDetail.image} alt={clientDetail.name} />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: 'var(--primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '42px',
                  color: 'var(--secondary)'
                }}>
                  {clientDetail.name.charAt(0)}
                </div>
              )}
            </ClientImage>
            <ClientInfo>
              <ClientName>{clientDetail.name}</ClientName>
              <p style={{ margin: '5px 0', color: 'var(--text-light)' }}>
                {clientDetail.email} • {clientDetail.phone}
              </p>
              <StatusBadge status={clientDetail.status}>{clientDetail.status}</StatusBadge>
            </ClientInfo>
            <div>
              <ActionButton onClick={() => handleEditClient(clientDetail)}>
                Edit Client
              </ActionButton>
            </div>
          </ClientDetailHeader>
          
          <DetailGrid>
            <DetailCard>
              <DetailTitle><FaUser /> Membership Type</DetailTitle>
              <DetailValue>{clientDetail.membershipType || clientDetail.subscriptionType || 'N/A'}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailTitle><FaCalendarAlt /> Membership Start</DetailTitle>
              <DetailValue>{formatDate(clientDetail.membershipStartDate)}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailTitle><FaCalendarAlt /> Membership End</DetailTitle>
              <DetailValue>{formatDate(clientDetail.membershipEndDate)}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailTitle><FaDumbbell /> Personal Trainer</DetailTitle>
              <DetailValue>{clientDetail.personalTrainer === true || clientDetail.personalTrainer === 'Yes' ? 'Yes' : 'No'}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailTitle><FaCreditCard /> Total Paid</DetailTitle>
              <DetailValue>₹{clientDetail.totalPaid || 0}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailTitle><FaCreditCard /> Due Amount</DetailTitle>
              <DetailValue style={{ color: clientDetail.dueAmount > 0 ? '#f44336' : '#4caf50' }}>
                ₹{clientDetail.dueAmount || 0}
              </DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailTitle><FaCalendarAlt /> Birthday</DetailTitle>
              <DetailValue>{formatDate(clientDetail.birthday)}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailTitle><FaCalendarAlt /> Created</DetailTitle>
              <DetailValue>{formatDate(clientDetail.createdAt)}</DetailValue>
            </DetailCard>
          </DetailGrid>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CloseDetailButton onClick={() => setClientDetail(null)}>
              Close Details
            </CloseDetailButton>
          </div>
        </ClientDetailContainer>
      )}
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-light)' }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '50%',
            borderTop: '4px solid var(--primary)',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ marginTop: '15px' }}>Loading clients...</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <EmptyState>
          <h3>No clients found</h3>
          <p>Try adjusting your search or filters, or add a new client.</p>
          <ActionButton onClick={handleAddClient}>
            <FaPlus /> Add New Client
          </ActionButton>
        </EmptyState>
      ) : (
        <ClientsGrid>
          {filteredClients.map(client => (
            <ClientCard
              key={client._id}
              client={client}
              onEdit={() => handleEditClient(client)}
              onDelete={() => handleDeleteClick(client._id)}
              onViewDetails={() => handleViewDetails(client._id)}
            />
          ))}
        </ClientsGrid>
      )}
      
      {/* Add Client Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <ClientForm onClose={() => setShowAddModal(false)} />
      </Modal>
      
      {/* Edit Client Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedClient(null)
        }}
      >
        <ClientForm 
          client={selectedClient} 
          onClose={() => {
            setShowEditModal(false)
            setSelectedClient(null)
          }} 
        />
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedClient(null)
        }}
      >
        <DeleteConfirmation 
          itemName={selectedClient ? selectedClient.name : 'this client'} 
          onDelete={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false)
            setSelectedClient(null)
          }}
        />
      </Modal>
    </ClientsContainer>
  )
}

export default Clients