export const mockAdmin = {
  id: '1',
  name: 'Admin User',
  email: 'admin@energygym.com',
  password: 'password123', // In a real app, never store plain text passwords
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
}

export const mockClients = [
  {
    id: '1',
    name: 'John Doe',
    picture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    age: 28,
    weight: 75,
    phone: '9876543210',
    joiningDate: '2023-01-15T00:00:00.000Z',
    address: '123 Fitness Street, Gym City',
    aadharNumber: '1234 5678 9012',
    subscriptionType: 'Monthly',
    personalTrainer: 'Yes',
    medicalProblems: 'None',
    dob: '1995-03-21T00:00:00.000Z',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    picture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    age: 32,
    weight: 62,
    phone: '8765432109',
    joiningDate: '2023-02-20T00:00:00.000Z',
    address: '456 Muscle Avenue, Fitness Town',
    aadharNumber: '9876 5432 1098',
    subscriptionType: '3 Months',
    personalTrainer: 'No',
    medicalProblems: 'Mild asthma',
    dob: '1991-07-15T00:00:00.000Z',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    picture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    age: 45,
    weight: 85,
    phone: '7654321098',
    joiningDate: '2023-01-10T00:00:00.000Z',
    address: '789 Cardio Lane, Health District',
    aadharNumber: '5678 9012 3456',
    subscriptionType: '6 Months',
    personalTrainer: 'Yes',
    medicalProblems: 'Hypertension',
    dob: '1978-12-05T00:00:00.000Z',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    picture: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    age: 29,
    weight: 58,
    phone: '6543210987',
    joiningDate: '2023-03-05T00:00:00.000Z',
    address: '321 Weight Street, Strength City',
    aadharNumber: '6789 0123 4567',
    subscriptionType: 'Monthly',
    personalTrainer: 'No',
    medicalProblems: 'None',
    dob: '1994-04-18T00:00:00.000Z',
    status: 'Inactive'
  },
  {
    id: '5',
    name: 'Robert Brown',
    picture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    age: 35,
    weight: 72,
    phone: '5432109876',
    joiningDate: '2023-02-28T00:00:00.000Z',
    address: '654 Treadmill Road, Exercise Town',
    aadharNumber: '2345 6789 0123',
    subscriptionType: '3 Months',
    personalTrainer: 'Yes',
    medicalProblems: 'Previous knee injury',
    dob: '1988-09-30T00:00:00.000Z',
    status: 'Active'
  }
]

export const mockNotifications = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Received',
    message: 'John Doe has paid their monthly subscription fees.',
    timestamp: '2023-06-01T09:15:00.000Z',
    read: false
  },
  {
    id: '2',
    type: 'renewal',
    title: 'Subscription Renewal',
    message: 'Sarah Williams subscription is due for renewal in 3 days.',
    timestamp: '2023-05-31T14:30:00.000Z',
    read: false
  },
  {
    id: '3',
    type: 'client',
    title: 'New Client',
    message: 'Michael Johnson has joined EnergyGym today.',
    timestamp: '2023-05-30T11:45:00.000Z',
    read: true
  },
  {
    id: '4',
    type: 'alert',
    title: 'Maintenance Alert',
    message: 'Treadmill maintenance scheduled for tomorrow at 2PM.',
    timestamp: '2023-05-29T16:20:00.000Z',
    read: true
  },
  {
    id: '5',
    type: 'payment',
    title: 'Payment Due',
    message: 'Robert Brown has pending payment for this month.',
    timestamp: '2023-05-28T10:10:00.000Z',
    read: true
  }
]