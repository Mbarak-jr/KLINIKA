import type { Appointment } from '@/types';
import AppointmentCard from './AppointmentCard';

interface AppointmentListProps {
  appointments: Appointment[];
  onEdit?: (appointment: Appointment) => void;
  onCancel?: (id: string) => void;
  role?: string; // ✅ Add role prop
}

const AppointmentList = ({ appointments, onEdit, onCancel, role }: AppointmentListProps) => {
  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            appointment={appointment}
            onEdit={onEdit ? () => onEdit(appointment) : undefined}
            onCancel={onCancel ? () => onCancel(appointment._id) : undefined}
            role={role} // ✅ Pass role to AppointmentCard
          />
        ))
      )}
    </div>
  );
};

export default AppointmentList;
