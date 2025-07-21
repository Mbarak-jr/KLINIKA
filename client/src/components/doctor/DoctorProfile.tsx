import type { Doctor } from '@/types'

interface DoctorProfileProps {
  doctor: Doctor
}

const DoctorProfile = ({ doctor }: DoctorProfileProps) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl">{doctor.user.name}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">Specialization</h3>
            <p>{doctor.specialization}</p>
          </div>
          <div>
            <h3 className="font-bold">Qualifications</h3>
            <ul className="list-disc pl-5">
              {doctor.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Schedule</h3>
            <ul className="list-disc pl-5">
              {Object.entries(doctor.schedule).map(([day, times], index) => (
                <li key={index}>
                  <strong>{day}:</strong> {times.join(', ')}
                </li>
              ))}
            </ul>
          </div>
          {typeof doctor.clinic !== 'string' && doctor.clinic && (
            <div>
              <h3 className="font-bold">Clinic</h3>
              <p>{doctor.clinic.name}</p>
              <p>{doctor.clinic.address}</p>
              <p>{doctor.clinic.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
