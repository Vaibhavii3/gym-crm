import { useState } from 'react'
import styled from 'styled-components'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'

const SettingsContainer = styled.div`
  padding: 20px 0;
`

const Header = styled.div`
  margin-bottom: 30px;
`

const PageTitle = styled.h1`
  color: var(--text-primary);
  margin: 0 0 10px;
  font-size: 32px;
  font-weight: 700;
`

const PageDescription = styled.p`
  color: var(--text-primary);
  opacity: 0.8;
  margin: 0;
  font-size: 16px;
`

const SettingsSection = styled.div`
  background-color: var(--secondary-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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

const SectionTitle = styled.h2`
  color: var(--text-light);
  margin-top: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
  
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

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
`

const ToggleLabel = styled.div`
  color: var(--text-light);
  font-weight: 500;
  flex: 1;
`

const ThemeSwitch = styled.div`
  display: flex;
  background-color: var(--secondary);
  border-radius: 30px;
  border: 2px solid var(--primary);
  height: 40px;
  position: relative;
  width: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
`

const ToggleOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-light)'};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  z-index: 1;
  
  svg {
    font-size: 16px;
  }
`

const ToggleThumb = styled.div`
  position: absolute;
  width: 50%;
  height: calc(100% - 4px);
  border-radius: 28px;
  background-color: rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  top: 2px;
  left: ${props => props.position === 'right' ? '50%' : '2px'};
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary);
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h3`
  color: var(--text-light);
  margin: 0 0 5px;
  font-size: 20px;
`

const ProfileRole = styled.div`
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 10px;
`

const ProfileDetail = styled.div`
  color: var(--text-light);
  opacity: 0.8;
  font-size: 14px;
  margin-bottom: 5px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const Button = styled.button`
  padding: 10px 16px;
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
`

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const { currentUser } = useAuth()
  
  return (
    <SettingsContainer>
      <Header>
        <PageTitle>Settings</PageTitle>
        <PageDescription>
          Customize your EnergyGym CRM experience
        </PageDescription>
      </Header>
      
      <SettingsSection>
        <SectionTitle>Profile</SectionTitle>
        <ProfileContainer>
          <ProfileImage src={currentUser.image} alt={currentUser.name} />
          <ProfileInfo>
            <ProfileName>{currentUser.name}</ProfileName>
            <ProfileRole>{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</ProfileRole>
            <ProfileDetail>Email: {currentUser.email}</ProfileDetail>
            <ProfileDetail>ID: {currentUser.id}</ProfileDetail>
          </ProfileInfo>
        </ProfileContainer>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>Appearance</SectionTitle>
        <ThemeToggleContainer>
          <ToggleLabel>Theme Mode</ToggleLabel>
          <ThemeSwitch onClick={toggleTheme}>
            <ToggleOption active={theme === 'light-mode'}>
              <FaSun />
            </ToggleOption>
            <ToggleOption active={theme === 'dark-mode'}>
              <FaMoon />
            </ToggleOption>
            <ToggleThumb position={theme === 'dark-mode' ? 'right' : 'left'} />
          </ThemeSwitch>
        </ThemeToggleContainer>
      </SettingsSection>
    </SettingsContainer>
  )
}

export default Settings