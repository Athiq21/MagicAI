import React from 'react';
import { Sun, Cloud, CloudDrizzle, CloudSnow, Wind, MoreVertical } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-yellow-400">
            <Sun size={40} />
          </div>
          <div>
            <div className="flex items-start">
              <span className="text-4xl font-bold">30</span>
              <span className="text-xl">°</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <span>Rome</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block">
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <WeatherDay day="Mo" temp="31°" icon={<Sun size={22} />} />
        <WeatherDay day="Tu" temp="29°" icon={<Cloud size={22} />} />
        <WeatherDay day="We" temp="33°" icon={<Sun size={22} />} />
        <WeatherDay day="Th" temp="28°" icon={<CloudDrizzle size={22} />} />
        <WeatherDay day="Fr" temp="32°" icon={<Sun size={22} />} />
      </div>
    </div>
  );
};

interface WeatherDayProps {
  day: string;
  temp: string;
  icon: React.ReactNode;
}

const WeatherDay: React.FC<WeatherDayProps> = ({ day, temp, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-500 text-xs">{day}</span>
      <div className="my-2 text-gray-600">{icon}</div>
      <span className="text-sm font-medium">{temp}</span>
    </div>
  );
};