import React, { useState, useEffect } from 'react';
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
  RotateCcw
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import { useToast } from '../../hooks/useToast';

interface EnergyLevel {
  value: number; // 1-10
  type: 'predicted' | 'actual' | 'user-input';
  factors: string[];
  confidence: number; // 0-1
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
}

interface EnergyAwareCalendarProps {
  onEventUpdate?: (event: CalendarEvent) => void;
  onEnergyUpdate?: (date: Date, energy: Partial<DayData['energyLevels']>) => void;
  theme?: 'light' | 'dark';
}

const EnergyAwareCalendar: React.FC<EnergyAwareCalendarProps> = ({ 
  onEventUpdate, 
  onEnergyUpdate, 
  theme = 'light' 
}) => {
  const { addToast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Map<string, DayData>>(new Map());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEnergyInput, setShowEnergyInput] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({});
  const [energyInput, setEnergyInput] = useState({
    morning: 5,
    afternoon: 5,
    evening: 5
  });

  // Sample data initialization
  useEffect(() => {
    initializeSampleData();
  }, []);

  const initializeSampleData = () => {
    const sampleData = new Map<string, DayData>();
    const today = new Date();
    
    // Generate data for current month
    for (let i = -15; i <= 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateKey = formatDateKey(date);
      sampleData.set(dateKey, generateDayData(date));
    }
    
    setCalendarData(sampleData);
  };

  const generateDayData = (date: Date): DayData => {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Base energy levels with some randomness
    const baseEnergy = isWeekend ? 7 : 6;
    const variance = Math.random() * 2 - 1; // -1 to +1
    
    return {
      date,
      energyLevels: {
        morning: {
          value: Math.max(1, Math.min(10, Math.round(baseEnergy + variance + 1))),
          type: 'predicted',
          factors: ['sleep quality', 'weather'],
          confidence: 0.7
        },
        afternoon: {
          value: Math.max(1, Math.min(10, Math.round(baseEnergy + variance))),
          type: 'predicted',
          factors: ['morning energy', 'lunch', 'social interactions'],
          confidence: 0.6
        },
        evening: {
          value: Math.max(1, Math.min(10, Math.round(baseEnergy + variance - 1))),
          type: 'predicted',
          factors: ['day activities', 'social battery'],
          confidence: 0.5
        }
      },
      events: [],
      spoonBalance: Math.round(baseEnergy + variance + 2),
      weatherImpact: Math.round((Math.random() - 0.5) * 4), // -2 to +2
      sleepQuality: Math.round(6 + Math.random() * 3), // 6-9
      moodRating: Math.round(5 + Math.random() * 4) // 5-9
    };
  };

  const formatDateKey = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getEnergyColor = (energy: number): string => {
    if (energy <= 3) return 'text-red-500 bg-red-50';
    if (energy <= 6) return 'text-yellow-500 bg-yellow-50';
    return 'text-green-500 bg-green-50';
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
    switch (priority) {
      case 'critical': return <AlertCircle className="w-3 h-3 text-red-600" />;
      case 'high': return <Zap className="w-3 h-3 text-orange-600" />;
      case 'medium': return <Clock className="w-3 h-3 text-yellow-600" />;
      default: return <CheckCircle2 className="w-3 h-3 text-green-600" />;
    }
  };

  const getSpoonDisplay = (required: number, available: number): string => {
    const spoons = '🥄'.repeat(Math.min(required, available));
    const emptySpoons = '⚪'.repeat(Math.max(0, required - available));
    return spoons + emptySpoons;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dateKey = formatDateKey(date);
    if (!calendarData.has(dateKey)) {
      const dayData = generateDayData(date);
      setCalendarData(prev => new Map(prev).set(dateKey, dayData));
    }
  };

  const handleEnergyUpdate = (period: 'morning' | 'afternoon' | 'evening') => {
    const dateKey = formatDateKey(selectedDate);
    const currentData = calendarData.get(dateKey);
    
    if (currentData) {
      const updatedData = {
        ...currentData,
        energyLevels: {
          ...currentData.energyLevels,
          [period]: {
            ...currentData.energyLevels[period],
            value: energyInput[period],
            type: 'user-input' as const,
            confidence: 1
          }
        }
      };
      
      setCalendarData(prev => new Map(prev).set(dateKey, updatedData));
      onEnergyUpdate?.(selectedDate, { [period]: updatedData.energyLevels[period] });
      addToast(`Energy level updated for ${period}! 🌟`, 'success');
    }
  };

  const handleEventCreate = () => {
    if (!newEvent.title || !newEvent.startTime) {
      addToast('Please fill in required fields', 'error');
      return;
    }

    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title!,
      startTime: newEvent.startTime!,
      endTime: newEvent.endTime || new Date(newEvent.startTime!.getTime() + 60 * 60 * 1000),
      energyRequired: newEvent.energyRequired || 5,
      energyCost: 0,
      type: newEvent.type || 'personal',
      isFlexible: newEvent.isFlexible || false,
      canReschedule: newEvent.canReschedule !== false,
      priority: newEvent.priority || 'medium',
      rescheduledCount: 0
    };

    const dateKey = formatDateKey(event.startTime);
    const currentData = calendarData.get(dateKey) || generateDayData(event.startTime);
    
    const updatedData = {
      ...currentData,
      events: [...currentData.events, event]
    };

    setCalendarData(prev => new Map(prev).set(dateKey, updatedData));
    setNewEvent({});
    setShowEventModal(false);
    onEventUpdate?.(event);
    addToast('Event added to calendar! 📅', 'success');
  };

  const handleRescheduleEvent = (eventId: string) => {
    // Find and reschedule low-priority events to better energy days
    const allEvents = Array.from(calendarData.values()).flatMap(day => 
      day.events.map(event => ({ ...event, dayData: day }))
    );
    
    const eventToReschedule = allEvents.find(e => e.id === eventId);
    if (!eventToReschedule || !eventToReschedule.canReschedule) {
      addToast('This event cannot be rescheduled', 'error');
      return;
    }

    // Find better energy day within next 7 days
    const today = new Date();
    let bestDay: DayData | null = null;
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
          bestDay = dayData;
        }
      }
    }

    if (bestDay && bestScore > 0) {
      // Remove from current day
      const currentDateKey = formatDateKey(eventToReschedule.startTime);
      const currentData = calendarData.get(currentDateKey);
      if (currentData) {
        const updatedCurrentData = {
          ...currentData,
          events: currentData.events.filter(e => e.id !== eventId)
        };
        
        // Add to better day
        const newDate = bestDay.date;
        const rescheduledEvent = {
          ...eventToReschedule,
          startTime: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 
                             eventToReschedule.startTime.getHours(), eventToReschedule.startTime.getMinutes()),
          endTime: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 
                           eventToReschedule.endTime.getHours(), eventToReschedule.endTime.getMinutes()),
          rescheduledCount: (eventToReschedule.rescheduledCount || 0) + 1,
          originalDate: eventToReschedule.originalDate || eventToReschedule.startTime
        };

        const bestDayKey = formatDateKey(bestDay.date);
        const updatedBestDay = {
          ...bestDay,
          events: [...bestDay.events, rescheduledEvent]
        };

        setCalendarData(prev => {
          const newMap = new Map(prev);
          newMap.set(currentDateKey, updatedCurrentData);
          newMap.set(bestDayKey, updatedBestDay);
          return newMap;
        });

        addToast(`Event rescheduled to ${bestDay.date.toLocaleDateString()} for better energy match! ⚡`, 'success');
      }
    } else {
      addToast('No better energy days found in the next week', 'info');
    }
  };

  const renderCalendarGrid = (): React.ReactElement[] => {
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
        <motion.div
          key={dateKey}
          onClick={() => handleDateSelect(date)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative p-2 border cursor-pointer transition-all min-h-[80px]
            ${isSelected ? 'border-sage-500 bg-sage-50 shadow-md' : 'border-gray-200 hover:border-sage-300'}
            ${!isCurrentMonth ? 'opacity-50 bg-gray-50' : 'bg-white'}
            ${isToday ? 'ring-2 ring-blue-400' : ''}
          `}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {date.getDate()}
            </span>
            {dayData && (
              <div className={`text-xs px-1 rounded ${getEnergyColor(avgEnergy)}`}>
                <Battery className="w-3 h-3 inline" />
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
        </motion.div>
      );
    }

    return days;
  };

  const selectedDateData = calendarData.get(formatDateKey(selectedDate));

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Neural Weather Calendar
        </h1>
        <p className="text-gray-600">
          Schedule with your energy patterns, not against them ⚡
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card variant="glass" className="space-y-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 px-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 p-4">
              {renderCalendarGrid()}
            </div>
          </Card>
        </div>

        {/* Selected Day Details */}
        <div className="space-y-4">
          {/* Energy Levels */}
          <Card variant="glass" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                Energy Forecast
              </h3>
              <button
                onClick={() => setShowEnergyInput(!showEnergyInput)}
                className="text-sage-600 hover:text-sage-700 p-1"
                title="Update energy levels"
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
                      <span className="capitalize text-sm font-medium">{period}</span>
                      <div className={`px-2 py-1 rounded text-xs ${getEnergyColor(energy.value)}`}>
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
                    <div>Available spoons: {getSpoonDisplay(selectedDateData.spoonBalance, selectedDateData.spoonBalance)}</div>
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

            {showEnergyInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-3 border-t border-gray-200"
              >
                {(['morning', 'afternoon', 'evening'] as const).map((period) => (
                  <div key={period} className="flex items-center gap-3">
                    <label className="capitalize text-sm w-20">{period}:</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={energyInput[period]}
                      onChange={(e) => setEnergyInput(prev => ({
                        ...prev,
                        [period]: parseInt(e.target.value)
                      }))}
                      className="flex-1"
                      title={`${period} energy level`}
                      aria-label={`${period} energy level`}
                    />
                    <span className="text-sm w-8">{energyInput[period]}</span>
                    <button
                      onClick={() => handleEnergyUpdate(period)}
                      className="bg-sage-600 text-white px-2 py-1 rounded text-xs hover:bg-sage-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </Card>

          {/* Events for Selected Day */}
          <Card variant="glass" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                Events
              </h3>
              <button
                onClick={() => setShowEventModal(true)}
                className="bg-sage-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-sage-700 transition-colors flex items-center gap-1"
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
                          <div>Requires: {getSpoonDisplay(event.energyRequired, event.energyRequired)}</div>
                          {event.rescheduledCount && event.rescheduledCount > 0 && (
                            <div className="text-orange-600">Rescheduled {event.rescheduledCount}x</div>
                          )}
                        </div>
                      </div>
                      
                      {event.canReschedule && (
                        <button
                          onClick={() => handleRescheduleEvent(event.id)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="Reschedule to better energy day"
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
              </div>
            )}
          </Card>
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
            >
              <h3 className="text-xl font-semibold">Add Event</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    id="event-title"
                    type="text"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Team meeting"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
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
                    Energy Required (spoons)
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
                  <div className="text-sm text-gray-600 text-center">
                    {getSpoonDisplay(newEvent.energyRequired || 5, newEvent.energyRequired || 5)}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newEvent.isFlexible || false}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, isFlexible: e.target.checked }))}
                    />
                    <span className="text-sm">Flexible timing</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newEvent.canReschedule !== false}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, canReschedule: e.target.checked }))}
                    />
                    <span className="text-sm">Can reschedule</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEventCreate}
                  className="flex-1 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
