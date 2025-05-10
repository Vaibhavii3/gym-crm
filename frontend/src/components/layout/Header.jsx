import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaBell, FaSun, FaMoon, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { useNotification } from '../../hooks/useNotification'
import NotificationDropdown from '../notifications/NotificationDropdown'

const HeaderContainer = styled.header`
  background-color: var(--secondary);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
    transform: translateY(-2px);
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--accent);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 0 2px var(--primary);
    transform: scale(1.05);
  }
`
const ProfileDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  // background-color: var(--secondary-light);
  background-color: #121212;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 200px;
  z-index: 10;
  overflow: hidden;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? '0' : '-10px'});
  transition: all 0.3s ease;
`

const DropdownItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-light);
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
  }
  
  svg {
    color: var(--primary);
  }
`

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { currentUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { unreadCount } = useNotification()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showProfileDropdown) setShowProfileDropdown(false)
  }

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown)
    if (showNotifications) setShowNotifications(false)
  }

  return (
    <HeaderContainer>
      <HeaderActions>
        <IconButton onClick={toggleNotifications} title="Notifications">
          <FaBell />
          {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
        </IconButton>
        
        <IconButton onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark-mode' ? <FaSun /> : <FaMoon />}
        </IconButton>
        
        <ProfileContainer>
          <Avatar 
            src={currentUser?.avatar} 
            alt={currentUser?.name}
            onClick={toggleProfileDropdown}
          />
          
          <ProfileDropdown show={showProfileDropdown}>
            <DropdownItem onClick={() => navigate('/settings')}>
              <FaUser />
              <span>Profile</span>
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </DropdownItem>
          </ProfileDropdown>
        </ProfileContainer>
      </HeaderActions>
      
      {showNotifications && (
        <NotificationDropdown 
          onClose={() => setShowNotifications(false)}
        />
      )}
    </HeaderContainer>
  )
}

export default Header