import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
  background-color: var(--background);
`

const NotFoundTitle = styled.h1`
  font-size: 120px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(to right, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 5px;
  line-height: 1;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`

const NotFoundSubtitle = styled.h2`
  font-size: 28px;
  color: var(--text-primary);
  margin: 20px 0 30px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const NotFoundText = styled.p`
  font-size: 18px;
  color: var(--text-primary);
  opacity: 0.8;
  margin: 0 0 40px;
  max-width: 600px;
`

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  background-color: var(--primary);
  color: var(--secondary);
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow-yellow);
  }
`

const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
      <NotFoundText>
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </NotFoundText>
      <Button onClick={() => navigate('/')}>
        Return to Dashboard
      </Button>
    </NotFoundContainer>
  )
}

export default NotFound