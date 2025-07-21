import { useState } from 'react';
import type { Doctor } from '@/types';

interface AvailabilityFormProps {
  schedule: Doctor['schedule'];
  onSave: (schedule: Doctor['schedule']) => void;
  isSaving: boolean;
}

const AvailabilityForm = ({ schedule, onSave, isSaving }: AvailabilityFormProps) => {
  const [localSchedule, setLocalSchedule] = useState<Doctor['schedule']>(schedule || {});
  const [newSlot, setNewSlot] = useState({ day: 'monday', time: '' });

  const days = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];

  const handleAddSlot = () => {
    if (!newSlot.time) return;
    
    const day = newSlot.day;
    const updatedSchedule = { ...localSchedule };
    
    if (!updatedSchedule[day]) {
      updatedSchedule[day] = [];
    }
    
    if (!updatedSchedule[day].includes(newSlot.time)) {
      updatedSchedule[day] = [...updatedSchedule[day], newSlot.time].sort();
      setLocalSchedule(updatedSchedule);
    }
    
    setNewSlot({ ...newSlot, time: '' });
  };

  const handleRemoveSlot = (day: string, time: string) => {
    const updatedSchedule = { ...localSchedule };
    updatedSchedule[day] = updatedSchedule[day].filter(t => t !== time);
    
    if (updatedSchedule[day].length === 0) {
      delete updatedSchedule[day];
    }
    
    setLocalSchedule(updatedSchedule);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Time Slot</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Day</label>
            <select
              value={newSlot.day}
              onChange={e => setNewSlot({ ...newSlot, day: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {days.map(day => (
                <option key={day.value} value={day.value}>{day.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Time (e.g., 09:00 AM)</label>
            <input
              type="text"
              value={newSlot.time}
              onChange={e => setNewSlot({ ...newSlot, time: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="09:00 AM"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleAddSlot}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Slot
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Current Availability</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map(day => {
            const slots = localSchedule[day.value] || [];
            
            return (
              <div key={day.value} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">{day.label}</h3>
                
                {slots.length > 0 ? (
                  <ul className="space-y-2">
                    {slots.map((slot, index) => (
                      <li 
                        key={index} 
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <span>{slot}</span>
                        <button
                          onClick={() => handleRemoveSlot(day.value, slot)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No slots added</p>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => onSave(localSchedule)}
            disabled={isSaving}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Availability'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityForm;