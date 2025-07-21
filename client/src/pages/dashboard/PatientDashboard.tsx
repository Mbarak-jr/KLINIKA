import { useEffect } from 'react'
import { useAppointments } from '@/hooks/useAppointments'
import DashboardStats from '@/components/dashboard/DashboardStats'
import AppointmentList from '@/components/appointment/AppointmentList'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { useAutoLogout } from '@/hooks/useAutoLogout'

const PatientDashboard = () => {
  const { appointments, fetchAppointments } = useAppointments()
  
  // Add auto-logout functionality
  useAutoLogout();

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  return (
    <div className="bg-gray-50 h-screen overflow-hidden flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <Sidebar />
      
      <main className="flex-grow p-4 md:p-8 md:ml-64 mt-16 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
        <DashboardStats stats={{ appointments: appointments.length }} role="patient" />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
          <AppointmentList appointments={appointments} />
        </div>
      </main>
    </div>
  )
}

export default PatientDashboard