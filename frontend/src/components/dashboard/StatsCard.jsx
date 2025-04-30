import styled from 'styled-components'

const CardContainer = styled.div`
  background-color: var(--secondary-light);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 70%, rgba(255, 215, 0, 0.05) 100%);
    z-index: 0;
  }
`

const Title = styled.h3`
  font-size: 16px;
  color: var(--text-light);
  opacity: 0.9;
  margin: 0 0 16px;
  font-weight: 500;
  position: relative;
  z-index: 2;
`

const Value = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
  
  /* Create a 3D text effect */
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2),
               0 2px 0 rgba(0, 0, 0, 0.2),
               0 3px 0 rgba(0, 0, 0, 0.2);
`

const Description = styled.p`
  font-size: 14px;
  color: var(--text-light);
  opacity: 0.7;
  margin: 0;
  position: relative;
  z-index: 2;
`

const IconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
  font-size: 24px;
  color: var(--primary);
  opacity: 0.8;
`

const StatsCard = ({ title, value, description, icon }) => {
  return (
    <CardContainer>
      <IconContainer>{icon}</IconContainer>
      <Title>{title}</Title>
      <Value>{value}</Value>
      <Description>{description}</Description>
    </CardContainer>
  )
}

export default StatsCard