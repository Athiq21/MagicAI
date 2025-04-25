import React from 'react';
import { TripHeader } from '../components/TripHeader';
import { TripDetails } from '../components/TripDetails';
import { TodoList } from '../components/TodoList';
import { WeatherWidget } from '../components/WeatherWidget';
import { Timeline } from '../components/Timeline';
import { TripMap } from '../components/TripMap';
import { ExpenseChart } from '../components/ExpenseChart';

export const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-6 pb-16 md:pb-0">
      <div className="lg:col-span-3 xl:col-span-4 space-y-4 md:space-y-6">
        <TripHeader />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <TripDetails 
            title="Travel date" 
            primary="5 days" 
            startDate="01.09.2021"
            endDate="06.09.2021"
          />
          <TripDetails 
            title="People" 
            primary="2" 
            secondary="/adults"
            travelers={[
              { name: 'Marta', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
              { name: 'Artur', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
            ]}
          />
          <TripDetails 
            title="Destination" 
            primary="Rome" 
            countryFrom="Poland"
            countryTo="Italy"
            flightTime="2h 25 min flight"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <TripMap />
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <TodoList />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-3 md:p-4">
          <WeatherWidget />
        </div>
      </div>
      
      <div className="lg:col-span-2 xl:col-span-3 space-y-4 md:space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 pb-0">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Timeline</h2>
            <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200 self-start sm:self-auto">
              <span>Add event</span>
              <span className="text-lg">+</span>
            </button>
          </div>
          <Timeline />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h3 className="text-gray-500 mb-4">Expenses</h3>
          <ExpenseChart />
        </div>
      </div>
    </div>
  );
};