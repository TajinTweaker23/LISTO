import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Battery, 
  Zap, 
  Sun, 
  Cloud, 
  Brain,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit3,
  Clock,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Droplets,
  Save,
  X
} from 'lucide-react';

// Enhanced interfaces with better typing
interface EnergyLevel {
  value: number; // 1-10
  type: 'predicted' | 'actual' | 'user-input';
  factors: string[];
  confidence: number; // 0-1
  lastUpdated?: Date;
}

interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  energyRequired: number; // 1-10 spoons
  energyCost: number; // actual energy spent
  type: 'work' | 'social' | 'personal' | 'health' | 'creative';
  isFlexible: boolean;
  canReschedule: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  completed?: boolean;
  rescheduledCount?: number;
  originalDate?: Date;
  description?: string;
  location?: string;
}

interface DayData {
  date: Date;
  energyLevels: {
    morning: EnergyLevel;
    afternoon: EnergyLevel;
    evening: EnergyLevel;
  };
  events: CalendarEvent[];
  spoonBalance: number; // available spoons for the day
  weatherImpact: number; // -5 to +5
  cycleImpact?: number; // -3 to +3 for menstrual cycle
  sleepQuality?: number; // 1-10
  moodRating?: number; // 1-10
  notes?: string;
}

interface CalendarProps {
  onEventUpdate?: (event: CalendarEvent) => void;
  onEnergyUpdate?: (date: Date, energy: Partial<DayData['energyLevels']>) => void;
  onEventCreate?: (event: CalendarEvent) => void;
  theme?: 'light' | 'dark';
  userId?: string;
}

// Custom hooks for better state management
const useCalendarData = () => {
  const [calendarData, setCalendarData] = useState<Map<string, DayData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDateKey = useCallback((date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }, []);

  const generateDayData = useCallback((date: Date): DayData => {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // More sophisticated energy prediction
    const baseEnergy = isWeekend ? 7 : 6;
    const variance = (Math.random() - 0.5) * 2; // -1 to +1
    
    return {
      date,
      energyLevels: {
        morning: {
          value: Math.max(1, Math.min(10, Math.round(baseEnergy + variance + 1))),
          type: 'predicted',
          factors: ['sleep quality', 'weather', 'previous day activity'],
          confidence: 0.7,
          lastUpdated: new Date()
        },
        afternoon: {
          value: Math.max(1, Math.min(10, Math.round(baseEnergy + variance))),
          type: 'predicted',
          factors: ['morning energy', 'nutrition', 'social interactions'],
          confidence: 0.6,
          lastUpdated: new Date()
        },
        evening: {
          value: Math.max(1, Math.min(10, Math.round(baseEnergy + variance - 1))),
          type: 'predicted',
          factors: ['daily activities', 'social battery', 'stress levels'],
          confidence: 0.5,
          lastUpdated: new Date()
        }
      },
      events: [],
      spoonBalance: Math.round(baseEnergy + variance + 2),
      weatherImpact: Math.round((Math.random() - 0.5) * 4), // -2 to +2
      sleepQuality: Math.round(6 + Math.random() * 3), // 6-9
      moodRating: Math.round(5 + Math.random() * 4) // 5-9
    };
  }, []);

  const loadCalendarData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const sampleData = new Map<string, DayData>();
      const today = new Date();
      
      // Generate data for current month ± 15 days
      for (let i = -15; i <= 45; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dateKey = formatDateKey(date);
        sampleData.set(dateKey, generateDayData(date));
      }
      
      setCalendarData(sampleData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load calendar data');
    } finally {
      setIsLoading(false);
    }
  }, [formatDateKey, generateDayData]);

  const updateDayData = useCallback((dateKey: string, updater: (data: DayData) => DayData) => {
    setCalendarData(prev => {
      const newMap = new Map(prev);
      const existingData = newMap.get(dateKey);
      if (existingData) {
        newMap.set(dateKey, updater(existingData));
      }
      return newMap;
    });
  }, []);

  const getDayData = useCallback((date: Date): DayData | undefined => {
    const dateKey = formatDateKey(date);
    return calendarData.get(dateKey);
  }, [calendarData, formatDateKey]);

  useEffect(() => {
    loadCalendarData();
  }, [loadCalendarData]);

  return {
    calendarData,
    isLoading,
    error,
    formatDateKey,
    generateDayData,
    updateDayData,
    getDayData,
    setCalendarData,
    refetch: loadCalendarData
  };
};

