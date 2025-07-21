import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import doctorService from '@/services/doctorService';
import type { Doctor } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import AvailabilityForm from '@/components/doctor/AvailabilityForm';

const SetAvailability = () => {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (user?._id) {
        try {
          const doctorData = await doctorService.getDoctorByUserId(user._id);
          setDoctor(doctorData);
        } catch (error) {
          console.error('Failed to fetch doctor data', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctorData();
  }, [user]);

  const handleSave = async (schedule: Doctor['schedule']) => {
    if (!user?._id || !doctor) return;

    setIsSaving(true);
    try {
      const updatedDoctor = await doctorService.updateDoctor(doctor._id, { schedule });
      setDoctor(updatedDoctor);
    } catch (error) {
      console.error('Failed to update schedule', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 pt-24">
          <h1 className="text-2xl font-bold mb-6">Set Availability</h1>

          {loading ? (
            <p>Loading availability settings...</p>
          ) : doctor ? (
            <AvailabilityForm 
              schedule={doctor.schedule} 
              onSave={handleSave} 
              isSaving={isSaving} 
            />
          ) : (
            <p>Doctor data not available</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default SetAvailability;
