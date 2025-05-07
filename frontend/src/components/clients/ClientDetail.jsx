import styled from 'styled-components'
import { format, isValid } from 'date-fns'

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
  display: flex;
  align-items: center;
  gap: 10px;
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  background-color: ${({ status }) => 
    status === 'active' ? 'rgba(76, 175, 80, 0.2)' : 
    status === 'pending' ? 'rgba(255, 152, 0, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  color: ${({ status }) => 
    status === 'active' ? '#4CAF50' : 
    status === 'pending' ? '#FF9800' : '#F44336'};
  border: 1px solid ${({ status }) => 
    status === 'active' ? '#4CAF50' : 
    status === 'pending' ? '#FF9800' : '#F44336'};
`

const MembershipBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(63, 81, 181, 0.1);
  color: #3F51B5;
  border: 1px solid #3F51B5;
  margin-left: 10px;
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
  word-break: break-word;
`

const MultilineDetailValue = styled(DetailValue)`
  white-space: pre-line;
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

const MembershipDates = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 15px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
`

const DateBlock = styled.div`
  text-align: center;
`

const DateLabel = styled.div`
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.8;
  margin-bottom: 4px;
`

const DateValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-light);
`

const PaymentCard = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const PaymentLabel = styled.span`
  color: var(--text-light);
  opacity: 0.9;
`

const PaymentValue = styled.span`
  font-weight: 600;
  color: var(--text-light);
`

const PaymentTotal = styled(PaymentValue)`
  color: ${props => props.due > 0 ? '#F44336' : '#4CAF50'};
  font-size: 18px;
`

const IdBadge = styled.span`
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-light);
  opacity: 0.6;
  font-family: monospace;
