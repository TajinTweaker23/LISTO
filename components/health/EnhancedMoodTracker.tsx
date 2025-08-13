import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart } from 'lucide-react';
import { Card } from '../ui/EnhancedCards';

const EnhancedMoodTracker: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Enhanced Mood Tracker</h1>
        <p className="text-purple-600">Advanced mood tracking with environmental correlations</p>
      </motion.div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Brain className="w-12 h-12 text-purple-500" />
          <Heart className="w-12 h-12 text-pink-500" />
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">How are you feeling today?</p>
          <div className="grid grid-cols-5 gap-2">
            {[
              { emoji: '😢', value: 1 }, 
              { emoji: '😕', value: 2 }, 
              { emoji: '😐', value: 3 }, 
              { emoji: '😊', value: 4 }, 
              { emoji: '😄', value: 5 }
            ].map(({ emoji, value }) => (
              <button
                key={value}
                className="text-2xl p-3 rounded-lg hover:bg-purple-100 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card variant="glass" className="p-4 text-center">
        <p className="text-gray-600 text-sm">
          🧠 Enhanced mood tracking correlates emotions with sleep, weather, and other factors.
        </p>
      </Card>
    </div>
  );
};

export default EnhancedMoodTracker;