// Utility functions
const getEnergyColor = (energy: number): string => {
  if (energy <= 3) return 'text-red-500 bg-red-50 border-red-200';
  if (energy <= 6) return 'text-yellow-500 bg-yellow-50 border-yellow-200';
  return 'text-green-500 bg-green-50 border-green-200';
};

const getEventTypeColor = (type: CalendarEvent['type']): string => {
  const colors = {
    work: 'bg-blue-100 text-blue-700 border-blue-200',
    social: 'bg-pink-100 text-pink-700 border-pink-200',
    personal: 'bg-green-100 text-green-700 border-green-200',
    health: 'bg-purple-100 text-purple-700 border-purple-200',
    creative: 'bg-orange-100 text-orange-700 border-orange-200'
  };
  return colors[type] || colors.personal;
};

const getPriorityIcon = (priority: CalendarEvent['priority']) => {
  const iconProps = { className: "w-3 h-3" };
  switch (priority) {
    case 'critical': return <AlertCircle {...iconProps} className="w-3 h-3 text-red-600" />;
    case 'high': return <Zap {...iconProps} className="w-3 h-3 text-orange-600" />;
    case 'medium': return <Clock {...iconProps} className="w-3 h-3 text-yellow-600" />;
    default: return <CheckCircle2 {...iconProps} className="w-3 h-3 text-green-600" />;
  }
};

const getSpoonDisplay = (required: number, available: number): string => {
  const spoons = '🥄'.repeat(Math.min(required, available));
  const emptySpoons = '⚪'.repeat(Math.max(0, required - available));
  return spoons + emptySpoons;
};

