import styled from 'styled-components'
import { format } from 'date-fns'

const DetailContainer = styled.div`
  background-color: var(--secondary-light);
  border-radius: var(--border-radius);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 24px;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

const ClientInfo = styled.div`
  flex: 1;
`

const ClientName = styled.h2`
  margin: 0 0 5px;
  color: var(--text-light);
  font-size: 28px;
  font-weight: 700;
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  background-color: ${({ status }) => status === 'Active' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  color: ${({ status }) => status === 'Active' ? '#4CAF50' : '#F44336'};
  border: 1px solid ${({ status }) => status === 'Active' ? '#4CAF50' : '#F44336'};
`

const JoinDate = styled.p`
  margin: 0;
  color: var(--text-light);
  opacity: 0.8;
  font-size: 14px;
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const DetailSection = styled.div`
  margin-bottom: 16px;
`

const SectionTitle = styled.h3`
  color: var(--primary);
  font-size: 18px;
  margin: 0 0 12px;
  font-weight: 600;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--primary), transparent);
  }
`

const DetailItem = styled.div`
  margin-bottom: 8px;
  display: flex;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const DetailLabel = styled.span`
  min-width: 140px;
  font-weight: 500;
  color: var(--text-light);
  opacity: 0.9;
`

const DetailValue = styled.span`
  color: var(--text-light);
`

const Separator = styled.div`
  height: 1px;
  background: linear-gradient(to right, 
    rgba(255, 215, 0, 0.1), 
    rgba(255, 215, 0, 0.3), 
    rgba(255, 215, 0, 0.1)
  );
  margin: 20px 0 30px;
`

const ClientDetail = ({ client }) => {
  if (!client) return null
  
  return (
    <DetailContainer>
      <Header>
        <ProfileImage src={client.picture} alt={client.name} />
        <ClientInfo>
          <ClientName>{client.name}</ClientName>
          <StatusBadge status={client.status}>{client.status}</StatusBadge>
          <JoinDate>
            Member since {format(new Date(client.joiningDate), 'MMMM d, yyyy')}
          </JoinDate>
        </ClientInfo>
      </Header>
      
      <DetailGrid>
        <DetailSection>
          <SectionTitle>Personal Information</SectionTitle>
          <DetailItem>
            <DetailLabel>Age:</DetailLabel>
            <DetailValue>{client.age} years</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Date of Birth:</DetailLabel>
            <DetailValue>
              {client.dob ? format(new Date(client.dob), 'MMMM d, yyyy') : 'Not provided'}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Weight:</DetailLabel>
            <DetailValue>{client.weight} kg</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Phone:</DetailLabel>
            <DetailValue>{client.phone}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Address:</DetailLabel>
            <DetailValue>{client.address}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Aadhar Number:</DetailLabel>
            <DetailValue>{client.aadharNumber}</DetailValue>
          </DetailItem>
        </DetailSection>
        
        <DetailSection>
          <SectionTitle>Membership Details</SectionTitle>
          <DetailItem>
            <DetailLabel>Subscription:</DetailLabel>
            <DetailValue>{client.subscriptionType}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Personal Trainer:</DetailLabel>
            <DetailValue>{client.personalTrainer}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{client.status}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Renewal Date:</DetailLabel>
            <DetailValue>
              {(() => {
                const joinDate = new Date(client.joiningDate)
                let renewalDate = new Date(joinDate)
                
                switch (client.subscriptionType) {
                  case 'Monthly':
                    renewalDate.setMonth(joinDate.getMonth() + 1)
                    break
                  case '3 Months':
                    renewalDate.setMonth(joinDate.getMonth() + 3)
                    break
                  case '6 Months':
                    renewalDate.setMonth(joinDate.getMonth() + 6)
                    break
                  default:
                    return 'Unknown'
                }
                
                return format(renewalDate, 'MMMM d, yyyy')
              })()}
            </DetailValue>
          </DetailItem>
        </DetailSection>
      </DetailGrid>
      
      <Separator />
      
      <DetailSection>
        <SectionTitle>Medical Information</SectionTitle>
        <DetailItem style={{ display: 'block', marginTop: '10px' }}>
          <DetailValue>
            {client.medicalProblems || 'No medical problems reported.'}
          </DetailValue>
        </DetailItem>
      </DetailSection>
    </DetailContainer>
  )
}

export default ClientDetail