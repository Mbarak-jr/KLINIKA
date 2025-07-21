import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';

import PatientDashboard from '@/pages/dashboard/PatientDashboard';
import DoctorDashboard from '@/pages/dashboard/DoctorDashboard';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';

// Import new doctor pages
import DoctorAppointments from '@/pages/doctors/DoctorAppointments';
import DoctorSchedule from '@/pages/doctors/DoctorSchedule';
import SetAvailability from '@/pages/doctors/SetAvailability';

import BookAppointment from '@/pages/appointments/BookAppointment';
import MyAppointments from '@/pages/appointments/MyAppointments';

import ViewClinics from '@/pages/clinics/ViewClinics';
import ManageClinics from '@/pages/clinics/ManageClinics';

import BrowseDoctors from '@/pages/doctors/BrowseDoctors';
import DoctorDetailPage from '@/pages/doctors/DoctorDetailPage';
import OurServicesPage from '@/pages/ourservices';

function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
      <Route path="/services" element={<OurServicesPage />} />
      <Route path="/clinics" element={<ViewClinics />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        {/* Add new doctor routes here */}
        <Route path="/doctor-dashboard/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-schedule" element={<DoctorSchedule />} />
        <Route path="/set-availability" element={<SetAvailability />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-clinics" element={<ManageClinics />} />
      </Route>

      {/* Shared protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']} />}>
        <Route path="/doctors" element={<BrowseDoctors />} />
        <Route path="/doctors/:id" element={<DoctorDetailPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;