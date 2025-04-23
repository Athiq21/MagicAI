import React from 'react';
import { Calendar, MoreVertical, Plus } from 'lucide-react';

interface Traveler {
  name: string;
  image: string;
}

interface TripDetailsProps {
  title: string;
  primary: string;
  secondary?: string;
  startDate?: string;
  endDate?: string;
  travelers?: Traveler[];
  countryFrom?: string;
  countryTo?: string;
  flightTime?: string;
}

export const TripDetails: React.FC<TripDetailsProps> = ({
  title,
  primary,
  secondary,
  startDate,
  endDate,
  travelers,
  countryFrom,
  countryTo,
  flightTime
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-end mb-4">
          <span className="text-3xl font-bold text-gray-800 mr-1">{primary}</span>
          {secondary && <span className="text-sm text-gray-500">{secondary}</span>}
        </div>
        
        {startDate && endDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{startDate}</span>
            <Calendar size={14} className="text-blue-500" />
            <span>{endDate}</span>
          </div>
        )}
        
        {travelers && (
          <div className="mt-3 flex items-center">
            <div className="flex -space-x-2">
              {travelers.map((traveler, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  title={traveler.name}
                >
                  <img 
                    src={traveler.image} 
                    alt={traveler.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ml-1 text-gray-500 hover:bg-gray-200 transition duration-200">
              <Plus size={16} />
            </button>
          </div>
        )}
        
        {countryFrom && countryTo && (
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1">
                <span className="w-4 h-4 bg-red-500 rounded-sm inline-block"></span>
                <span className="text-sm">{countryFrom}</span>
              </span>
              
              <span className="inline-flex items-center gap-1">
                <span className="w-4 h-4 bg-green-500 rounded-sm inline-block"></span>
                <span className="text-sm">{countryTo}</span>
              </span>
            </div>
            
            <div className="text-sm text-gray-500">
              {flightTime}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};