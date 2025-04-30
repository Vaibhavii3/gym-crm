import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './hooks/useAuth'
import { useTheme } from './hooks/useTheme'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetails from './pages/ClientDetails'
import BulkSMS from './pages/BulkSMS'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const { isAuthenticated } = useAuth()
  const { theme } = useTheme()
  
  useEffect(() => {
    document.body.className = theme
    document.title = 'EnergyGym CRM'
  }, [theme])

  return (
    <>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientDetails />} />
          <Route path="bulk-sms" element={<BulkSMS />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer 
        position="bottom-right"
        theme={theme === 'dark-mode' ? 'dark' : 'light'}
        autoClose={3000}
      />
    </>
  )
}

export default App