`

// Helper function to safely format dates
const formatDate = (dateString) => {
  if (!dateString) return 'Not provided';
  
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMMM d, yyyy') : 'Invalid date';
};

// Helper function to format date with time
const formatDateTime = (dateString) => {
  if (!dateString) return 'Not provided';
  
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMM d, yyyy h:mm a') : 'Invalid date';
};

// Calculate age if birthday is available
const calculateAge = (birthdayString) => {
  if (!birthdayString) return 'Not provided';
  
  const birthday = new Date(birthdayString);
  if (!isValid(birthday)) return 'Invalid date';
  
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  
  return `${age} years`;
};

// Calculate days left until renewal
const calculateDaysLeft = (endDateString) => {
  if (!endDateString) return 'N/A';
  
  const endDate = new Date(endDateString);
  if (!isValid(endDate)) return 'Invalid date';
  
  const today = new Date();
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Expired';
  if (diffDays === 0) return 'Today';
  return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
};

// Get membership duration text
const getMembershipDuration = (type) => {
  if (!type) return 'Not specified';
  
  const typeLower = type.toLowerCase();
  
  if (typeLower.includes('month')) {
    if (typeLower.includes('1') || typeLower === 'monthly') return '1 Month';
    if (typeLower.includes('3')) return '3 Months';
    if (typeLower.includes('6')) return '6 Months';
  }
  
  if (typeLower.includes('annual')) return '12 Months';
  
  return type; // Return as is if not recognized
};

const ClientDetail = ({ client }) => {
  if (!client) return <p>No client data available</p>;
  
  // Calculate membership status
  const today = new Date();
  const endDate = client.membershipEndDate ? new Date(client.membershipEndDate) : null;
  let membershipStatus = 'Unknown';
  
  if (endDate && isValid(endDate)) {
    if (today > endDate) {
      membershipStatus = 'Expired';
    } else {
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      membershipStatus = daysLeft <= 7 ? 'Expiring Soon' : 'Active';
    }
  }
  
  return (
    <DetailContainer>
      <Header>
        <ProfileImage 
          src={client.image || '/default-profile.png'} 
          alt={client.name || 'Client'} 
          onError={(e) => {
            e.target.src = '/default-profile.png';
          }}
        />
        <ClientInfo>
          <ClientName>
            {client.name || 'Unknown Client'}
            {client.membershipType && (
              <MembershipBadge>{getMembershipDuration(client.membershipType)}</MembershipBadge>
            )}
          </ClientName>
          <StatusBadge status={client.status || 'inactive'}>
            {client.status || 'inactive'}
          </StatusBadge>
          <JoinDate>
            Member since {formatDate(client.membershipStartDate)}
            {client.personalTrainer && ' • Personal Trainer'}
          </JoinDate>
          <IdBadge>ID: {client._id}</IdBadge>
        </ClientInfo>
      </Header>
      
      {/* Membership timeline section */}
      <DetailSection>
        <SectionTitle>Membership Timeline</SectionTitle>
        <MembershipDates>
          <DateBlock>
            <DateLabel>Start Date</DateLabel>
            <DateValue>{formatDate(client.membershipStartDate)}</DateValue>
          </DateBlock>
          <DateBlock>
            <DateLabel>End Date</DateLabel>
            <DateValue>{formatDate(client.membershipEndDate)}</DateValue>
          </DateBlock>
          <DateBlock>
            <DateLabel>Days Left</DateLabel>
            <DateValue>{client.membershipEndDate ? calculateDaysLeft(client.membershipEndDate) : 'N/A'}</DateValue>
          </DateBlock>
          <DateBlock>
            <DateLabel>Status</DateLabel>
            <DateValue>{membershipStatus}</DateValue>
          </DateBlock>
        </MembershipDates>
      </DetailSection>
      
      <DetailGrid>
        <DetailSection>
          <SectionTitle>Personal Information</SectionTitle>
          <DetailItem>
            <DetailLabel>Age:</DetailLabel>
            <DetailValue>
              {client.age || (client.birthday ? calculateAge(client.birthday) : 'Not provided')}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Date of Birth:</DetailLabel>
            <DetailValue>{formatDate(client.birthday)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Email:</DetailLabel>
            <DetailValue>{client.email || 'Not provided'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Phone:</DetailLabel>
            <DetailValue>{client.phone || 'Not provided'}</DetailValue>
          </DetailItem>
          {client.weight && (
            <DetailItem>
              <DetailLabel>Weight:</DetailLabel>
              <DetailValue>{client.weight} kg</DetailValue>
            </DetailItem>
          )}
          {client.address && (
            <DetailItem>
              <DetailLabel>Address:</DetailLabel>
              <MultilineDetailValue>{client.address}</MultilineDetailValue>
            </DetailItem>
          )}
          {client.aadharNumber && (
            <DetailItem>
              <DetailLabel>Aadhar Number:</DetailLabel>
              <DetailValue>{client.aadharNumber}</DetailValue>
            </DetailItem>
          )}
        </DetailSection>
        
        <DetailSection>
          <SectionTitle>Membership Details</SectionTitle>
          <DetailItem>
            <DetailLabel>Membership:</DetailLabel>
            <DetailValue>{client.membershipType || 'Not specified'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Personal Trainer:</DetailLabel>
            <DetailValue>{client.personalTrainer ? 'Yes' : 'No'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{client.status || 'Unknown'}</DetailValue>
          </DetailItem>
          {client.medicalProblems && (
            <DetailItem>
              <DetailLabel>Medical Info:</DetailLabel>
              <MultilineDetailValue>{client.medicalProblems}</MultilineDetailValue>
            </DetailItem>
          )}
        </DetailSection>
      </DetailGrid>
      
      <Separator />
      
      <DetailSection>
        <SectionTitle>Payment Information</SectionTitle>
        <PaymentCard>
          <PaymentRow>
            <PaymentLabel>Total Paid:</PaymentLabel>
            <PaymentValue>{client.totalPaid ? `₹${client.totalPaid.toLocaleString()}` : '₹0'}</PaymentValue>
          </PaymentRow>
          <PaymentRow>
            <PaymentLabel>Due Amount:</PaymentLabel>
            <PaymentValue style={{ color: client.dueAmount > 0 ? '#F44336' : 'inherit' }}>
              {client.dueAmount ? `₹${client.dueAmount.toLocaleString()}` : '₹0'}
            </PaymentValue>
          </PaymentRow>
          <PaymentRow>
            <PaymentLabel>Total Amount:</PaymentLabel>
            <PaymentTotal due={client.dueAmount > 0}>
              {`₹${((client.totalPaid || 0) + (client.dueAmount || 0)).toLocaleString()}`}
            </PaymentTotal>
          </PaymentRow>
        </PaymentCard>
      </DetailSection>
      
    </DetailContainer>
  )
}

export default ClientDetail