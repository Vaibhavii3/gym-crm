// import { useEffect, useState, useContext } from 'react'
// import styled from 'styled-components'
// import { format } from 'date-fns'
// import { useClient } from '../../hooks/useClient'
// import { ClientContext } from '../../context/ClientContext'

// const Tab = styled.button`
//   background: none;
//   border: none;
//   padding: 10px 20px;
//   margin-right: 15px;
//   margin-bottom: -1px;
//   color: ${props => props.$isActive ? 'var(--primary)' : 'var(--text-light)'};
//   font-weight: ${props => props.$isActive ? '600' : '400'};
//   border-bottom: 2px solid ${props => props.$isActive ? 'var(--primary)' : 'transparent'};
//   cursor: pointer;
//   transition: all 0.3s ease;
//   opacity: ${props => props.$isActive ? '1' : '0.7'};

//   &:hover {
//     color: var(--primary);
//     opacity: 1;
//   }
// `


// const ActivityContainer = styled.div`
//   background-color: var(--secondary-light);
//   border-radius: var(--border-radius);
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
//   padding: 20px;
//   margin-top: 20px;
//   position: relative;
//   overflow: hidden;

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: var(--primary);
//     z-index: 1;
//   }

//   &:after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(135deg, transparent 70%, rgba(255, 215, 0, 0.05) 100%);
//     z-index: 0;
//   }
// `

// const Tabs = styled.div`
//   display: flex;
//   border-bottom: 1px solid rgba(255, 215, 0, 0.1);
//   margin-bottom: 15px;
// `

// const ClientsList = styled.div`
//   max-height: 300px;
//   overflow-y: auto;

//   &::-webkit-scrollbar {
//     width: 6px;
//   }

//   &::-webkit-scrollbar-track {
//     background: rgba(0, 0, 0, 0.1);
//   }

//   &::-webkit-scrollbar-thumb {
//     background: var(--primary-dark);
//     border-radius: 3px;
//   }
// `

// const ClientItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 12px 0;
//   border-bottom: 1px solid rgba(255, 215, 0, 0.05);
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: rgba(255, 215, 0, 0.05);
//   }
// `

// const ClientImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-right: 15px;
//   border: 2px solid var(--primary);
// `

// const ClientInfo = styled.div`
//   flex: 1;
// `

// const ClientName = styled.h4`
//   margin: 0 0 5px;
//   font-size: 16px;
//   color: var(--text-light);
// `

// const ClientDate = styled.div`
//   font-size: 12px;
//   color: var(--text-light);
//   opacity: 0.7;
// `

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 30px 0;
//   color: var(--text-light);
//   opacity: 0.6;
// `

// const getRenewalDate = (membershipStartDate, membershipType) => {
//   const date = new Date(membershipStartDate)
//   switch (membershipType) {
//     case 'Monthly':
//       date.setMonth(date.getMonth() + 1)
//       break
//     case '3 Months':
//       date.setMonth(date.getMonth() + 3)
//       break
//     case '6 Months':
//       date.setMonth(date.getMonth() + 6)
//       break
//     default:
//       return null
//   }
//   return date
// }

// const ClientActivity = () => {
//   const { clients } = useClient()
//   const { getMonthlyJoinings, getClientsWithUpcomingRenewals } = useContext(ClientContext)

//   const [activeTab, setActiveTab] = useState('renewal')
//   const [joining, setJoining] = useState([])
//   const [upcomingRenewals, setUpcomingRenewals] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const recentJoins = await getMonthlyJoinings()
//       const renewals = await getClientsWithUpcomingRenewals()
//       setJoining(recentJoins)
//       setUpcomingRenewals(renewals)
//     }

//     fetchData()
//   }, [getMonthlyJoinings, getClientsWithUpcomingRenewals])

//   const renderClientList = () => {
//     const clientList = activeTab === 'renewal' ? upcomingRenewals : joining

//     if (clientList.length === 0) {
//       return <EmptyState>No clients to display</EmptyState>
//     }

//     return (
//       <ClientsList>
//         {clientList.map(client => {
//           const renewalDate = getRenewalDate(client.membershipStartDate, client.membershipType)
//           return (
//             <ClientItem key={client._id}>
//               <ClientImage
//                 src={client.image || '/default-avatar.png'}
//                 alt={client.name}
//               />
//               <ClientInfo>
//                 <ClientName>{client.name}</ClientName>
//                 <ClientDate>
//                   {activeTab === 'renewal' ? (
//                     <>
//                       {client.membershipType} renewal due on{' '}
//                       {renewalDate ? format(renewalDate, 'MMM d, yyyy') : 'Unknown'}
//                     </>
//                   ) : (
//                     <>Joined on {format(new Date(client.membershipStartDate), 'MMM d, yyyy')}</>
//                   )}
//                 </ClientDate>
//               </ClientInfo>
//             </ClientItem>
//           )
//         })}
//       </ClientsList>
//     )
//   }

