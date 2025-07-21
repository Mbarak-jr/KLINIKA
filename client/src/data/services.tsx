import { FaCalendarAlt, FaNotesMedical, FaUserMd, FaClinicMedical, FaHeartbeat, FaProcedures } from 'react-icons/fa';
import type { ReactElement } from 'react';

export interface Service {
  id: string;
  icon: ReactElement;
  title: string;
  description: string;
  color: string;
}

export const services: Service[] = [
  {
    id: '1',
    icon: <FaCalendarAlt className="text-4xl" />,
    title: "Easy Appointment Booking",
    description: "Schedule with specialists in minutes through our intuitive platform, available 24/7 for your convenience.",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: '2',
    icon: <FaNotesMedical className="text-4xl" />,
    title: "Digital Health Records",
    description: "Secure, cloud-based access to your complete medical history, test results, and treatment plans anytime.",
    color: "from-teal-500 to-teal-600"
  },
  {
    id: '3',
    icon: <FaUserMd className="text-4xl" />,
    title: "Top Specialists",
    description: "Connect with board-certified physicians across 25+ specialties, all carefully vetted for excellence.",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: '4',
    icon: <FaClinicMedical className="text-4xl" />,
    title: "Modern Facilities",
    description: "State-of-the-art clinics equipped with the latest diagnostic and treatment technologies.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: '5',
    icon: <FaHeartbeat className="text-4xl" />,
    title: "Preventive Care",
    description: "Comprehensive wellness programs designed to keep you healthy and detect issues early.",
    color: "from-red-500 to-red-600"
  },
  {
    id: '6',
    icon: <FaProcedures className="text-4xl" />,
    title: "Advanced Procedures",
    description: "Minimally invasive treatments and cutting-edge surgical options for better outcomes.",
    color: "from-green-500 to-green-600"
  }
];
