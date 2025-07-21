import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppointments } from '@/hooks/useAppointments';
import DashboardStats from '@/components/dashboard/DashboardStats';
import UpcomingAppointments from '@/components/doctor/UpcomingAppointments';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { FaCalendarAlt, FaUserMd, FaUserCircle, FaClock } from 'react-icons/fa';
import { useAutoLogout } from '@/hooks/useAutoLogout';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments, fetchAppointments } = useAppointments();
  
  // Add auto-logout functionality
  useAutoLogout();

  useEffect(() => {
    if (user) {
      fetchAppointments({ doctorId: user._id, status: 'upcoming' });
    }
  }, [user, fetchAppointments]);

  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(
    app => app.date === today && app.status === 'confirmed'
  );

  return (
    // Fixed: Add h-screen and overflow-hidden to contain entire layout
    <div className="bg-gray-50 h-screen overflow-hidden flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <Sidebar />
      
      {/* Removed fixed height from main, added flex-grow and overflow-auto */}
      <main className="flex-grow p-4 md:p-8 md:ml-64 mt-16 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
            <div className="mt-2 md:mt-0 flex items-center text-sm text-gray-600">
              <FaClock className="mr-2 text-blue-500" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <div className="mb-8">
            <DashboardStats
              stats={{
                appointments: appointments.length,
                patients: todaysAppointments.length,
                upcoming: appointments.filter(a => a.status === 'confirmed').length
              }}
              role="doctor"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Today's Appointments</h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {todaysAppointments.length} {todaysAppointments.length === 1 ? 'appointment' : 'appointments'}
                  </span>
                </div>
                <UpcomingAppointments appointments={todaysAppointments} />
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <a
                    href="/doctor-schedule"
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaCalendarAlt className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">View Schedule</h3>
                      <p className="text-sm text-gray-600">Check your weekly availability</p>
                    </div>
                  </a>
                  
                  <a
                    href="/set-availability"
                    className="flex items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100 hover:border-green-300 transition-all duration-300"
                  >
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <FaUserMd className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Set Availability</h3>
                      <p className="text-sm text-gray-600">Update your working hours</p>
                    </div>
                  </a>
                  
                  {user && (
                    <a
                      href={`/doctors/${user._id}`}
                      className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-all duration-300"
                    >
                      <div className="bg-gray-100 p-3 rounded-lg mr-4">
                        <FaUserCircle className="text-gray-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">View Profile</h3>
                        <p className="text-sm text-gray-600">See how patients view you</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;