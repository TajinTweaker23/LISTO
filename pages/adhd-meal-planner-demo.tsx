import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedMealPlanner } from '../components/meal-planner/EnhancedMealPlanner';
import { FocusTimer, QuickActionButton, MotivationalBadge } from '../components/meal-planner/ADHDHelpers';
import { 
  Brain, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle, 
  Sparkles,
  Heart,
  Coffee,
  Utensils,
  Calendar
} from 'lucide-react';

export default function ADHDMealPlannerDemo() {
  const [showTimer, setShowTimer] = useState(false);
  const [achievements, setAchievements] = useState([
    { id: 1, achievement: "Meal Planner Pro", description: "Planned 7 meals this week!", color: "purple", isNew: true },
    { id: 2, achievement: "Quick Starter", description: "Added 5 recipes today", color: "green", isNew: false },
    { id: 3, achievement: "Focus Master", description: "Completed 3 focus sessions", color: "blue", isNew: false }
  ]);

  const handleTimerComplete = () => {
    setAchievements(prev => [...prev, {
      id: Date.now(),
      achievement: "Focus Champion",
      description: "Completed a focus session!",
      color: "yellow",
      isNew: true
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white/80 backdrop-blur-sm border-b"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-600" />
                ADHD-Friendly Meal Planner
              </h1>
              <p className="text-gray-600 mt-2">
                Designed for focus, motivation, and easy meal planning • Drag, drop, and automate your week
              </p>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex gap-4">
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-xs text-gray-600">Meals Planned</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-600">Recipes Saved</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-600">Focus Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar with ADHD Tools */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <QuickActionButton
                  icon={<Coffee className="w-4 h-4" />}
                  label="Add Breakfast"
                  onClick={() => console.log('Add breakfast')}
                  color="success"
                  size="sm"
                />
                
                <QuickActionButton
                  icon={<Utensils className="w-4 h-4" />}
                  label="Plan Dinner"
                  onClick={() => console.log('Plan dinner')}
                  color="primary"
                  size="sm"
                />
                
                <QuickActionButton
                  icon={<Sparkles className="w-4 h-4" />}
                  label="Auto-Fill Week"
                  onClick={() => console.log('Auto-fill')}
                  color="secondary"
                  size="sm"
                />
                
                <QuickActionButton
                  icon={<Calendar className="w-4 h-4" />}
                  label="Export Calendar"
                  onClick={() => console.log('Export')}
                  color="danger"
                  size="sm"
                />
              </div>
            </div>

            {/* Focus Timer */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Focus Timer
                </h2>
                <button
                  onClick={() => setShowTimer(!showTimer)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {showTimer ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showTimer && (
                <FocusTimer
                  duration={25}
                  onComplete={handleTimerComplete}
                  taskName="Meal Planning"
                />
              )}
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Achievements
              </h2>
              
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <MotivationalBadge
                    key={achievement.id}
                    achievement={achievement.achievement}
                    description={achievement.description}
                    color={achievement.color}
                    isNew={achievement.isNew}
                  />
                ))}
              </div>
            </div>

            {/* Daily Motivation */}
            <motion.div
              className="bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-xl shadow-lg p-6 text-center"
              animate={{ 
                background: [
                  "linear-gradient(to bottom right, #f472b6, #a855f7)",
                  "linear-gradient(to bottom right, #a855f7, #f472b6)",
                  "linear-gradient(to bottom right, #f472b6, #a855f7)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Daily Motivation</h3>
              <p className="text-sm opacity-90">
                "Every small step counts! You're building healthy habits one meal at a time. 🌟"
              </p>
            </motion.div>
          </motion.div>

          {/* Main Meal Planner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <EnhancedMealPlanner />
          </motion.div>
        </div>
      </div>

      {/* Floating Help Tips */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
            <div className="text-sm">
              <strong>💡 Tip:</strong> Drag recipes from the library to any day to schedule them. The AI can also auto-plan your entire week!
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Celebration */}
      <motion.div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.2, 1, 1.1, 1],
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{ 
          duration: 3,
          times: [0, 0.2, 0.4, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 10
        }}
      >
        <div className="bg-green-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle className="w-8 h-8" />
          <div>
            <div className="font-bold">Great job!</div>
            <div className="text-sm">You're staying focused and organized!</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
