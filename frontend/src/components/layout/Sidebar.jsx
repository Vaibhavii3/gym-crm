import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FaTachometerAlt, FaUsers, FaSms, FaCog } from 'react-icons/fa'

const SidebarContainer = styled.aside`
  background-color: var(--secondary);
  width: 240px;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
  overflow-y: auto;
  transition: transform 0.3s ease;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(255, 215, 0, 0.1),
      rgba(255, 215, 0, 0.3),
      rgba(255, 215, 0, 0.1)
    );
  }
  
  @media (max-width: 768px) {
    transform: translateX(-100%);
  }
`

const Logo = styled.div`
  padding: 24px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(to right, 
      rgba(255, 215, 0, 0),
      rgba(255, 215, 0, 0.5),
      rgba(255, 215, 0, 0)
    );
  }
`

const LogoText = styled.h1`
  color: var(--primary);
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
  position: relative;
  
  span {
    font-weight: 300;
    opacity: 0.8;
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    bottom: -8px;
    left: 0;
    background: linear-gradient(to right, 
      rgba(255, 215, 0, 0),
      rgba(255, 215, 0, 1),
      rgba(255, 215, 0, 0)
    );
  }
`

const NavMenu = styled.nav`
  padding: 20px 0;
`

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 14px 24px;
  color: var(--text-light);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 5px;
  font-weight: 500;
  
  svg {
    margin-right: 12px;
    color: var(--primary);
    font-size: 18px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
    color: var(--primary);
    
    svg {
      transform: translateX(3px);
    }
  }
  
  &.active {
    background-color: rgba(255, 215, 0, 0.15);
    color: var(--primary);
    font-weight: 600;
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background-color: var(--primary);
    }
  }
`

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>
        <LogoText>Energy<span>Gym</span></LogoText>
      </Logo>
      
      <NavMenu>
        <NavItem to="/" end>
          <FaTachometerAlt />
          Dashboard
        </NavItem>
        <NavItem to="/clients">
          <FaUsers />
          Clients
        </NavItem>
        <NavItem to="/bulk-sms">
          <FaSms />
          Bulk SMS
        </NavItem>
        <NavItem to="/settings">
          <FaCog />
          Settings
        </NavItem>
      </NavMenu>
    </SidebarContainer>
  )
}

export default Sidebar