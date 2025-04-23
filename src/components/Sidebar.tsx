import React from 'react';
import { 
  Home, 
  Map, 
  Luggage, 
  Hotel, 
  Bus, 
  Landmark,
  Plus
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 hidden md:flex flex-col h-full">
      <div className="p-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full w-full py-2 px-4 flex items-center justify-center gap-2 transition duration-200">
          <Plus size={18} />
          <span>New trip</span>
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          <NavItem icon={<Home size={20} />} label="Home" active />
          <NavItem icon={<Map size={20} />} label="All trips" />
          <NavItem icon={<Luggage size={20} />} label="Travels" />
          <NavItem icon={<Hotel size={20} />} label="Rooms" />
          <NavItem icon={<Bus size={20} />} label="Transport" />
          <NavItem icon={<Landmark size={20} />} label="Attractions" />
        </ul>
      </nav>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <li>
      <a 
        href="#" 
        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-full ${
          active 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="text-gray-500">{icon}</span>
        <span>{label}</span>
      </a>
    </li>
  );
};