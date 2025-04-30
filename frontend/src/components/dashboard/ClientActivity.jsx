import { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { useClient } from '../../hooks/useClient'

const ActivityContainer = styled.div`
  background-color: var(--secondary-light);
  border-radius: var(--border-radius);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: 20px;
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

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  margin-bottom: 15px;
`

const Tab = styled.button`
  background: none;
  border: none;
  padding: 10px 20px;
  margin-right: 15px;
  margin-bottom: -1px;
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-light)'};
  font-weight: ${props => props.active ? '600' : '400'};
  border-bottom: 2px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.active ? '1' : '0.7'};
  
  &:hover {
    color: var(--primary);
    opacity: 1;
  }
`

const ClientsList = styled.div`
  max-height: 300px;
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

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 215, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.05);
  }
`

const ClientImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 2px solid var(--primary);
`

const ClientInfo = styled.div`
  flex: 1;
`

const ClientName = styled.h4`
  margin: 0 0 5px;
  font-size: 16px;
  color: var(--text-light);
`

const ClientDate = styled.div`
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.7;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 30px 0;
  color: var(--text-light);
  opacity: 0.6;
`

const ClientActivity = () => {
  const [activeTab, setActiveTab] = useState('renewal')
  const { clients } = useClient()
  
  // Get upcoming renewals (clients whose renewals are due in the next 30 days)
  const upcomingRenewals = clients.filter(client => {
    if (client.status !== 'Active') return false
    
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
        return false
    }
    
    const today = new Date()
    const thirtyDaysFromNow = new Date(today)
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    
    return renewalDate <= thirtyDaysFromNow && renewalDate >= today
  }).sort((a, b) => {
    // Sort by soonest renewal
    const aJoinDate = new Date(a.joiningDate)
    const bJoinDate = new Date(b.joiningDate)
    
    let aRenewal = new Date(aJoinDate)
    let bRenewal = new Date(bJoinDate)
    
    if (a.subscriptionType === 'Monthly') aRenewal.setMonth(aJoinDate.getMonth() + 1)
    if (a.subscriptionType === '3 Months') aRenewal.setMonth(aJoinDate.getMonth() + 3)
    if (a.subscriptionType === '6 Months') aRenewal.setMonth(aJoinDate.getMonth() + 6)
    
    if (b.subscriptionType === 'Monthly') bRenewal.setMonth(bJoinDate.getMonth() + 1)
    if (b.subscriptionType === '3 Months') bRenewal.setMonth(bJoinDate.getMonth() + 3)
    if (b.subscriptionType === '6 Months') bRenewal.setMonth(bJoinDate.getMonth() + 6)
    
    return aRenewal - bRenewal
  })
  
  // Get recently joined clients (in the last 30 days)
  const recentJoins = clients.filter(client => {
    const joinDate = new Date(client.joiningDate)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    return joinDate >= thirtyDaysAgo
  }).sort((a, b) => {
    // Sort by most recent first
    return new Date(b.joiningDate) - new Date(a.joiningDate)
  })
  
  const renderClientList = () => {
    const clientList = activeTab === 'renewal' ? upcomingRenewals : recentJoins
    
    if (clientList.length === 0) {
      return (
        <EmptyState>
          No clients to display
        </EmptyState>
      )
    }
    
    return (
      <ClientsList>
        {clientList.map(client => (
          <ClientItem key={client.id}>
            <ClientImage src={client.picture} alt={client.name} />
            <ClientInfo>
              <ClientName>{client.name}</ClientName>
              <ClientDate>
                {activeTab === 'renewal' ? (
                  <>
                    {client.subscriptionType} renewal due on {
                      (() => {
                        const joinDate = new Date(client.joiningDate)
                        let renewalDate = new Date(joinDate)
                        
                        if (client.subscriptionType === 'Monthly') 
                          renewalDate.setMonth(joinDate.getMonth() + 1)
                        else if (client.subscriptionType === '3 Months') 
                          renewalDate.setMonth(joinDate.getMonth() + 3)
                        else if (client.subscriptionType === '6 Months') 
                          renewalDate.setMonth(joinDate.getMonth() + 6)
                        
                        return format(renewalDate, 'MMM d, yyyy')
                      })()
                    }
                  </>
                ) : (
                  <>Joined on {format(new Date(client.joiningDate), 'MMM d, yyyy')}</>
                )}
              </ClientDate>
            </ClientInfo>
          </ClientItem>
        ))}
      </ClientsList>
    )
  }
  
  return (
    <ActivityContainer>
      <Tabs>
        <Tab 
          active={activeTab === 'renewal'} 
          onClick={() => setActiveTab('renewal')}
        >
          Upcoming Renewals
        </Tab>
        <Tab 
          active={activeTab === 'recent'} 
          onClick={() => setActiveTab('recent')}
        >
          Recent Joins
        </Tab>
      </Tabs>
      
      {renderClientList()}
    </ActivityContainer>
  )
}

export default ClientActivity