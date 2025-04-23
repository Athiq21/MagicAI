import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const TripHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-amber-50 rounded-xl shadow-sm">
      <div className="absolute right-0 top-0 h-full w-1/2">
        <img 
          src="https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Colosseum" 
          className="h-full w-full object-cover opacity-80"
        />
      </div>
      
      <div className="relative z-10 p-6">
        <div className="text-sm text-gray-600 mb-1">Nearest trip</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Rome</h1>
        
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-600 hover:bg-white transition duration-200">
            <ArrowLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-600 hover:bg-white transition duration-200">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};