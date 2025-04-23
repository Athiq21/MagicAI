import React from 'react';
import { ChevronLeft, ChevronRight, Plane, Bus } from 'lucide-react';

export const Timeline: React.FC = () => {
  // Calendar data for September
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const weeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null]
  ];
  
  const events = [
    {
      id: 1,
      type: 'flight',
      title: 'Warsaw → Rome',
      time: '8:00 - 9:15',
      icon: <Plane className="h-4 w-4" />,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 2,
      type: 'bus',
      title: 'Bus transfer',
      time: '9:30 - 10:00',
      icon: <Bus className="h-4 w-4" />,
      color: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">September</h3>
        <div className="flex gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <ChevronLeft size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="calendar mb-6">
        <div className="grid grid-cols-7 text-center mb-2">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="text-xs text-gray-500">{day}</div>
          ))}
        </div>
        
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 text-center">
            {week.map((day, dayIndex) => (
              <div 
                key={dayIndex} 
                className={`py-1 text-sm ${
                  day === 17 ? 'bg-blue-500 text-white rounded-full' 
                  : day ? 'hover:bg-gray-100 cursor-pointer' 
                  : ''
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="relative border-t border-gray-200 pt-4">
        <div className="absolute left-0 top-4 bottom-0 w-10 flex flex-col text-xs text-gray-500">
          <div className="h-16 flex items-start">8:00</div>
          <div className="h-16 flex items-start">8:30</div>
          <div className="h-16 flex items-start">9:00</div>
          <div className="h-16 flex items-start">9:30</div>
        </div>
        
        <div className="ml-10 space-y-2">
          {events.map(event => (
            <div 
              key={event.id}
              className={`rounded-md p-2 relative ${event.color}`}
              style={{ 
                marginTop: event.id === 1 ? '0' : '64px' 
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {event.icon}
                  <span className="font-medium">{event.title}</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="text-xs opacity-80 mt-1">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Import at the top
import { MoreVertical } from 'lucide-react';