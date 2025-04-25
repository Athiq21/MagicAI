import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TripMap } from '../components/TripMap';
import { MapPin, DollarSign, MessageSquare, Map, ChevronUp, ChevronDown } from 'lucide-react';
import { TripBudgetCalculator } from '../components/TripBudgetCalculator';

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
  const [budget, setBudget] = useState<number>(4000); // Default budget of 4000 LKR
  const [showBudgetCalculator, setShowBudgetCalculator] = useState(false);
  const [activePanel, setActivePanel] = useState<'chat' | 'map'>('chat'); // For mobile view
  const [expandedMap, setExpandedMap] = useState(false); // For mobile view toggle
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if on mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };
    
    // Check initially
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check if the input contains budget information
    const budgetMatch = input.match(/budget of (\d+)/i);
    if (budgetMatch && budgetMatch[1]) {
      const newBudget = parseInt(budgetMatch[1], 10);
      if (!isNaN(newBudget)) {
        setBudget(newBudget);
      }
    }

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
        setShowBudgetCalculator(true);
        // On mobile, switch to map view when we get locations
        setActivePanel('map');
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
    setShowBudgetCalculator(true);
    // On mobile, switch to map view when location is selected
    setActivePanel('map');
    // Reset expanded state
    setExpandedMap(false);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setBudget(value);
    }
  };

  // Toggle map and calculator view
  const toggleMapExpand = () => {
    setExpandedMap(!expandedMap);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Mobile view panel toggle */}
      <div className="md:hidden flex border-b mb-2">
        <button 
          className={`flex-1 p-3 text-center flex justify-center items-center gap-2 ${activePanel === 'chat' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActivePanel('chat')}
        >
          <MessageSquare size={18} />
          <span>Chat</span>
        </button>
        <button 
          className={`flex-1 p-3 text-center flex justify-center items-center gap-2 ${activePanel === 'map' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActivePanel('map')}
        >
          <Map size={18} />
          <span>Map</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Chat panel */}
        <div className={`${activePanel === 'chat' ? 'flex' : 'hidden'} md:flex md:w-1/2 flex-col p-2 md:p-4 border-r overflow-hidden`}>
          <div className="mb-2 md:mb-4 bg-white p-3 rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <DollarSign size={16} className="text-green-600" />
              <label htmlFor="budget" className="text-sm font-medium">Your Budget:</label>
              <input
                id="budget"
                type="number"
                min="1"
                value={budget}
                onChange={handleBudgetChange}
                className="border rounded px-2 py-1 w-24 text-sm"
              />
              <span className="text-sm text-gray-600">LKR</span>
            </div>
            <p className="text-xs text-gray-500">Enter your budget to see cost breakdown for each location</p>
          </div>
          
          <div className="flex-1 overflow-y-auto mb-2 md:mb-4">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`mb-3 md:mb-4 p-3 md:p-4 rounded-lg ${
                    message.role === 'user' ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-gray-100 max-w-[90%]'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm md:text-base">{message.content}</div>
                </div>
                {message.role === 'assistant' && message.locations && message.locations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {message.locations.map((location, locIndex) => (
                      <button
                        key={locIndex}
                        onClick={() => handleLocationSelect(location)}
                        className={`flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm ${
                          selectedLocation?.lat === location.lat && selectedLocation?.lng === location.lng
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        <MapPin size={14} />
                        <span className="truncate max-w-[120px] md:max-w-none">{location.name || `Location ${locIndex + 1}`}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 text-sm">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a city or location..."
              className="flex-1 p-2 text-sm md:text-base border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded disabled:opacity-50 text-sm md:text-base"
            >
              Send
            </button>
          </form>
        </div>

        {/* Map panel */}
        <div className={`${activePanel === 'map' ? 'flex' : 'hidden'} md:flex md:w-1/2 flex-col`}>
          {/* Mobile map toggle button - only visible when calculator shown and on mobile */}
          {isMobile && showBudgetCalculator && selectedLocation && (
            <button 
              onClick={toggleMapExpand}
              className="p-2 bg-gray-100 text-gray-700 flex justify-center items-center gap-1 text-sm"
            >
              {expandedMap ? (
                <>
                  <ChevronDown size={18} />
                  <span>Show Budget Details</span>
                </>
              ) : (
                <>
                  <ChevronUp size={18} />
                  <span>Expand Map</span>
                </>
              )}
            </button>
          )}
          
          {/* Map with dynamic height based on mobile/expanded state */}
          <div className={`
            ${(showBudgetCalculator && selectedLocation) 
              ? isMobile 
                ? expandedMap ? 'h-full' : 'h-[40vh]' 
                : 'h-1/2' 
              : 'h-full'}
            transition-all duration-300
          `}>
            {selectedLocation ? (
              <TripMap location={selectedLocation} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50 p-4 text-center">
                <div>
                  <p className="mb-2">Enter a location in the chat to see it on the map</p>
                  <MapPin size={32} className="mx-auto text-gray-400" />
                </div>
              </div>
            )}
          </div>
          
          {/* Budget calculator - hidden when map is expanded on mobile */}
          {showBudgetCalculator && selectedLocation && (
            <div className={`
              ${isMobile && expandedMap ? 'hidden' : 'block'}
              ${isMobile ? 'h-[calc(60vh-40px)]' : 'h-1/2'} 
              overflow-y-auto border-t
            `}>
              <TripBudgetCalculator 
                locationName={selectedLocation.name || ''} 
                totalBudget={budget}
                currency="LKR"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};