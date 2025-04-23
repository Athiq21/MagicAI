export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: number;
  travelers: Traveler[];
  todo: TodoItem[];
}

export interface Traveler {
  id: string;
  name: string;
  avatar: string;
}

export interface TodoItem {
  id: string;
  task: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface WeatherData {
  current: {
    temp: number;
    icon: string;
  };
  forecast: {
    day: string;
    temp: number;
    icon: string;
  }[];
}

export interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: 'flight' | 'hotel' | 'activity' | 'transport';
  color: string;
}