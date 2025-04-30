import styled from 'styled-components'
import { FaExclamationTriangle } from 'react-icons/fa'

const Container = styled.div`
  padding: 30px;
  text-align: center;
`

const IconContainer = styled.div`
  font-size: 48px;
  color: var(--warning);
  margin-bottom: 20px;
`

const Title = styled.h3`
  color: var(--text-light);
  margin-bottom: 15px;
  font-size: 24px;
`

const Message = styled.p`
  color: var(--text-light);
  opacity: 0.8;
  margin-bottom: 30px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`

const CancelButton = styled(Button)`
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid var(--border-color);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const DeleteButton = styled(Button)`
  background-color: var(--error);
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
  }
`

const DeleteConfirmation = ({ itemName, onDelete, onCancel }) => {
  return (
    <Container>
      <IconContainer>
        <FaExclamationTriangle />
      </IconContainer>
      
      <Title>Confirm Deletion</Title>
      
      <Message>
        Are you sure you want to delete {itemName}? This action cannot be undone.
      </Message>
      
      <ButtonsContainer>
        <CancelButton onClick={onCancel}>
          Cancel
        </CancelButton>
        <DeleteButton onClick={onDelete}>
          Delete
        </DeleteButton>
      </ButtonsContainer>
    </Container>
  )
}

export default DeleteConfirmation