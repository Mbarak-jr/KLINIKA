import type { FC } from 'react';

interface AppointmentFilterProps {
  currentFilter: 'all' | 'upcoming' | 'past';
  onFilterChange: (filter: 'all' | 'upcoming' | 'past') => void;
}

const AppointmentFilter: FC<AppointmentFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex space-x-2">
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === 'upcoming'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('upcoming')}
      >
        Upcoming
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === 'past'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('past')}
      >
        Past
      </button>
    </div>
  );
};

export default AppointmentFilter;
