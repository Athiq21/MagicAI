import React from 'react';

interface TripMapProps {
  location?: {
    lat: number;
    lng: number;
  };
}

export const TripMap: React.FC<TripMapProps> = ({ location }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!location) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No location selected
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location.lat},${location.lng}`}
      />
    </div>
  );
};