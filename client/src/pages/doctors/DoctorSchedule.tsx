import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import doctorService from '@/services/doctorService'; // ✅ Correct import
import type { Doctor } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ScheduleCalendar from '@/components/doctor/ScheduleCalendar';

const DoctorSchedule = () => {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorSchedule = async () => {
      if (user?._id) {
        try {
          const doctorData = await doctorService.getDoctorByUserId(user._id); // ✅ Correct method call
          setDoctor(doctorData);
        } catch (error) {
          console.error('Failed to fetch doctor schedule', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctorSchedule();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 pt-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Schedule</h1>
            <a 
              href="/set-availability" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Availability
            </a>
          </div>
          
          {loading ? (
            <p>Loading schedule...</p>
          ) : doctor ? (
            <ScheduleCalendar schedule={doctor.schedule} />
          ) : (
            <p>No schedule data available</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorSchedule;
