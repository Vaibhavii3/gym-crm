import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { FaBirthdayCake, FaCalendarAlt, FaSms } from 'react-icons/fa'
import { useClient } from '../../hooks/useClient'
import { useNotification } from '../../hooks/useNotification'
import { ClientContext } from '../../context/ClientContext'
import { useContext } from 'react'

const UpcomingEvents = () => {
  const { clients } = useClient()
  const { addNotification } = useNotification()
  const { 
    getUpcomingBirthdays, 
    getClientsWithDuePayments, 
    markClientAsPaid,
    } = useContext(ClientContext)

  const [selectedTab, setSelectedTab] = useState('all')
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([])
  const [duePayments, setDuePayments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const birthdays = await getUpcomingBirthdays()
      const dues = await getClientsWithDuePayments()
      setUpcomingBirthdays(birthdays)
      setDuePayments(dues)
    }

    fetchData()
  }, [getUpcomingBirthdays, getClientsWithDuePayments])

  const allEvents = [...upcomingBirthdays.map(c => ({ ...c, eventType: 'birthday' })), 
    ...duePayments.map(c => ({ ...c, eventType: 'due' }))]

    const getValidDate = (client) => {
      const rawDate = client.birthday || client.dueDate || client.joiningDate
      const parsed = new Date(rawDate)
      return isNaN(parsed.getTime()) ? null : parsed
    }

const sortedEvents = allEvents.sort((a, b) => {
const aDate = new Date(a.dob || a.dueDate || a.joiningDate)
const bDate = new Date(b.dob || b.dueDate || b.joiningDate)
return aDate - bDate
})

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

    const renderEvents = () => {
      let events = []
  
      if (selectedTab === 'birthdays') {
        events = upcomingBirthdays.map(c => ({ ...c, eventType: 'birthday' }))
      } else if (selectedTab === 'dues') {
        events = duePayments.map(c => ({ ...c, eventType: 'due' }))
      } else {
        events = sortedEvents
      }
  
      if (events.length === 0) {
        return <div className="text-center py-8 text-gray-400">No upcoming events</div>
      }

      return events.map(client => {
        const isBirthday = client.eventType === 'birthday'
        const eventDate = getValidDate(client)

      return (
        <div key={`${client._id}-${isBirthday ? 'birthday' : 'due'}`} 
              className="flex items-center justify-between p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-white font-semibold">{client.name}</h4>
              <p className="text-sm text-gray-400">
              {isBirthday ? (
                  <>
                    <FaBirthdayCake className="inline mr-2" />
                    Birthday: {eventDate ? format(eventDate, 'MMM d') : 'Not available'}
                  </>
                ) : (
                  <>
                  
                    <FaCalendarAlt className="inline mr-2" />
                    Due: {eventDate ? format(eventDate, 'MMM d') : 'Not available'}{' '}
                    {client.membershipEndDate && `(${format(new Date(client.membershipEndDate), 'MMM d, yyyy')})`}
                   {!isBirthday && client.dueAmount > 0 && (
  <span className="ml-2 text-yellow-400 font-semibold">
    • Due Amount: ₹{client.dueAmount}
  </span>
)}
                  </>
                )}

              </p>
            </div>
          </div>

          {/* Show "Mark as Paid" button only for dues */}
        {!isBirthday && (
          <button
            onClick={async () => {
              try {
                await markClientAsPaid(client._id)
                const updatedDues = await getClientsWithDuePayments()
                setDuePayments(updatedDues)
                addNotification({
                  type: 'success',
                  title: 'Payment Updated',
                  message: `${client.name}'s payment marked as paid.`,
                })
              } catch (error) {
                addNotification({
                  type: 'error',
                  title: 'Error',
                  message: `Could not update payment for ${client.name}`,
                })
              }
            }}
            className="ml-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            Mark as Paid
          </button>
        )}

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