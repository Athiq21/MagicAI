import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TripMap } from '../components/TripMap';
import { MapPin } from 'lucide-react';

interface Location {
  name: string | undefined;
  lat: number;
  lng: number;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  locations?: Location[];
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setSelectedLocation(null);

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash'
      });
      
      const prompt = `Generate a list of top 5 things to do in ${input}. 
        For each item, provide a brief description and the exact location (latitude and longitude) in this format:
        Name: [Place Name]
        Description: [Brief description]
        Location: [latitude,longitude]
        ---`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the response to extract locations
      const locations = text.split('---').map(item => {
        const lines = item.split('\n');
        const name = lines.find(l => l.includes('Name:'))?.split('Name:')[1]?.trim();
        const locationMatch = lines.find(l => l.includes('Location:'))?.match(/(\d+\.\d+).*?(\d+\.\d+)/);
        
        if (locationMatch && locationMatch.length >= 3) {
          const lat = parseFloat(locationMatch[1]);
          const lng = parseFloat(locationMatch[2]);
          return {
            name,
            lat,
            lng
          };
        }
        return null;
      }).filter((loc): loc is Location => 
        loc !== null && !isNaN(loc.lat) && !isNaN(loc.lng)
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        locations
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (locations.length > 0) {
        setSelectedLocation(locations[0]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/2 p-4 border-r">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`mb-4 p-4 rounded-lg ${
                    message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                {message.role === 'assistant' && message.locations && message.locations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {message.locations.map((location, locIndex) => (
                      <button
                        key={locIndex}
                        onClick={() => handleLocationSelect(location)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                          selectedLocation?.lat === location.lat && selectedLocation?.lng === location.lng
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        <MapPin size={16} />
                        {location.name || `Location ${locIndex + 1}`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-gray-500">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a city or location..."
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2">
        {selectedLocation ? (
          <TripMap location={selectedLocation} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Enter a location to see it on the map
          </div>
        )}
      </div>
    </div>
  );
};