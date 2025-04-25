import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TripMap } from '../components/TripMap';
import { MapPin, DollarSign } from 'lucide-react';
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
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setBudget(value);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/2 p-4 border-r">
        <div className="h-full flex flex-col">
          <div className="mb-4 bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
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
      <div className="w-1/2 flex flex-col">
        <div className={showBudgetCalculator && selectedLocation ? "h-1/2" : "h-full"}>
          {selectedLocation ? (
            <TripMap location={selectedLocation} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Enter a location to see it on the map
            </div>
          )}
        </div>
        
        {showBudgetCalculator && selectedLocation && (
          <div className="h-1/2 overflow-y-auto border-t">
            <TripBudgetCalculator 
              locationName={selectedLocation.name || ''} 
              totalBudget={budget}
              currency="LKR"
            />
          </div>
        )}
      </div>
    </div>
  );
};