const formatTimeRemaining = (deadline: Date): string => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days < 0) return 'Expired';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days} days`;
};

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
    />
    <span className="ml-3 text-gray-600">Loading calendar...</span>
  </div>
);

// Error component
const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="text-center py-12 bg-white rounded-xl shadow-lg">
    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">Unable to load calendar</h3>
    <p className="text-gray-600 mb-6">{error}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Main Calendar Component
const EnergyAwareCalendar: React.FC<CalendarProps> = ({ 
  onEventUpdate, 
  onEnergyUpdate,
  onEventCreate,
  theme = 'light',
  userId = 'current-user'
}) => {
  const {
    calendarData,
    isLoading,
    error,
    formatDateKey,
    generateDayData,
    updateDayData,
    getDayData,
    setCalendarData,
    refetch
  } = useCalendarData();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEnergyInput, setShowEnergyInput] = useState(false);
  const [energyInput, setEnergyInput] = useState({
    morning: 5,
    afternoon: 5,
    evening: 5
  });
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    type: 'personal',
    priority: 'medium',
    energyRequired: 5,
    isFlexible: false,
    canReschedule: true
  });

  // Memoized selected date data
  const selectedDateData = useMemo(() => {
    return getDayData(selectedDate);
  }, [selectedDate, getDayData]);

  // Calendar navigation
  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }, []);

  // Event handlers
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    const dateKey = formatDateKey(date);
    if (!calendarData.has(dateKey)) {
      const dayData = generateDayData(date);
      setCalendarData(prev => new Map(prev).set(dateKey, dayData));
    }
  }, [calendarData, formatDateKey, generateDayData, setCalendarData]);

  const handleEnergyUpdate = useCallback((period: 'morning' | 'afternoon' | 'evening') => {
    const dateKey = formatDateKey(selectedDate);
    
    updateDayData(dateKey, (currentData) => ({
      ...currentData,
      energyLevels: {
        ...currentData.energyLevels,
        [period]: {
          ...currentData.energyLevels[period],
          value: energyInput[period],
          type: 'user-input' as const,
          confidence: 1,
          lastUpdated: new Date()
        }
      }
    }));

    onEnergyUpdate?.(selectedDate, { [period]: {
      value: energyInput[period],
      type: 'user-input',
      confidence: 1,
      factors: ['user input'],
      lastUpdated: new Date()
    }});

    // Show success feedback
    alert(`Energy level updated for ${period}!`);
  }, [selectedDate, energyInput, formatDateKey, updateDayData, onEnergyUpdate]);

  const handleEventCreate = useCallback(() => {
    if (!newEvent.title?.trim()) {
      alert('Please enter an event title');
      return;
    }

    const startTime = new Date(selectedDate);
    startTime.setHours(9, 0, 0, 0); // Default to 9 AM

    const event: CalendarEvent = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newEvent.title.trim(),
      description: newEvent.description?.trim() || '',
      startTime,
      endTime: new Date(startTime.getTime() + 60 * 60 * 1000), // 1 hour default
      energyRequired: newEvent.energyRequired || 5,
      energyCost: 0,
      type: newEvent.type || 'personal',
      isFlexible: newEvent.isFlexible || false,
      canReschedule: newEvent.canReschedule !== false,
      priority: newEvent.priority || 'medium',
      rescheduledCount: 0
    };

    const dateKey = formatDateKey(selectedDate);
    updateDayData(dateKey, (currentData) => ({
      ...currentData,
      events: [...currentData.events, event]
    }));

    onEventCreate?.(event);
    setNewEvent({
      title: '',
      description: '',
      type: 'personal',
      priority: 'medium',
      energyRequired: 5,
      isFlexible: false,
      canReschedule: true
    });
    setShowEventModal(false);
    alert('Event added successfully!');
  }, [newEvent, selectedDate, formatDateKey, updateDayData, onEventCreate]);

  const handleRescheduleEvent = useCallback((eventId: string) => {
    // Find the event across all days
    let sourceDate: string | null = null;
    let eventToReschedule: CalendarEvent | null = null;

    for (const [dateKey, dayData] of Array.from(calendarData.entries())) {
      const event = dayData.events.find(e => e.id === eventId);
      if (event) {
        sourceDate = dateKey;
        eventToReschedule = event;
        break;
      }
    }

    if (!eventToReschedule || !eventToReschedule.canReschedule || !sourceDate) {
      alert('This event cannot be rescheduled');
      return;
    }

    // Find better energy day within next 7 days
    const today = new Date();
    let bestDateKey: string | null = null;
    let bestScore = 0;

    for (let i = 1; i <= 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dateKey = formatDateKey(checkDate);
      const dayData = calendarData.get(dateKey);
      
      if (dayData) {
        const avgEnergy = (dayData.energyLevels.morning.value + 
                          dayData.energyLevels.afternoon.value + 
                          dayData.energyLevels.evening.value) / 3;
        const eventsLoad = dayData.events.reduce((sum, e) => sum + e.energyRequired, 0);
        const score = avgEnergy - eventsLoad;
        
        if (score > bestScore) {
          bestScore = score;
          bestDateKey = dateKey;
        }
      }
    }

    if (bestDateKey && bestScore > 0) {
      // Remove from source date
      updateDayData(sourceDate, (currentData) => ({
        ...currentData,
        events: currentData.events.filter(e => e.id !== eventId)
      }));

      // Add to better date
      const targetDate = new Date(bestDateKey);
      const rescheduledEvent = {
        ...eventToReschedule,
        startTime: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 
                           eventToReschedule.startTime.getHours(), eventToReschedule.startTime.getMinutes()),
        endTime: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 
                         eventToReschedule.endTime.getHours(), eventToReschedule.endTime.getMinutes()),
        rescheduledCount: (eventToReschedule.rescheduledCount || 0) + 1,
        originalDate: eventToReschedule.originalDate || eventToReschedule.startTime
      };

      updateDayData(bestDateKey, (currentData) => ({
        ...currentData,
        events: [...currentData.events, rescheduledEvent]
      }));

      onEventUpdate?.(rescheduledEvent);
      alert(`Event rescheduled to ${targetDate.toLocaleDateString()} for better energy alignment!`);
    } else {
      alert('No better energy days found in the next week');
    }
  }, [calendarData, formatDateKey, updateDayData, onEventUpdate]);

  // Calendar grid generation
  const renderCalendarGrid = useCallback((): React.ReactElement[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: React.ReactElement[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateKey = formatDateKey(date);
      const dayData = calendarData.get(dateKey);
      const isToday = date.toDateString() === today.toDateString();
      const isCurrentMonth = date.getMonth() === month;
      const isSelected = date.toDateString() === selectedDate.toDateString();

      const avgEnergy = dayData ? 
        Math.round((dayData.energyLevels.morning.value + 
                   dayData.energyLevels.afternoon.value + 
                   dayData.energyLevels.evening.value) / 3) : 5;

      days.push(
        <motion.button
          key={dateKey}
          onClick={() => handleDateSelect(date)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative p-2 border cursor-pointer transition-all min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400
            ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-400' : 'border-gray-200 hover:border-blue-300'}
            ${!isCurrentMonth ? 'opacity-50 bg-gray-50' : 'bg-white'}
            ${isToday ? 'ring-2 ring-green-400' : ''}
          `}
          aria-label={`${date.toLocaleDateString()}, ${dayData?.events.length || 0} events, energy level ${avgEnergy}`}
          aria-selected={isSelected}
          role="gridcell"
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-green-600' : 'text-gray-700'}`}>
              {date.getDate()}
            </span>
            {dayData && (
              <div className={`text-xs px-1 rounded border ${getEnergyColor(avgEnergy)}`}>
                <Battery className="w-3 h-3 inline" aria-hidden="true" />
                <span className="sr-only">Energy level</span>
                {avgEnergy}
              </div>
            )}
          </div>

          {dayData && dayData.events.length > 0 && (
            <div className="space-y-1">
              {dayData.events.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded border ${getEventTypeColor(event.type)} truncate`}
                >
                  {getPriorityIcon(event.priority)}
                  <span className="ml-1">{event.title}</span>
                </div>
              ))}
              {dayData.events.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{dayData.events.length - 2} more
                </div>
              )}
            </div>
          )}

          {dayData && dayData.weatherImpact !== 0 && (
            <div className={`absolute bottom-1 right-1 text-xs ${dayData.weatherImpact > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {dayData.weatherImpact > 0 ? <Sun className="w-3 h-3" /> : <Cloud className="w-3 h-3" />}
            </div>
          )}
        </motion.button>
      );
    }

    return days;
  }, [currentDate, calendarData, selectedDate, formatDateKey, handleDateSelect]);

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Energy-Aware Calendar
        </h1>
        <p className="text-gray-600">
          Plan your schedule around your natural energy patterns
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToToday}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 px-4 py-2 bg-gray-50 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div 
              className="grid grid-cols-7 gap-1 p-4"
              role="grid"
              aria-label={`Calendar for ${currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
            >
              {renderCalendarGrid()}
            </div>
          </div>
        </div>

        {/* Selected Day Details */}
        <div className="space-y-4">
          {/* Energy Levels */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                Energy Forecast
              </h3>
              <button
                onClick={() => setShowEnergyInput(!showEnergyInput)}
                className="text-blue-600 hover:text-blue-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Update energy levels"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-sm text-gray-600 mb-3">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>

            {selectedDateData && (
              <div className="space-y-3">
                {Object.entries(selectedDateData.energyLevels).map(([period, energy]) => (
                  <div key={period} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="capitalize text-sm font-medium w-20">{period}</span>
                      <div className={`px-2 py-1 rounded text-xs border ${getEnergyColor(energy.value)}`}>
                        <Battery className="w-3 h-3 inline mr-1" />
                        {energy.value}/10
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {energy.type === 'user-input' ? '✓ actual' : '~ predicted'}
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Available energy: {getSpoonDisplay(selectedDateData.spoonBalance, selectedDateData.spoonBalance)}</div>
                    {selectedDateData.weatherImpact !== 0 && (
                      <div className="flex items-center gap-1">
                        {selectedDateData.weatherImpact > 0 ? 
                          <Sun className="w-3 h-3 text-yellow-500" /> : 
                          <Cloud className="w-3 h-3 text-gray-500" />
                        }
                        <span>Weather impact: {selectedDateData.weatherImpact > 0 ? '+' : ''}{selectedDateData.weatherImpact}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence>
              {showEnergyInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-3 border-t border-gray-200 mt-4"
                >
                  {(['morning', 'afternoon', 'evening'] as const).map((period) => (
                    <div key={period} className="flex items-center gap-3">
                      <label className="capitalize text-sm w-20" htmlFor={`energy-${period}`}>
                        {period}:
                      </label>
                      <input
                        id={`energy-${period}`}
                        type="range"
                        min="1"
                        max="10"
                        value={energyInput[period]}
                        onChange={(e) => setEnergyInput(prev => ({
                          ...prev,
                          [period]: parseInt(e.target.value)
                        }))}
                        className="flex-1"
                        aria-label={`${period} energy level`}
                      />
                      <span className="text-sm w-8">{energyInput[period]}</span>
                      <button
                        onClick={() => handleEnergyUpdate(period)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label={`Save ${period} energy level`}
                      >
                        <Save className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Events for Selected Day */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                Events
              </h3>
              <button
                onClick={() => setShowEventModal(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Add new event"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {selectedDateData?.events.length ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedDateData.events.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getPriorityIcon(event.priority)}
                          <span className="font-medium text-sm">{event.title}</span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>{event.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                          <div>Energy needed: {getSpoonDisplay(event.energyRequired, event.energyRequired)}</div>
                          {event.rescheduledCount && event.rescheduledCount > 0 && (
                            <div className="text-orange-600">Rescheduled {event.rescheduledCount}x</div>
                          )}
                        </div>
                      </div>
                      
                      {event.canReschedule && (
                        <button
                          onClick={() => handleRescheduleEvent(event.id)}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          aria-label="Reschedule to better energy day"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No events scheduled</p>
                <p className="text-sm mt-1">Click 'Add' to create your first event</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Creation Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4"
              role="dialog"
              aria-labelledby="event-modal-title"
              aria-describedby="event-modal-description"
            >
              <div className="flex items-center justify-between">
                <h3 id="event-modal-title" className="text-xl font-semibold">Add Event</h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div id="event-modal-description" className="sr-only">
                Create a new event for {selectedDate.toLocaleDateString()}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    id="event-title"
                    type="text"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Team meeting"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="event-description"
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Optional details about the event"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      id="event-type"
                      value={newEvent.type || 'personal'}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as CalendarEvent['type'] }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="work">Work</option>
                      <option value="social">Social</option>
                      <option value="personal">Personal</option>
                      <option value="health">Health</option>
                      <option value="creative">Creative</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="event-priority" className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      id="event-priority"
                      value={newEvent.priority || 'medium'}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, priority: e.target.value as CalendarEvent['priority'] }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="event-energy" className="block text-sm font-medium text-gray-700 mb-1">
                    Energy Required: {newEvent.energyRequired || 5}/10
                  </label>
                  <input
                    id="event-energy"
                    type="range"
                    min="1"
                    max="10"
                    value={newEvent.energyRequired || 5}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, energyRequired: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 text-center mt-1">
                    {getSpoonDisplay(newEvent.energyRequired || 5, newEvent.energyRequired || 5)}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newEvent.isFlexible || false}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, isFlexible: e.target.checked }))}
                      className="rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm">Flexible timing</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newEvent.canReschedule !== false}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, canReschedule: e.target.checked }))}
                      className="rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm">Can reschedule</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEventCreate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={!newEvent.title?.trim()}
                >
                  Add Event
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnergyAwareCalendar;