import { useContext, useState } from 'react'
import { useClient } from '../../hooks/useClient'
import { useNotification } from '../../hooks/useNotification'
import { ClientContext } from '../../context/ClientContext'


const ClientForm = ({ client, onClose }) => {
  const { addClient, updateClient } = useContext(ClientContext);
  const { addNotification } = useNotification()
  
  const initialFormData = client ? {
    ...client
  } : {
    name: '',
    email: '',
    image: null,
    age: '',
    weight: '',
    phone: '',
    address: '',
    aadharNumber: '',
    membershipType: 'Monthly',
    membershipStartDate: '',
    personalTrainer: false,
    medicalProblems: '',
    birthday: '',
    totalPaid: '',
    dueAmount: '',
    status: 'active'
  }
  
  const [formData, setFormData] = useState(initialFormData)


  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(`Changed field: ${name}, New Value: ${value}`);
    
    // Special handling for personalTrainer field to convert to boolean
    if (name === 'personalTrainer') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'Yes' ? true : false
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let result;

  //     if (client?._id) {
  //       // Update client
  //       const updateForm = new FormData();
  //       Object.entries(formData).forEach(([key, value]) => {
  //         updateForm.append(key, value);
  //       });
  //       updateForm.append('clientImage', formData.image);
  //       result = await updateClient(client._id, updateForm);
  //     } else {
  //       // Add new client
  //       result = await addClient({
  //         ...formData,
  //         clientImage: formData.image,
  //       });
  //     }

  //     addNotification({
  //       type: 'client',
  //       title: client ? 'Client Updated' : 'New Client',
  //       message: `${formData.name}'s info ${client ? 'updated' : 'added'}.`,
  //     });

  //     onClose();
  //   } catch (err) {
  //     console.error('Error submitting form:', err);
  //     addNotification({
  //       type: 'error',
  //       title: 'Error',
  //       message: err.message || 'There was an issue saving the client.',
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data before submitting:', formData);

    try {
      const data = new FormData();
  
      // Append all fields except 'image' (we handle that separately)
    //   Object.entries(formData).forEach(([key, value]) => {
    //     // Avoid double appending 'image' here
    //     if (key !== 'image') {
    //       console.log(`Appending ${key}: ${value}`);
    //       data.append(key, value);
    //     }
    //   });
  
    //   // Ensure image is appended correctly with the name expected in backend (clientImage)
    //   if (formData.image) {
    //     console.log('Appending image:', formData.image);
    //     data.append('clientImage', formData.image);
    //   }
  
    //   // Decide between update or create
    //   const result = client?._id
    //     ? await updateClient(client._id, data)
    //     : await addClient(data);
  
    //     console.log('Result from API call:', result);

    //   addNotification({
    //     type: 'client',
    //     title: client ? 'Client Updated' : 'New Client',
    //     message: `${formData.name}'s info ${client ? 'updated' : 'added'}.`,
    //   });
  
    //   onClose();
    // } catch (err) {
    //   console.error('Error submitting form:', err);
    //   addNotification({
    //     type: 'error',
    //     title: 'Error',
    //     message: err.message || 'There was an issue saving the client.',
    //   });
    // }

     // Append all fields except 'image' and handle special cases
     Object.entries(formData).forEach(([key, value]) => {
      // Skip image as we handle it separately
      if (key === 'image') {
        return;
      }
      
      // Special handling for boolean values
      if (key === 'personalTrainer') {
        // Convert boolean to string 'true' or 'false', which server will parse correctly
        console.log(`Appending ${key}: ${value} (${typeof value})`);
        data.append(key, value.toString());
      } else {
        console.log(`Appending ${key}: ${value}`);
        data.append(key, value);
      }
    });

    // Ensure image is appended correctly with the name expected in backend (clientImage)
    if (formData.image) {
      console.log('Appending image:', formData.image);
      data.append('clientImage', formData.image);
    }

    // Now let's log what's actually being sent
    console.log('FormData entries being sent:');
    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    // Decide between update or create
    const result = client?._id
      ? await updateClient(client._id, data)
      : await addClient(data);

    console.log('Result from API call:', result);

    addNotification({
      type: 'client',
      title: client ? 'Client Updated' : 'New Client',
      message: `${formData.name}'s info ${client ? 'updated' : 'added'}.`,
    });

    onClose();
  } catch (err) {
    console.error('Error submitting form:', err);
    addNotification({
      type: 'error',
      title: 'Error',
      message: err.message || 'There was an issue saving the client.',
    });
  }
  };
  
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
          <label className="block text-white mb-2" htmlFor="email"> Email </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2" htmlFor="image">Profile Picture URL</label>
          <input
            type="file"
            id="clientImage"
            name="clientImage"
            accept='image/*'
            // value={formData.image}
            // onChange={handleChange}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              image: e.target.files[0] // just store the File object
            }))}            
            className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="age">Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="weight">Weight (kg)</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="aadharNumber">Aadhar Number</label>
          <input type="text" id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="membershipType">Subscription Type</label>
          <select id="membershipType" name="membershipType" value={formData.membershipType} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all">
            <option value="Monthly">Monthly</option>
            <option value="3-months"> 3 Months</option>
            <option value="6-months">6 months</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="MembershipStartDate">
            Membership Start Date
          </label>
          <input type="date" name="membershipStartDate" value={formData.membershipStartDate} onChange={handleChange}   className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="totalPaid">
            Total Paid 
          </label>
          <input type="number" name="totalPaid" value={formData.totalPaid} onChange={handleChange}   className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="dueAmount">
            Due Amount 
          </label>
          <input type="number" name="dueAmount" value={formData.dueAmount} onChange={handleChange}   className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>



        <div>
          <label className="block text-white mb-2" htmlFor="personalTrainer">Personal Trainer</label>
          <select id="personalTrainer" name="personalTrainer" value={formData.personalTrainer ? 'Yes' : 'No'} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="medicalProblems">Medical Problems</label>
          <input type="text" id="medicalProblems" name="medicalProblems" value={formData.medicalProblems} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="dob">Date of Birth</label>
          <input type="date" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all" />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full p-3 bg-secondary-light border border-gray-700 rounded-lg text-white focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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