import { useState } from 'react'
import { useClient } from '../../hooks/useClient'
import { useNotification } from '../../hooks/useNotification'

const ClientForm = ({ client, onClose }) => {
  const { addClient, updateClient } = useClient()
  const { addNotification } = useNotification()
  
  const initialFormData = client ? {
    ...client
  } : {
    name: '',
    picture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    age: '',
    weight: '',
    phone: '',
    address: '',
    aadharNumber: '',
    subscriptionType: 'Monthly',
    personalTrainer: 'No',
    medicalProblems: '',
    dob: '',
    status: 'Active'
  }
  
  const [formData, setFormData] = useState(initialFormData)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (client) {
      updateClient(client.id, formData)
      addNotification({
        type: 'client',
        title: 'Client Updated',
        message: `${formData.name}'s information has been updated.`
      })
    } else {
      addClient(formData)
      addNotification({
        type: 'client',
        title: 'New Client',
        message: `${formData.name} has been added as a new client.`
      })
    }
    
    onClose()
  }
  
  return (
    <div className="bg-secondary p-6 rounded-lg shadow-2xl transform transition-all">
      <div className="relative">
        <h2 className="text-2xl font-bold text-white mb-6">
          {client ? 'Edit Client' : 'Add New Client'}
        </h2>
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2" htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2" htmlFor="picture">Profile Picture URL</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
          />
        </div>
        
        {/* Add all other form fields with similar styling */}
        
        <div className="col-span-2 flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-secondary rounded-lg hover:bg-primary-light transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-primary/50"
          >
            {client ? 'Update Client' : 'Add Client'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientForm