import React from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { Card } from '../ui/EnhancedCards';

const WaterTracker: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Water Tracker</h1>
        <p className="text-blue-600">Stay hydrated throughout your day</p>
      </motion.div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-center gap-4">
          <Droplet className="w-12 h-12 text-blue-500" />
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-800">0/8</p>
            <p className="text-blue-600">Glasses today</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add Glass
          </button>
        </div>
      </Card>

      <Card variant="glass" className="p-4 text-center">
        <p className="text-gray-600 text-sm">
          💧 Water tracking helps maintain optimal hydration for cognitive function and overall health.
        </p>
      </Card>
    </div>
  );
};

export default WaterTracker;