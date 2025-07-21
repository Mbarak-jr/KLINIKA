import type { Doctor } from '@/types';

interface ScheduleCalendarProps {
  schedule: Doctor['schedule'];
}

const ScheduleCalendar = ({ schedule }: ScheduleCalendarProps) => {
  const days = [
    { name: 'Monday', key: 'monday' },
    { name: 'Tuesday', key: 'tuesday' },
    { name: 'Wednesday', key: 'wednesday' },
    { name: 'Thursday', key: 'thursday' },
    { name: 'Friday', key: 'friday' },
    { name: 'Saturday', key: 'saturday' },
    { name: 'Sunday', key: 'sunday' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {days.map(day => {
        const slots = schedule[day.key] || [];
        
        return (
          <div key={day.key} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{day.name}</h2>
            
            {slots.length > 0 ? (
              <ul className="space-y-2">
                {slots.map((slot, index) => (
                  <li 
                    key={index} 
                    className="bg-blue-50 p-3 rounded flex justify-between items-center"
                  >
                    <span>{slot}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      Available
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No availability set</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleCalendar;