import { useState } from 'react'
import { FaEdit, FaTrash, FaEye, FaSms } from 'react-icons/fa'
import { format, isValid } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../../hooks/useNotification'
import Modal from '../ui/Modal'

const ClientCard = ({ client, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const { addNotification } = useNotification()
  const [showSMSModal, setShowSMSModal] = useState(false)
  const [smsMessage, setSmsMessage] = useState('')
  
  const handleView = () => {
    navigate(`/clients/${client._id}`)
  }
  
  const handleSendSMS = () => {
    if (!smsMessage.trim()) return
    
    addNotification({
      type: 'sms',
      title: 'SMS Sent',
      message: `SMS sent to ${client.name}: ${smsMessage}`
    })
    
    setSmsMessage('')
    setShowSMSModal(false)
  }
  
  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    if (isValid(date)) {
      return format(date, 'MMM d, yyyy');
    }
    return 'Invalid date';
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

  return (
    <>
      <div className="bg-secondary-light rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 relative group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
        
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            client.status === 'active' 
              ? 'bg-green-100 text-green-600 border border-green-600'
              : 'bg-red-100 text-red-600 border border-red-600'
          }`}>
            {client.status}
          </span>
        </div>
        
        <div className="h-48 relative overflow-hidden">
          <img 
            src={client.image} 
            alt={client.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          
          <h3 className="text-xl font-semibold text-white mb-2">{client.name}</h3>
          <p className="text-primary text-sm mb-4">
            Joined: {formatDate(client.membershipStartDate)}
          </p>
          
          <div className="space-y-2 text-gray-300">

            <div className="flex justify-between">
              <span>Age:</span>
              <span>{client.birthday ? calculateAge(client.birthday) : 'Not provided' }</span>
            </div>

            <div className="flex justify-between">
              <span>Phone:</span>
              <span>{client.phone }</span>
            </div>

            <div className="flex justify-between">
              <span>Subscription:</span>
              <span>{client.membershipType}</span>
            </div>

            <div className="flex justify-between">
              <span>Trainer:</span>
              <span>{client.personalTrainer ? 'Yes' : 'No'}</span>
            </div>

          </div>
          
          <div className="mt-6 flex justify-end space-x-2 border-t border-gray-700 pt-4">
            <button 
              onClick={handleView}
              className="p-2 text-primary hover:bg-primary hover:bg-opacity-20 rounded-full transition-colors"
              title="View Details"
            >
              <FaEye size={18} />
            </button>
            <button 
              onClick={() => setShowSMSModal(true)}
              className="p-2 text-primary hover:bg-primary hover:bg-opacity-20 rounded-full transition-colors"
              title="Send SMS"
            >
              <FaSms size={18} />
            </button>
            <button 
              onClick={() => onEdit(client)}
              className="p-2 text-primary hover:bg-primary hover:bg-opacity-20 rounded-full transition-colors"
              title="Edit Client"
            >
              <FaEdit size={18} />
            </button>
            <button 
              onClick={() => onDelete(client._id)}
              className="p-2 text-red-500 hover:bg-red-500 hover:bg-opacity-20 rounded-full transition-colors"
              title="Delete Client"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <Modal isOpen={showSMSModal} onClose={() => setShowSMSModal(false)}>
        <div className="p-6 bg-secondary-light rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Send SMS to {client.name}</h3>
          <div className="mb-4">
            <textarea
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-3 bg-secondary border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowSMSModal(false)}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendSMS}
              disabled={!smsMessage.trim()}
              className="px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send SMS
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ClientCard