//   return (
//     <ActivityContainer>
//       <Tabs>
//         <Tab
//           $isActive={activeTab === 'renewal'}
//           onClick={() => setActiveTab('renewal')}
//           title="View upcoming client renewals"
//         >
//           Upcoming Renewals
//         </Tab>
//         <Tab
//           $isActive={activeTab === 'recent'}
//           onClick={() => setActiveTab('recent')}
//           title="View clients who recently joined"
//         >
//           Recent Joins
//         </Tab>
//       </Tabs>

//       {renderClientList()}
//     </ActivityContainer>
//   )
// }

// export default ClientActivity

// import { useEffect, useState, useContext } from 'react'
// import styled from 'styled-components'
// import { format } from 'date-fns'
// import { useClient } from '../../hooks/useClient'
// import { ClientContext } from '../../context/ClientContext'

// // const Tab = styled.button`
// //   background: none;
// //   border: none;
// //   padding: 10px 20px;
// //   margin-right: 15px;
// //   margin-bottom: -1px;
// //   color: ${props => props.$isActive ? 'var(--primary)' : 'var(--text-light)'};
// //   font-weight: ${props => props.$isActive ? '600' : '400'};
// //   border-bottom: 2px solid ${props => props.$isActive ? 'var(--primary)' : 'transparent'};
// //   cursor: pointer;
// //   transition: all 0.3s ease;
// //   opacity: ${props => props.$isActive ? '1' : '0.7'};

// //   &:hover {
// //     color: var(--primary);
// //     opacity: 1;
// //   }
// // `

// const ActivityContainer = styled.div`
//   background-color: var(--secondary-light);
//   border-radius: var(--border-radius);
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
//   padding: 20px;
//   margin-top: 20px;
//   position: relative;
//   overflow: hidden;

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: var(--primary);
//     z-index: 1;
//   }

//   &:after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(135deg, transparent 70%, rgba(255, 215, 0, 0.05) 100%);
//     z-index: 0;
//   }
// `

// // const Tabs = styled.div`
// //   display: flex;
// //   border-bottom: 1px solid rgba(255, 215, 0, 0.1);
// //   margin-bottom: 15px;
// // `

// const ClientsList = styled.div`
//   max-height: 300px;
//   overflow-y: auto;

//   &::-webkit-scrollbar {
//     width: 6px;
//   }

//   &::-webkit-scrollbar-track {
//     background: rgba(0, 0, 0, 0.1);
//   }

//   &::-webkit-scrollbar-thumb {
//     background: var(--primary-dark);
//     border-radius: 3px;
//   }
// `

// const ClientItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 12px 0;
//   border-bottom: 1px solid rgba(255, 215, 0, 0.05);
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: rgba(255, 215, 0, 0.05);
//   }
// `

// const ClientImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-right: 15px;
//   border: 2px solid var(--primary);
// `

// const ClientInfo = styled.div`
//   flex: 1;
// `

// const ClientName = styled.h4`
//   margin: 0 0 5px;
//   font-size: 16px;
//   color: var(--text-light);
// `

// const ClientDate = styled.div`
//   font-size: 12px;
//   color: var(--text-light);
//   opacity: 0.7;
// `

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 30px 0;
//   color: var(--text-light);
//   opacity: 0.6;
// `

// // const getRenewalDate = (membershipStartDate, membershipType) => {
// //   const date = new Date(membershipStartDate)
// //   switch (membershipType) {
// //     case 'Monthly':
// //       date.setMonth(date.getMonth() + 1)
// //       break
// //     case '3-Months':
// //       date.setMonth(date.getMonth() + 3)
// //       break
// //     case '6-Months':
// //       date.setMonth(date.getMonth() + 6)
// //       break
// //     default:
// //       return null
// //   }
// //   return date
// // }

// const ClientActivity = () => {
//   const { clients } = useClient()
//   const { getMonthlyJoinings } = useContext(ClientContext)

//   // const [activeTab, setActiveTab] = useState('renewal')
//   const [joining, setJoining] = useState([])
//   // const [upcomingRenewals, setUpcomingRenewals] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const now = new Date();
//       const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//       const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);


//       const recentJoins = await getMonthlyJoinings(startOfMonth.toISOString(), endOfMonth.toISOString());
//       // const renewals = await getClientsWithUpcomingRenewals()
//       // setJoining(recentJoins)
//       setJoining(Array.isArray(recentJoins) ? recentJoins : [])

//       // setUpcomingRenewals(renewals)
//     }

//     fetchData()
//   }, [getMonthlyJoinings])

//   // const renderClientList = () => {
//   //   const clientList = activeTab === 'renewal' ? upcomingRenewals : joining

//   //   if (!clientList || clientList.length === 0) {
//   //     return <EmptyState>No clients to display</EmptyState>
//   //   }

