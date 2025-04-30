import { useState } from 'react'
import { format, isBefore, addDays } from 'date-fns'
import { FaBirthdayCake, FaCalendarAlt, FaSms } from 'react-icons/fa'
import { useClient } from '../../hooks/useClient'
import { useNotification } from '../../hooks/useNotification'

const UpcomingEvents = () => {
  const { clients } = useClient()
  const { addNotification } = useNotification()
  const [selectedTab, setSelectedTab] = useState('all')

  const getUpcomingBirthdays = () => {
    const today = new Date()
    const thirtyDaysFromNow = addDays(today, 30)
    
    return clients.filter(client => {
      if (!client.dob) return false
      const birthday = new Date(client.dob)
      const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
      
      if (isBefore(nextBirthday, today)) {
        nextBirthday.setFullYear(today.getFullYear() + 1)
      }
      
      return isBefore(nextBirthday, thirtyDaysFromNow) && !isBefore(nextBirthday, today)
    }).sort((a, b) => new Date(a.dob) - new Date(b.dob))
  }

  const getUpcomingDues = () => {
    const today = new Date()
    const thirtyDaysFromNow = addDays(today, 30)
    
    return clients.filter(client => {
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
      
      return isBefore(dueDate, thirtyDaysFromNow) && !isBefore(dueDate, today)
    }).sort((a, b) => {
      const aDate = new Date(a.joiningDate)
      const bDate = new Date(b.joiningDate)
      return aDate - bDate
    })
  }

  const handleSendSMS = (client, type) => {
    let message = ''
    if (type === 'birthday') {
      message = `Happy Birthday ${client.name}! 🎉`
    } else {
      message = `Dear ${client.name}, your subscription is due for renewal.`
    }

    addNotification({
      type: 'sms',
      title: 'SMS Sent',
      message: `SMS sent to ${client.name}: ${message}`
    })
  }

  const upcomingBirthdays = getUpcomingBirthdays()
  const upcomingDues = getUpcomingDues()
  const allEvents = [...upcomingBirthdays, ...upcomingDues]
    .sort((a, b) => new Date(a.dob || a.joiningDate) - new Date(b.dob || b.joiningDate))

  const renderEvents = () => {
    const events = selectedTab === 'birthdays' ? upcomingBirthdays :
                  selectedTab === 'dues' ? upcomingDues : allEvents

    if (events.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          No upcoming events
        </div>
      )
    }

    return events.map(client => {
      const isBirthday = client.dob && upcomingBirthdays.includes(client)
      const nextDate = isBirthday ? 
        new Date(client.dob) :
        (() => {
          const joinDate = new Date(client.joiningDate)
          let dueDate = new Date(joinDate)
          if (client.subscriptionType === 'Monthly') dueDate.setMonth(joinDate.getMonth() + 1)
          if (client.subscriptionType === '3 Months') dueDate.setMonth(joinDate.getMonth() + 3)
          if (client.subscriptionType === '6 Months') dueDate.setMonth(joinDate.getMonth() + 6)
          return dueDate
        })()

      return (
        <div key={`${client.id}-${isBirthday ? 'birthday' : 'due'}`} 
             className="flex items-center justify-between p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={client.picture} alt={client.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-white font-semibold">{client.name}</h4>
              <p className="text-sm text-gray-400">
                {isBirthday ? (
                  <>
                    <FaBirthdayCake className="inline mr-2" />
                    Birthday: {format(nextDate, 'MMM d')}
                  </>
                ) : (
                  <>
                    <FaCalendarAlt className="inline mr-2" />
                    Due: {format(nextDate, 'MMM d')} ({client.subscriptionType})
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSendSMS(client, isBirthday ? 'birthday' : 'due')}
            className="p-2 text-primary hover:bg-primary hover:bg-opacity-20 rounded-full transition-colors"
          >
            <FaSms size={20} />
          </button>
        </div>
      )
    })
  }

  return (
    <div className="bg-secondary-light rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
      </div>
      
      <div className="flex border-b border-gray-700">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            selectedTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
          }`}
          onClick={() => setSelectedTab('all')}
        >
          All Events
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            selectedTab === 'birthdays' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
          }`}
          onClick={() => setSelectedTab('birthdays')}
        >
          Birthdays
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            selectedTab === 'dues' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
          }`}
          onClick={() => setSelectedTab('dues')}
        >
          Due Payments
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {renderEvents()}
      </div>
    </div>
  )
}

export default UpcomingEvents