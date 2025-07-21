export type User = {
  _id: string
  name: string
  email: string
  role: 'patient' | 'doctor' | 'admin'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export type Doctor = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  specialization: string;
  qualifications: string[];
  experience: number;
  clinic?: string | Clinic;
  schedule: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
};

export type Clinic = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  hours: Record<string, string>;
  services: string[];
  createdAt: string;
  updatedAt: string;
};

export type Appointment = {
  _id: string
  patient: string | User
  doctor: string | Doctor
  clinic: string | Clinic
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  createdAt: string
  updatedAt: string
}

export type AuthResponse = {
  token: string
  user: User
}

export type ApiError = {
  message: string
  statusCode: number
  errors?: Record<string, string>
}

export interface ScheduleSlot {
  day: string;
  startTime: string;
  endTime: string;
}
