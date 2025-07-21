import type { Appointment } from '@/types';
import { Link } from 'react-router-dom';
import { FaUserInjured, FaStethoscope, FaCalendarDay, FaClock, FaInfoCircle } from 'react-icons/fa';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

const statusColors = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
};

const UpcomingAppointments = ({ appointments }: UpcomingAppointmentsProps) => {
  if (appointments.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 text-center border border-blue-100">
        <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <FaCalendarDay className="text-blue-600 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No appointments scheduled for today</h3>
        <p className="text-gray-600 mb-4">Enjoy your free time or prepare for tomorrow's patients</p>
        <Link 
          to="/doctor-schedule" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <FaClock className="mr-2" /> View your schedule
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1 mb-3 md:mb-0">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                      <FaUserInjured className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center">
                        {typeof appointment.patient === 'object'
                          ? appointment.patient.name
                          : 'Unknown Patient'}
                        <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
                          {appointment.status}
                        </span>
                      </h3>
                      
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaClock className="mr-2 text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                        
                        {appointment.notes && (
                          <div className="flex items-start text-sm text-gray-600">
                            <FaInfoCircle className="mr-2 mt-0.5 text-gray-400" />
                            <span>{appointment.notes}</span>
                          </div>
                        )}
                        
                        {typeof appointment.clinic === 'object' && (
                          <div className="flex items-center text-sm text-gray-600">
                            <FaStethoscope className="mr-2 text-gray-400" />
                            <span>{appointment.clinic.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="text-sm bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg transition-colors">
                    Start Consultation
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          to="/doctor-dashboard/appointments" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          View all appointments
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingAppointments;