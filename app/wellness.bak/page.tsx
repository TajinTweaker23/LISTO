'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Heart, Calendar, Brain, Droplets } from 'lucide-react';
import CycleTracker from '../../components/health/CycleTracker';
import EnhancedMoodTracker from '../../components/health/EnhancedMoodTracker';
import WaterTracker from '../../components/health/WaterTracker';

const WELLNESS_TABS = [
  {
    id: 'mood',
    label: 'Mood Tracking',
    icon: Brain,
    description: 'Track your emotional wellbeing and identify patterns'
  },
  {
    id: 'cycle',
    label: 'Cycle Monitoring',
    icon: Calendar,
    description: 'Monitor your menstrual cycle and reproductive health'
  },
  {
    id: 'water',
    label: 'Hydration',
    icon: Droplets,
    description: 'Stay hydrated and track your daily water intake'
  }
];

export default function WellnessTracker() {
  const [activeTab, setActiveTab] = useState('mood');
  const router = useRouter();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mood':
        return <EnhancedMoodTracker />;
      case 'cycle':
        return <CycleTracker />;
      case 'water':
        return <WaterTracker />;
      default:
        return <EnhancedMoodTracker />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-purple-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => router.push('/')}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-400" />
            Wellness Tracker
          </h1>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {WELLNESS_TABS.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-pink-900 shadow-lg hover:bg-gray-50'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                leftIcon={<tab.icon className="w-5 h-5" />}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          
          {/* Tab Description */}
          <div className="mb-6">
            {WELLNESS_TABS.map((tab) => (
              activeTab === tab.id && (
                <motion.p
                  key={tab.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/70"
                >
                  {tab.description}
                </motion.p>
              )
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}
