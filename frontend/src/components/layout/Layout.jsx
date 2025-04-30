import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MeteorBackground from '../dashboard/MeteorBackground'

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar />
      <div className="flex-1 relative">
        <MeteorBackground />
        <div className="relative z-10">
          <Header />
          <main className="p-6 ml-60 lg:ml-64 transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout