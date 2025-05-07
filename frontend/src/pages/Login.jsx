import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { FaUser, FaLock, FaDumbbell } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LoginBanner = styled.div`
  flex: 1;
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
    opacity: 0.3;
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.7));
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`

const BannerContent = styled.div`
  z-index: 2;
  text-align: center;
  max-width: 500px;
  padding: 0 20px;
`

const Logo = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 12px;
    font-size: 32px;
  }
`

const BannerTitle = styled.h1`
  color: white;
  font-size: 36px;
  margin-bottom: 16px;
  
  span {
    color: var(--primary);
  }
`

const BannerSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  margin-bottom: 30px;
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`

const FeatureItem = styled.li`
  color: white;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  
  &:before {
    content: '✓';
    display: block;
    margin-right: 10px;
    color: var(--primary);
    font-weight: bold;
  }
`

const LoginFormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  padding: 40px 20px;
`

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: var(--secondary-light);
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: formSlideIn 0.5s ease forwards;
  position: relative;
  overflow: hidden;
  
  @keyframes formSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
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
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, 
      rgba(255, 215, 0, 0), 
      rgba(255, 215, 0, 1), 
      rgba(255, 215, 0, 0)
    );
  }
`

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`

const Input = styled.input`
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

const InputIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
  font-size: 18px;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--primary);
  color: var(--secondary);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow-yellow);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
`

const ErrorMessage = styled.div`
  color: var(--error);
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
`

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    color: var(--primary);
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/'
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError('Invalid email or password')
      setLoading(false)
    }
  }
  
  return (
    <LoginContainer>
      <LoginBanner>
        <BannerContent>
          <Logo>
            <FaDumbbell /> EnergyGym
          </Logo>
          
          <BannerTitle>
            The Ultimate <span>Gym Management</span> Solution
          </BannerTitle>
          
          <BannerSubtitle>
            Streamline your gym operations with our all-in-one CRM system
          </BannerSubtitle>
          
          <FeatureList>
            <FeatureItem>Comprehensive client management</FeatureItem>
            <FeatureItem>Track memberships and renewals</FeatureItem>
            <FeatureItem>Send bulk SMS notifications</FeatureItem>
            <FeatureItem>Real-time dashboard analytics</FeatureItem>
            <FeatureItem>Secure and easy-to-use interface</FeatureItem>
          </FeatureList>
        </BannerContent>
      </LoginBanner>
      
      <LoginFormContainer>
        <LoginForm onSubmit={handleSubmit}>
          <FormTitle>Admin Login</FormTitle>
          
          <FormGroup>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </LoginForm>
        
        <ThemeToggle onClick={toggleTheme}>
          {theme === 'dark-mode' ? '☀️' : '🌙'}
        </ThemeToggle>
      </LoginFormContainer>
    </LoginContainer>
  )
}

export default Login