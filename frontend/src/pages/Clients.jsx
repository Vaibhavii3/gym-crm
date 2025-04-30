import { useState } from 'react'
import styled from 'styled-components'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { useClient } from '../hooks/useClient'
import { useNotification } from '../hooks/useNotification'
import ClientCard from '../components/clients/ClientCard'
import ClientForm from '../components/clients/ClientForm'
import Modal from '../components/ui/Modal'
import DeleteConfirmation from '../components/ui/DeleteConfirmation'

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

const Clients = () => {
  const { clients, deleteClient } = useClient()
  const { addNotification } = useNotification()
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  
  const handleAddClient = () => {
    setShowAddModal(true)
  }
  
  const handleEditClient = (client) => {
    setSelectedClient(client)
    setShowEditModal(true)
  }
  
  const handleDeleteClick = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    setSelectedClient(client)
    setShowDeleteModal(true)
  }
  
  const confirmDelete = () => {
    if (selectedClient) {
      deleteClient(selectedClient.id)
      addNotification({
        type: 'client',
        title: 'Client Deleted',
        message: `${selectedClient.name} has been removed from the system.`
      })
      setShowDeleteModal(false)
      setSelectedClient(null)
    }
  }
  
  const filteredClients = clients.filter(client => {
    // Apply search term filter
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    // Apply status/subscription filter
    let matchesFilter = true;
    if (filter === 'active') matchesFilter = client.status === 'Active';
    if (filter === 'inactive') matchesFilter = client.status === 'Inactive';
    if (filter === 'monthly') matchesFilter = client.subscriptionType === 'Monthly';
    if (filter === '3-months') matchesFilter = client.subscriptionType === '3 Months';
    if (filter === '6-months') matchesFilter = client.subscriptionType === '6 Months';
    if (filter === 'personal-trainer') matchesFilter = client.personalTrainer === 'Yes';
    
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
          placeholder="Search by name or phone number..."
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
      
      {filteredClients.length === 0 ? (
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
              key={client.id}
              client={client}
              onEdit={() => handleEditClient(client)}
              onDelete={() => handleDeleteClick(client.id)}
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