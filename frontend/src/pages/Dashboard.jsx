import { useState, useEffect, useContext } from 'react'
import { FaUsers, FaMoneyBillWave, FaUserPlus, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { useClient } from '../hooks/useClient'
// import StatsCard from '../components/dashboard/StatsCard'
import ClientActivity from '../components/dashboard/ClientActivity'
import UpcomingEvents from '../components/dashboard/UpcomingEvents'
import MeteorBackground from '../components/dashboard/MeteorBackground'

import { ClientContext } from '../context/ClientContext'

const Dashboard = () => {
  const { 
    clients, 
    getActiveClients, 
    getTotalFeesCollected,
    // getUpcomingRenewals,
    getMonthlyJoinings,
    getClientsWithDuePayments,
    getClientsWithUpcomingRenewals,
    getUpcomingBirthdays
  } = useClient()
  
  const [activeClients, setActiveClients] = useState(0)
  const [totalFees, setTotalFees] = useState(0)
  const [newJoinings, setNewJoinings] = useState(0)
  // const [upcomingRenewals, setUpcomingRenewals] = useState(0)
  const [upcomingDues, setUpcomingDues] = useState(0)
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([])
  const [loading, setLoading] = useState(true);

  
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch data from API endpoints
        const active = await getActiveClients()
        const total = await getTotalFeesCollected()
        const duePayments = await getClientsWithDuePayments()
        // const renewals = await getClientsWithUpcomingRenewals();
        

        setActiveClients(active?.length || 0)
        setTotalFees(total || 0)
        setUpcomingDues(duePayments?.length || 0)
        // setUpcomingRenewals(renewals?.length || 0);
        

        // Calculate the date range for last 30 days
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 30);

        const formattedStart = startDate.toISOString();
        const formattedEnd = today.toISOString();

        console.log("Fetching joinings data with dates:", {
          start: formattedStart,
          end: formattedEnd
        });

        const getUpcomingBirthdays = () => {
          const today = new Date()
          const thirtyDaysFromNow = new Date()
          thirtyDaysFromNow.setDate(today.getDate() + 30)
        
          return clients.filter(client => {
            if (!client.dob) return false
            const birthday = new Date(client.dob)
            const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
            if (thisYearBirthday < today) {
              thisYearBirthday.setFullYear(today.getFullYear() + 1)
            }
            return thisYearBirthday >= today && thisYearBirthday <= thirtyDaysFromNow
          });
        };

        const upcomingBirthdays = getUpcomingBirthdays();
        setUpcomingBirthdays(upcomingBirthdays);

        // Get monthly joinings data
        const joiningsData = await getMonthlyJoinings(formattedStart, formattedEnd);
        console.log("Joinings data received:", joiningsData);
        
        // Sum up all new joinings from the returned data
        if (Array.isArray(joiningsData) && joiningsData.length > 0) {
          const totalJoinings = joiningsData.reduce((sum, item) => sum + item.newJoinings, 0);
          console.log("Calculated total joinings:", totalJoinings);
          setNewJoinings(totalJoinings);
        } else {
          console.log("No joinings data found or empty array");
          // Fallback to client-side calculation if API doesn't return data
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const recentJoins = clients.filter(client => {
            if (!client.membershipStartDate) return false;
            const joinDate = new Date(client.membershipStartDate);
            return joinDate >= thirtyDaysAgo;
          }).length;
          
          console.log("Fallback calculated joinings:", recentJoins);
          setNewJoinings(recentJoins);
        }

      } catch (error) {
        console.error('Dashboard data fetch error:', error)
      } finally {
        setLoading(false);
      }
    }

    if (Array.isArray(clients)) {
      fetchData()
    }
  }, [clients, getActiveClients, getTotalFeesCollected, getMonthlyJoinings, getClientsWithDuePayments, getClientsWithUpcomingRenewals, getUpcomingBirthdays])
  
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
                <h3 className="text-3xl font-bold text-primary mt-2">{loading ? '...' : activeClients}</h3>
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
                <h3 className="text-3xl font-bold text-primary mt-2"> ₹{ loading ? '...' : `${totalFees.toLocaleString()}`} </h3>
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
                <h3 className="text-3xl font-bold text-primary mt-2">{loading ? '...' : newJoinings}</h3>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
              </div>
              <div className="text-primary text-2xl">
                <FaUserPlus />
              </div>
            </div>
          </div>
          
          {/* <div className="bg-secondary-light rounded-lg p-6 shadow-xl hover:transform hover:-translate-y-1 transition-all">
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
          </div> */}
          
      
          <div className="bg-secondary-light rounded-lg p-6 shadow-xl hover:transform hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Upcoming Dues</p>
                <h3 className="text-3xl font-bold text-primary mt-2">{loading ? '...' : upcomingDues}</h3>
                <p className="text-sm text-gray-400 mt-1">Payments due soon</p>
              </div>
              <div className="text-primary text-2xl">
                <FaClock />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClientActivity  />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  )
}

export default Dashboard


