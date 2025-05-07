import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'
import { useClient } from '../hooks/useClient'
import { useNotification } from '../hooks/useNotification'
import ClientDetail from '../components/clients/ClientDetail'
import ClientForm from '../components/clients/ClientForm'
import Modal from '../components/ui/Modal'
import DeleteConfirmation from '../components/ui/DeleteConfirmation'

const DetailsContainer = styled.div`
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

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
    border-color: var(--primary);
    color: var(--primary);
  }
  
  svg {
    font-size: 14px;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${props => props.danger ? 'var(--error)' : 'var(--primary)'};
  color: ${props => props.danger ? 'white' : 'var(--secondary)'};
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.danger 
      ? '0 0 10px rgba(244, 67, 54, 0.5)' 
      : 'var(--glow-yellow)'};
  }
  
  svg {
    font-size: 14px;
  }
`

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 50px 0;
  
  h2 {
    color: var(--text-light);
    margin-bottom: 20px;
  }
  
  p {
    color: var(--text-light);
    opacity: 0.8;
    margin-bottom: 30px;
  }
`

const ClientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getClient, deleteClient } = useClient()
  const { addNotification } = useNotification()
  
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const client = getClient(id)
  
  const handleEditClient = () => {
    setShowEditModal(true)
  }
  
  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }
  
  const confirmDelete = () => {
    if (client) {
      deleteClient(client._id)
      addNotification({
        type: 'client',
        title: 'Client Deleted',
        message: `${client.name} has been removed from the system.`
      })
      navigate('/clients')
    }
  }
  
  if (!client) {
    return (
      <DetailsContainer>
        <NotFoundMessage>
          <h2>Client Not Found</h2>
          <p>The client you're looking for doesn't exist or has been deleted.</p>
          <BackButton onClick={() => navigate('/clients')}>
            <FaArrowLeft /> Back to Clients
          </BackButton>
        </NotFoundMessage>
      </DetailsContainer>
    )
  }
  
  return (
    <DetailsContainer>
      <Header>
        <BackButton onClick={() => navigate('/clients')}>
          <FaArrowLeft /> Back to Clients
        </BackButton>
        
        <ActionButtons>
          <ActionButton onClick={handleEditClient}>
            <FaEdit /> Edit Client
          </ActionButton>
          <ActionButton danger onClick={handleDeleteClick}>
            <FaTrash /> Delete Client
          </ActionButton>
        </ActionButtons>
      </Header>
      
      <ClientDetail client={client} />
      
      {/* Edit Client Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <ClientForm 
          client={client} 
          onClose={() => setShowEditModal(false)} 
        />
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <DeleteConfirmation 
          itemName={client.name} 
          onDelete={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      </Modal>
    </DetailsContainer>
  )
}

export default ClientDetails