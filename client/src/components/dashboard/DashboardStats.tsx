import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = ({ title, value, icon, color = 'bg-blue-500' }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <div className={`${color} p-3 rounded-full mb-4`}>
          {icon ?? null}
        </div>
        <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      </div>
      <div className={`${color} bg-opacity-10 h-2 w-full`}></div>
    </div>
  );
};

interface DashboardStatsProps {
  stats: {
    appointments: number;
    patients?: number;
    doctors?: number;
    clinics?: number;
    upcoming?: number;
    revenue?: number; // Added for admin
  };
  role: 'patient' | 'doctor' | 'admin';
}

const getIcon = (statName: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    appointments: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    patients: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    doctors: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    clinics: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    upcoming: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    revenue: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return icons[statName] || icons['appointments'];
};

const DashboardStats = ({ stats, role }: DashboardStatsProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl w-full">
        {/* Common stat card for appointments */}
        <StatCard
          title="Appointments"
          value={stats.appointments}
          icon={getIcon('appointments')}
          color="bg-blue-500"
        />

        {/* Role-specific stats */}
        {role === 'admin' && (
          <>
            <StatCard
              title="Patients"
              value={stats.patients || 0}
              icon={getIcon('patients')}
              color="bg-green-500"
            />
            <StatCard
              title="Doctors"
              value={stats.doctors || 0}
              icon={getIcon('doctors')}
              color="bg-purple-500"
            />
            <StatCard
              title="Clinics"
              value={stats.clinics || 0}
              icon={getIcon('clinics')}
              color="bg-indigo-500"
            />
            {stats.revenue !== undefined && (
              <StatCard
                title="Revenue"
                value={`$${stats.revenue.toLocaleString()}`}
                icon={getIcon('revenue')}
                color="bg-teal-500"
              />
            )}
          </>
        )}

        {role === 'doctor' && (
          <>
            <StatCard
              title="Patients"
              value={stats.patients || 0}
              icon={getIcon('patients')}
              color="bg-green-500"
            />
            <StatCard
              title="Upcoming"
              value={stats.upcoming || 0}
              icon={getIcon('upcoming')}
              color="bg-amber-500"
            />
          </>
        )}

        {role === 'patient' && (
          <>
            <StatCard
              title="Upcoming"
              value={stats.upcoming || 0}
              icon={getIcon('upcoming')}
              color="bg-amber-500"
            />
            <StatCard
              title="Doctors"
              value={stats.doctors || 0}
              icon={getIcon('doctors')}
              color="bg-purple-500"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardStats;