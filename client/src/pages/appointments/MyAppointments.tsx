import { useEffect } from 'react'
import { useAppointments } from '@/hooks/useAppointments'
import AppointmentList from '@/components/appointment/AppointmentList'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const MyAppointments = () => {
  const { appointments, fetchAppointments } = useAppointments()

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
          <AppointmentList
            appointments={appointments}
            onCancel={(id) => console.log('Cancel', id)}
          />
        </main>
      </div>
    </div>
  )
}

export default MyAppointments
