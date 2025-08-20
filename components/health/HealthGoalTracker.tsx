import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy } from 'lucide-react';
import { Card } from '../ui/EnhancedCards';

const HealthGoalTracker: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-orange-800 mb-2">Health Goal Tracker</h1>
        <p className="text-orange-600">Set and achieve your wellness objectives</p>
      </motion.div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Target className="w-12 h-12 text-orange-500" />
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">Track your health goals</p>
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800">Daily Water Intake</h3>
              <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                <div className="bg-orange-600 h-2 rounded-full w-3/5"></div>
              </div>
              <p className="text-sm text-orange-600 mt-1">6/8 glasses</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Exercise Minutes</h3>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full w-2/5"></div>
              </div>
              <p className="text-sm text-green-600 mt-1">20/30 minutes</p>
            </div>
          </div>
        </div>
      </Card>

      <Card variant="glass" className="p-4 text-center">
        <p className="text-gray-600 text-sm">
          🎯 Set realistic, achievable health goals and track your progress over time.
        </p>
      </Card>
    </div>
  );
};

export default HealthGoalTracker;