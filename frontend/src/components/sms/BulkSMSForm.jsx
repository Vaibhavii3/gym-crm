import { useState } from 'react'
import styled from 'styled-components'
import { useClient } from '../../hooks/useClient'
import { useNotification } from '../../hooks/useNotification'

const FormContainer = styled.div`
  background-color: var(--secondary-light);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary);
    z-index: 1;
  }
`

const FormTitle = styled.h2`
  color: var(--text-light);
  margin-top: 0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(255, 215, 0, 0.5),
      rgba(255, 215, 0, 0)
    );
    margin-left: 15px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormGroup = styled.div`
  margin-bottom: 0;
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-light);
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-light);
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: var(--glow-yellow);
  }
`

const ClientSelection = styled.div`
  margin-top: 20px;
`

const SelectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary);
`

const CheckboxLabel = styled.label`
  color: var(--text-light);
  cursor: pointer;
`

const ClientList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: rgba(0, 0, 0, 0.1);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary-dark);
    border-radius: 3px;
  }
`

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.05);
  }
`

const ClientImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary);
`

const ClientInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ClientName = styled.div`
  color: var(--text-light);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ClientPhone = styled.div`
  color: var(--text-light);
  opacity: 0.7;
  font-size: 12px;
`

const SelectedCount = styled.div`
  color: var(--primary);
  font-weight: 500;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  background-color: var(--primary);
  color: var(--secondary);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow-yellow);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
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

const BulkSMSForm = () => {
  const { clients } = useClient()
  const { addNotification } = useNotification()
  
  const [message, setMessage] = useState('')
  const [selectedClients, setSelectedClients] = useState([])
  const [filter, setFilter] = useState('all')
  
  const filteredClients = clients.filter(client => {
    if (filter === 'all') return true
    if (filter === 'active') return client.status === 'Active'
    if (filter === 'inactive') return client.status === 'Inactive'
    if (filter === 'personal-trainer') return client.personalTrainer === 'Yes'
    if (filter === 'no-trainer') return client.personalTrainer === 'No'
    if (filter === 'monthly') return client.subscriptionType === 'Monthly'
    if (filter === '3-months') return client.subscriptionType === '3 Months'
    if (filter === '6-months') return client.subscriptionType === '6 Months'
    return true
  })
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClients(filteredClients.map(client => client.id))
    } else {
      setSelectedClients([])
    }
  }
  
  const handleClientSelect = (clientId) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId)
      } else {
        return [...prev, clientId]
      }
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedClients.length === 0 || message.trim() === '') {
      return
    }
    
    // In a real app, this would send the SMS to the selected clients
    // Here we're just simulating the action
    
    const selectedClientNames = clients
      .filter(client => selectedClients.includes(client.id))
      .map(client => client.name)
      .join(', ')
    
    addNotification({
      type: 'sms',
      title: 'Bulk SMS Sent',
      message: `SMS sent to ${selectedClients.length} clients: ${selectedClientNames.substring(0, 50)}${selectedClientNames.length > 50 ? '...' : ''}`
    })
    
    // Reset form
    setMessage('')
    setSelectedClients([])
    
    // Show success message
    alert(`SMS sent successfully to ${selectedClients.length} clients!`)
  }
  
  return (
    <FormContainer>
      <FormTitle>Send Bulk SMS</FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            required
          />
        </FormGroup>
        
        <ClientSelection>
          <SelectionHeader>
            <Label>Select Recipients</Label>
            <SelectAllContainer>
              <Checkbox
                type="checkbox"
                id="selectAll"
                checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                onChange={handleSelectAll}
              />
              <CheckboxLabel htmlFor="selectAll">Select All</CheckboxLabel>
            </SelectAllContainer>
          </SelectionHeader>
          
          <FilterContainer>
            <FilterButton 
              type="button" 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
            >
              All Clients
            </FilterButton>
            <FilterButton 
              type="button" 
              active={filter === 'active'} 
              onClick={() => setFilter('active')}
            >
              Active Only
            </FilterButton>
            <FilterButton 
              type="button" 
              active={filter === 'inactive'} 
              onClick={() => setFilter('inactive')}
            >
              Inactive Only
            </FilterButton>
            <FilterButton 
              type="button" 
              active={filter === 'personal-trainer'} 
              onClick={() => setFilter('personal-trainer')}
            >
              With Personal Trainer
            </FilterButton>
            <FilterButton 
              type="button" 
              active={filter === 'monthly'} 
              onClick={() => setFilter('monthly')}
            >
              Monthly Subscription
            </FilterButton>
          </FilterContainer>
          
          <ClientList>
            {filteredClients.map(client => (
              <ClientItem key={client.id}>
                <Checkbox
                  type="checkbox"
                  id={`client-${client.id}`}
                  checked={selectedClients.includes(client.id)}
                  onChange={() => handleClientSelect(client.id)}
                />
                <ClientImage src={client.picture} alt={client.name} />
                <ClientInfo>
                  <ClientName>{client.name}</ClientName>
                  <ClientPhone>{client.phone}</ClientPhone>
                </ClientInfo>
              </ClientItem>
            ))}
          </ClientList>
          
          <SelectedCount>
            {selectedClients.length} client{selectedClients.length !== 1 ? 's' : ''} selected
          </SelectedCount>
        </ClientSelection>
        
        <ButtonContainer>
          <Button 
            type="submit" 
            disabled={selectedClients.length === 0 || message.trim() === ''}
          >
            Send SMS
          </Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  )
}

export default BulkSMSForm