import { useState, useEffect } from 'react'
import { FaUsers, FaMoneyBillWave, FaUserPlus, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { useClient } from '../hooks/useClient'
import StatsCard from '../components/dashboard/StatsCard'
import ClientActivity from '../components/dashboard/ClientActivity'
import UpcomingEvents from '../components/dashboard/UpcomingEvents'
import MeteorBackground from '../components/dashboard/MeteorBackground'

const Dashboard = () => {
  const { 
    clients, 
    getActiveClients, 
    getTotalFeesCollected,
    getUpcomingRenewals
  } = useClient()
  
  const [activeClients, setActiveClients] = useState(0)
  const [totalFees, setTotalFees] = useState(0)
  const [newJoinings, setNewJoinings] = useState(0)
  const [upcomingRenewals, setUpcomingRenewals] = useState(0)
  const [upcomingDues, setUpcomingDues] = useState(0)
  
  useEffect(() => {
    setActiveClients(getActiveClients().length)
    setTotalFees(getTotalFeesCollected())
    
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentJoins = clients.filter(client => {
      const joinDate = new Date(client.joiningDate)
      return joinDate >= thirtyDaysAgo
    }).length
    
    const duePayments = clients.filter(client => {
      if (client.status !== 'Active') return false
      const joinDate = new Date(client.joiningDate)
      let dueDate = new Date(joinDate)
      
      switch (client.subscriptionType) {
        case 'Monthly':
          dueDate.setMonth(joinDate.getMonth() + 1)
          break
        case '3 Months':
          dueDate.setMonth(joinDate.getMonth() + 3)
          break
        case '6 Months':
          dueDate.setMonth(joinDate.getMonth() + 6)
          break
        default:
          return false
      }
      
      const today = new Date()
      const thirtyDaysFromNow = new Date(today)
      thirtyDaysFromNow.setDate(today.getDate() + 30)
      
      return dueDate <= thirtyDaysFromNow && dueDate >= today
    }).length
    
    setNewJoinings(recentJoins)
    setUpcomingRenewals(getUpcomingRenewals().length)
    setUpcomingDues(duePayments)
  }, [clients, getActiveClients, getTotalFeesCollected, getUpcomingRenewals])
  
  return (
    <div className="relative min-h-screen p-6">
      <MeteorBackground />
      
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome to EnergyGym CRM. Here's an overview of your gym's performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-secondary-light rounded-lg p-6 shadow-xl hover:transform hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Active Clients</p>
                <h3 className="text-3xl font-bold text-primary mt-2">{activeClients}</h3>
                <p className="text-sm text-gray-400 mt-1">Total active memberships</p>
              </div>
              <div className="text-primary text-2xl">
                <FaUsers />
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-light rounded-lg p-6 shadow-xl hover:transform hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <h3 className="text-3xl font-bold text-primary mt-2">₹{totalFees.toLocaleString()}</h3>
                <p className="text-sm text-gray-400 mt-1">From active memberships</p>
              </div>
              <div className="text-primary text-2xl">
                <FaMoneyBillWave />
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-light rounded-lg p-6 shadow-xl hover:transform hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">New Joinings</p>
                <h3 className="text-3xl font-bold text-primary mt-2">{newJoinings}</h3>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
              </div>
              <div className="text-primary text-2xl">
                <FaUserPlus />
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-light rounded-lg p-6 shadow-xl hover:transform hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Upcoming Renewals</p>
                <h3 className="text-3xl font-bold text-primary mt-2">{upcomingRenewals}</h3>
                <p className="text-sm text-gray-400 mt-1">Next 30 days</p>
              </div>
              <div className="text-primary text-2xl">
                <FaCalendarAlt />
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-light rounded-lg p-6 shadow-xl hover:transform hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Upcoming Dues</p>
                <h3 className="text-3xl font-bold text-primary mt-2">{upcomingDues}</h3>
                <p className="text-sm text-gray-400 mt-1">Payments due soon</p>
              </div>
              <div className="text-primary text-2xl">
                <FaClock />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClientActivity />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  )
}

export default Dashboard