//   //   return (
//   //     <ClientsList>
//   //       {clientList.map(client => {
//   //         const renewalDate = getRenewalDate(client.membershipStartDate, client.membershipType)
//   //         return (
//   //           <ClientItem key={client._id}>
//   //             <ClientImage
//   //               src={client.image || '/default-avatar.png'}
//   //               alt={client.name}
//   //             />
//   //             <ClientInfo>
//   //               <ClientName>{client.name}</ClientName>
//   //               <ClientDate>
//   //                 {activeTab === 'renewal' ? (
//   //                   <>
//   //                     {client.membershipType} renewal due on{' '}
//   //                     {renewalDate ? format(renewalDate, 'MMM d, yyyy') : 'Unknown'}
//   //                   </>
//   //                 ) : (
//   //                   <>Joined on {format(new Date(client.membershipStartDate), 'MMM d, yyyy')}</>
//   //                 )}
//   //               </ClientDate>
//   //             </ClientInfo>
//   //           </ClientItem>
//   //         )
//   //       })}
//   //     </ClientsList>
//   //   )
//   // }

//   // return (
//   //   <ActivityContainer>
//   //     <Tabs>
//   //       <Tab
//   //         $isActive={activeTab === 'renewal'}
//   //         onClick={() => setActiveTab('renewal')}
//   //         title="View upcoming client renewals"
//   //       >
//   //         Upcoming Renewals
//   //       </Tab>
//   //       <Tab
//   //         $isActive={activeTab === 'recent'}
//   //         onClick={() => setActiveTab('recent')}
//   //         title="View clients who recently joined"
//   //       >
//   //         Recent Joins
//   //       </Tab>
//   //     </Tabs>

//   //     {renderClientList()}
//   //   </ActivityContainer>
//   // )

//   const renderClientList = () => {
//     if (!joining || joining.length === 0) {
//       return <EmptyState>No recent joins to display</EmptyState>
//     }



//  return (
//   <ActivityContainer>
//   {joining.length === 0 ? (
//     <EmptyState>No recent joins this month</EmptyState>
//   ) : (
//     <ClientsList>
//       {joining.map(client => (
//         <ClientItem key={client._id}>
//           <ClientImage
//             src={client.image || '/default-avatar.png'}
//             alt={client.name}
//           />
//           <ClientInfo>
//             <ClientName>{client.name}</ClientName>
//             <ClientDate>Joined on {format(new Date(client.membershipStartDate), 'MMM d, yyyy')}</ClientDate>
//           </ClientInfo>
//         </ClientItem>
//       ))}
//     </ClientsList>
//   )}
// </ActivityContainer>
// )

// }

// export default ClientActivity

// due amount has to add in actual amount, update payment and reflect in revenue


import { useEffect, useState } from 'react'
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

const LoadingState = styled.div`
  text-align: center;
  padding: 30px 0;
  color: var(--text-light);
`

const ErrorState = styled.div`
  text-align: center;
  padding: 20px;
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: var(--border-radius);
  margin: 10px 0;
`

const ClientActivity = () => {
  const { clients } = useClient()
  const [recentJoins, setRecentJoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const calculateRecentJoins = () => {
      try {
        setLoading(true)
        
        if (!Array.isArray(clients)) {
          console.error('Clients is not an array:', clients)
          setError('Client data is not available')
          setRecentJoins([])
          return
        }
        
        // Calculate the first day of the current month
        const now = new Date()
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        
        console.log('Filtering clients joined this month, since:', firstDayOfMonth)
        console.log('Total clients:', clients.length)
        
        // Filter clients who joined this month
        const thisMonthJoins = clients.filter(client => {
          if (!client.membershipStartDate) return false
          const joinDate = new Date(client.membershipStartDate)
          return joinDate >= firstDayOfMonth
        })
        
        console.log('Clients joined this month:', thisMonthJoins.length)
        console.log('Clients data:', thisMonthJoins)
        
        // Sort by most recent first
        const sortedJoins = [...thisMonthJoins].sort((a, b) => {
          return new Date(b.membershipStartDate) - new Date(a.membershipStartDate)
        })
        
        setRecentJoins(sortedJoins)
        setError(null)
      } catch (err) {
        console.error('Error calculating recent joins:', err)
        setError(err.message || 'Something went wrong')
        setRecentJoins([])
      } finally {
        setLoading(false)
      }
    }
    
    calculateRecentJoins()
  }, [clients])

  if (loading) {
    return (
      <ActivityContainer>
        <h3>Recently Joined</h3>
        <LoadingState>Loading recent joins...</LoadingState>
      </ActivityContainer>
    )
  }

  if (error) {
    return (
      <ActivityContainer>
        <h3>Recently Joined</h3>
        <ErrorState>Error: {error}</ErrorState>
      </ActivityContainer>
    )
  }

  return (
    <ActivityContainer>
      <h3>Recently Joined</h3>
      {recentJoins && recentJoins.length > 0 ? (
        <ClientsList>
          {recentJoins.map(client => (
            <ClientItem key={client._id}>
              <ClientImage
                src={client.image || '/default-avatar.png'}
                alt={client.name}
              />
              <ClientInfo>
                <ClientName>{client.name}</ClientName>
                <ClientDate>
                  Joined on {format(new Date(client.membershipStartDate), 'MMM d, yyyy')}
                </ClientDate>
              </ClientInfo>
            </ClientItem>
          ))}
        </ClientsList>
      ) : (
        <EmptyState>No recent joins this month</EmptyState>
      )}
    </ActivityContainer>
  )
}

export default ClientActivity