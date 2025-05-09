import styled from 'styled-components'
import { FaCheckDouble, FaTrash, FaBell } from 'react-icons/fa'
import { format } from 'date-fns'
import { useNotification } from '../../hooks/useNotification'

const DropdownContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 350px;
  max-height: 500px;
  // background-color: var(--secondary-light);
  background-color: #121212;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
  animation: slideIn 0.3s ease forwards;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 480px) {
    width: 90vw;
    right: 5vw;
  }
`

const DropdownHeader = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  background-color: var(--secondary);
`

const HeaderTitle = styled.h3`
  margin: 0;
  color: var(--primary);
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
  }
`

const NotificationsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
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

const NotificationItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  display: flex;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.unread ? 'rgba(255, 215, 0, 0.05)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
  }
`

const NotificationContent = styled.div`
  flex: 1;
`

const NotificationTitle = styled.h4`
  margin: 0 0 5px;
  color: ${props => props.unread ? 'var(--primary)' : 'var(--text-light)'};
  font-size: 16px;
  font-weight: ${props => props.unread ? '600' : '500'};
`

const NotificationMessage = styled.p`
  margin: 0 0 5px;
  color: var(--text-light);
  opacity: 0.9;
  font-size: 14px;
`

const NotificationTime = styled.div`
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.6;
`

const EmptyNotifications = styled.div`
  padding: 30px 15px;
  text-align: center;
  color: var(--text-light);
  opacity: 0.6;
  
  svg {
    font-size: 32px;
    margin-bottom: 10px;
    color: var(--primary);
    opacity: 0.5;
  }
`

const NotificationTypeIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${props => {
    switch (props.type) {
      case 'payment':
        return 'rgba(76, 175, 80, 0.1)';
      case 'renewal':
        return 'rgba(255, 152, 0, 0.1)';
      case 'client':
        return 'rgba(33, 150, 243, 0.1)';
      case 'alert':
        return 'rgba(244, 67, 54, 0.1)';
      default:
        return 'rgba(255, 215, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'payment':
        return 'var(--success)';
      case 'renewal':
        return 'var(--warning)';
      case 'client':
        return '#2196F3';
      case 'alert':
        return 'var(--error)';
      default:
        return 'var(--primary)';
    }
  }};
  
  svg {
    font-size: 18px;
  }
`

const getNotificationIcon = (type) => {
  switch (type) {
    case 'payment':
      return '💰';
    case 'renewal':
      return '🔄';
    case 'client':
      return '👤';
    case 'alert':
      return '⚠️';
    default:
      return '📌';
  }
}

const NotificationDropdown = ({ onClose }) => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    clearNotification, 
    clearAllNotifications 
  } = useNotification()

  const handleItemClick = (id) => {
    markAsRead(id)
  }

  return (
    <DropdownContainer>
      <DropdownHeader>
        <HeaderTitle>
          <FaBell /> Notifications
        </HeaderTitle>
        <HeaderActions>
          <ActionButton title="Mark all as read" onClick={markAllAsRead}>
            <FaCheckDouble />
          </ActionButton>
          <ActionButton title="Clear all" onClick={clearAllNotifications}>
            <FaTrash />
          </ActionButton>
        </HeaderActions>
      </DropdownHeader>
      
      <NotificationsList>
        {notifications.length === 0 ? (
          <EmptyNotifications>
            <FaBell />
            <p>No notifications yet</p>
          </EmptyNotifications>
        ) : (
          notifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              unread={!notification.read}
              onClick={() => handleItemClick(notification.id)}
            >
              <NotificationTypeIcon type={notification.type}>
                {getNotificationIcon(notification.type)}
              </NotificationTypeIcon>
              
              <NotificationContent>
                <NotificationTitle unread={!notification.read}>
                  {notification.title}
                </NotificationTitle>
                <NotificationMessage>
                  {notification.message}
                </NotificationMessage>
                <NotificationTime>
                  {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                </NotificationTime>
              </NotificationContent>
            </NotificationItem>
          ))
        )}
      </NotificationsList>
    </DropdownContainer>
  )
}

export default NotificationDropdown