'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Users, Target, Timer, Award } from 'lucide-react';

interface GrowthCircle {
  id: string;
  name: string;
  focus: 'anxiety' | 'adhd' | 'autism' | 'depression' | 'general';
  members: number;
  activities: Activity[];
  safetyLevel: 'beginner' | 'intermediate' | 'advanced';
  sensoryFriendly: boolean;
}

interface Activity {
  id: string;
  type: 'mindfulness' | 'focus-session' | 'social-check-in' | 'achievement-share' | 'break-reminder';
  title: string;
  duration: number;
  participants: string[];
  isActive: boolean;
}

export const GrowthCirclesHub: React.FC = () => {
  const [userPreferences, setUserPreferences] = useState({
    sensoryFriendly: true,
    maxNotifications: 3,
    preferredBreakInterval: 25, // minutes
    focusMode: false
  });

  const [activeBreakTimer, setActiveBreakTimer] = useState<number>(0);

  // Healthy break reminder system
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBreakTimer(prev => {
        if (prev >= userPreferences.preferredBreakInterval * 60) {
          triggerHealthyBreakReminder();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [userPreferences.preferredBreakInterval]);

  const triggerHealthyBreakReminder = () => {
    // Gentle, non-intrusive break reminder
    const breakSuggestions = [
      "🌱 Time to stretch! Your body will thank you.",
      "💧 Hydration check! Grab some water.",
      "👁️ Look away from the screen - find something 20 feet away.",
      "🫁 Take 3 deep breaths. You're doing great.",
      "🐾 Pet break! Find a furry friend or watch animal videos."
    ];
    
    const randomSuggestion = breakSuggestions[Math.floor(Math.random() * breakSuggestions.length)];
    
    // Non-aggressive notification
    if (userPreferences.focusMode) {
      // Subtle visual indicator only
      return;
    }
    
    // Show gentle suggestion
    console.log('Break Reminder:', randomSuggestion);
  };

  const growthCircles: GrowthCircle[] = [
    {
      id: '1',
      name: 'ADHD Focus Friends',
      focus: 'adhd',
      members: 847,
      safetyLevel: 'beginner',
      sensoryFriendly: true,
      activities: [
        {
          id: '1',
          type: 'focus-session',
          title: 'Pomodoro Together',
          duration: 25,
          participants: ['user1', 'user2', 'user3'],
          isActive: true
        },
        {
          id: '2',
          type: 'achievement-share',
          title: 'Small Wins Wednesday',
          duration: 0,
          participants: ['user4', 'user5'],
          isActive: false
        }
      ]
    },
    {
      id: '2', 
      name: 'Anxiety Support Network',
      focus: 'anxiety',
      members: 1243,
      safetyLevel: 'intermediate',
      sensoryFriendly: true,
      activities: [
        {
          id: '3',
          type: 'mindfulness',
          title: 'Guided Breathing Circle',
          duration: 10,
          participants: ['user6', 'user7'],
          isActive: true
        }
      ]
    },
    {
      id: '3',
      name: 'Autism Connection Space',
      focus: 'autism',
      members: 623,
      safetyLevel: 'beginner',
      sensoryFriendly: true,
      activities: [
        {
          id: '4',
          type: 'social-check-in',
          title: 'Daily Sensory Check',
          duration: 5,
          participants: ['user8'],
          isActive: false
        }
      ]
    }
  ];

  const getCircleIcon = (focus: GrowthCircle['focus']) => {
    switch (focus) {
      case 'adhd': return Brain;
      case 'anxiety': return Heart;
      case 'autism': return Users;
      case 'depression': return Target;
      default: return Users;
    }
  };

  const getCircleGradient = (focus: GrowthCircle['focus']) => {
    switch (focus) {
      case 'adhd': return 'from-blue-500 to-indigo-600';
      case 'anxiety': return 'from-green-500 to-emerald-600';
      case 'autism': return 'from-purple-500 to-violet-600';
      case 'depression': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {/* Header with break timer */}
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Growth Circles
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Safe, supportive communities designed for neurodivergent minds. Connect, grow, and thrive at your own pace.
        </p>
        
        {/* Break timer indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-500">
            Next break in: {Math.floor((userPreferences.preferredBreakInterval * 60 - activeBreakTimer) / 60)}:
            {String((userPreferences.preferredBreakInterval * 60 - activeBreakTimer) % 60).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Growth Circles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence>
          {growthCircles.map((circle, index) => {
            const IconComponent = getCircleIcon(circle.focus);
            return (
              <motion.div
                key={circle.id}
                className={`
                  relative overflow-hidden rounded-3xl p-6 cursor-pointer
                  bg-gradient-to-br ${getCircleGradient(circle.focus)}
                  hover:shadow-2xl transition-all duration-300
                  ${circle.sensoryFriendly ? 'ring-2 ring-green-200' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => console.log('Opening circle:', circle.name)}
              >
                {/* Sensory-friendly indicator */}
                {circle.sensoryFriendly && (
                  <div className="absolute top-3 right-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                )}

                <div className="flex items-start justify-between text-white mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{circle.name}</h3>
                      <p className="text-white/80 text-sm">{circle.members} members</p>
                    </div>
                  </div>
                </div>

                {/* Active activities */}
                <div className="space-y-2">
                  {circle.activities.filter(a => a.isActive).map(activity => (
                    <div key={activity.id} className="flex items-center space-x-2 text-white/90 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>{activity.title}</span>
                      <span className="text-white/60">• {activity.participants.length} active</span>
                    </div>
                  ))}
                </div>

                {/* Safety level badge */}
                <div className="mt-4 inline-flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1 text-xs text-white">
                  <Award className="w-3 h-3" />
                  <span className="capitalize">{circle.safetyLevel} friendly</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Preferences Panel */}
      <motion.div
        className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-500" />
          Your Preferences
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Sensory-Friendly Mode</span>
            <input
              type="checkbox"
              checked={userPreferences.sensoryFriendly}
              onChange={(e) => setUserPreferences(prev => ({
                ...prev,
                sensoryFriendly: e.target.checked
              }))}
              className="rounded"
            />
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Focus Mode</span>
            <input
              type="checkbox"
              checked={userPreferences.focusMode}
              onChange={(e) => setUserPreferences(prev => ({
                ...prev,
                focusMode: e.target.checked
              }))}
              className="rounded"
            />
          </label>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Break Interval: {userPreferences.preferredBreakInterval}min
            </label>
            <input
              type="range"
              min="15"
              max="60"
              value={userPreferences.preferredBreakInterval}
              onChange={(e) => setUserPreferences(prev => ({
                ...prev,
                preferredBreakInterval: Number(e.target.value)
              }))}
              className="w-full"
              aria-label="Break interval in minutes"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GrowthCirclesHub;
