import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Target, Heart, Brain } from 'lucide-react';
import EnergyMeter from './EnergyMeter';
import MoodTracker from './MoodTracker';
import FocusMode from './FocusMode';

interface WellnessDashboardProps {
  className?: string;
}

interface WellnessData {
  energyLevel: number;
  mood: any;
  focusModeEnabled: boolean;
  dailyGoals: {
    completed: number;
    total: number;
  };
  streakDays: number;
}

export const WellnessDashboard: React.FC<WellnessDashboardProps> = ({ 
  className = '' 
}) => {
  const [wellnessData, setWellnessData] = useState<WellnessData>({
    energyLevel: 75,
    mood: null,
    focusModeEnabled: false,
    dailyGoals: { completed: 3, total: 5 },
    streakDays: 7,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const updateEnergyLevel = (level: number) => {
    setWellnessData(prev => ({ ...prev, energyLevel: level }));
  };

  const updateMood = (mood: any) => {
    setWellnessData(prev => ({ ...prev, mood }));
  };

  const updateFocusMode = (enabled: boolean) => {
    setWellnessData(prev => ({ ...prev, focusModeEnabled: enabled }));
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getWellnessScore = () => {
    const energyScore = wellnessData.energyLevel;
    const moodScore = wellnessData.mood?.intensity || 50;
    const goalScore = (wellnessData.dailyGoals.completed / wellnessData.dailyGoals.total) * 100;
    return Math.round((energyScore + moodScore + goalScore) / 3);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getGreeting()}, friend
        </h1>
        <p className="text-gray-600">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>

      {/* Wellness Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Wellness Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-primary p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-to-r from-primary-100 to-purple-100 rounded-xl">
              <Heart className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {getWellnessScore()}%
              </div>
              <div className="text-xs text-gray-500">Wellness Score</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Overall wellness based on energy, mood, and goals
          </div>
        </motion.div>

        {/* Daily Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-primary p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {wellnessData.dailyGoals.completed}/{wellnessData.dailyGoals.total}
              </div>
              <div className="text-xs text-gray-500">Daily Goals</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
              style={{ width: `${(wellnessData.dailyGoals.completed / wellnessData.dailyGoals.total) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Streak Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-primary p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">
                {wellnessData.streakDays}
              </div>
              <div className="text-xs text-gray-500">Day Streak</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Keep the momentum going
          </div>
        </motion.div>

        {/* Focus Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-primary p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl">
                {wellnessData.focusModeEnabled ? '🧘‍♀️' : '💭'}
              </div>
              <div className="text-xs text-gray-500">Focus Mode</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {wellnessData.focusModeEnabled ? 'Active' : 'Available'}
          </div>
        </motion.div>
      </div>

      {/* Main Wellness Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy & Mood Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card-primary p-6 space-y-6"
        >
          <EnergyMeter 
            level={wellnessData.energyLevel}
            onChange={updateEnergyLevel}
            showDetails={true}
          />
          <div className="border-t border-gray-200/60 pt-6">
            <MoodTracker 
              onMoodSelect={updateMood}
              selectedMood={wellnessData.mood}
            />
          </div>
        </motion.div>

        {/* Focus & Accessibility Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <FocusMode onToggle={updateFocusMode} />
          
          {/* Quick Actions */}
          <div className="card-primary p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-primary flex items-center justify-center gap-2 py-3">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Schedule</span>
              </button>
              <button className="btn-gentle flex items-center justify-center gap-2 py-3">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Wellness</span>
              </button>
              <button className="btn-gentle flex items-center justify-center gap-2 py-3">
                <Target className="w-4 h-4" />
                <span className="text-sm">Goals</span>
              </button>
              <button className="btn-gentle flex items-center justify-center gap-2 py-3">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Insights</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wellness Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card-primary p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Today's Wellness Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-sm font-medium text-gray-700">Energy Peak</div>
            <div className="text-xs text-gray-500">Usually around 10 AM</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium text-gray-700">Goal Progress</div>
            <div className="text-xs text-gray-500">60% complete today</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
            <div className="text-2xl mb-2">🧘</div>
            <div className="text-sm font-medium text-gray-700">Mindful Moments</div>
            <div className="text-xs text-gray-500">3 focus sessions</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WellnessDashboard;
