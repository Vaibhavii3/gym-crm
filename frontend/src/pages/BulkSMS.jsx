import styled from 'styled-components'
import BulkSMSForm from '../components/sms/BulkSMSForm'

const SMSContainer = styled.div`
  padding: 20px 0;
`

const Header = styled.div`
  margin-bottom: 20px;
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

const BulkSMS = () => {
  return (
    <SMSContainer>
      <Header>
        <PageTitle>Bulk SMS</PageTitle>
        <PageDescription>
          Send SMS messages to selected clients or groups
        </PageDescription>
      </Header>
      
      <BulkSMSForm />
    </SMSContainer>
  )
}

export default BulkSMS