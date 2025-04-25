import React, { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the lg breakpoint in Tailwind
    };
    
    // Check initially
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className={`
        flex-1 overflow-y-auto 
        p-4 md:p-6 
        ${isMobile ? 'w-full' : 'w-[calc(100%-16rem)]'} 
        transition-all duration-300 ease-in-out
      `}>
        {/* Add top padding on mobile to account for the menu button */}
        <div className={`${isMobile ? 'pt-12' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
};