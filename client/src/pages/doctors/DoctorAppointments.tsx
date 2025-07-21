import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppointments } from '@/hooks/useAppointments';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import AppointmentList from '@/components/appointment/AppointmentList';
import AppointmentFilter from '@/components/doctor/AppointmentFilter'; // New component

const DoctorAppointments = () => {
  const { user } = useAuth();
  const { appointments, fetchAppointments } = useAppointments();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    if (user) {
      fetchAppointments({ doctorId: user._id });
    }
  }, [user, fetchAppointments]);

  const filteredAppointments = appointments.filter(app => {
    const now = new Date();
    const appointmentDate = new Date(`${app.date}T${app.time}`);
    
    if (filter === 'upcoming') return appointmentDate > now;
    if (filter === 'past') return appointmentDate < now;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 pt-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Appointments</h1>
            <AppointmentFilter currentFilter={filter} onFilterChange={setFilter} />
          </div>
          
          <AppointmentList 
            appointments={filteredAppointments} 
            role="doctor" 
            onEdit={(appointment) => console.log('Edit', appointment)} 
          />
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;