'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Target, Clock, Focus, CheckSquare, Brain, Play, Pause } from 'lucide-react';

const OPTIMIZER_FEATURES = [
  {
    id: 'tasks',
    title: 'Smart Tasks',
    description: 'AI-powered task prioritization and management',
    icon: CheckSquare,
    color: 'from-blue-500 to-cyan-500',
    comingSoon: true
  },
  {
    id: 'focus',
    title: 'Focus Sessions',
    description: 'Pomodoro technique with neurodivergent-friendly adaptations',
    icon: Focus,
    color: 'from-green-500 to-emerald-500',
    comingSoon: false
  },
  {
    id: 'timeblock',
    title: 'Time Blocking',
    description: 'Visual calendar management with energy-based scheduling',
    icon: Clock,
    color: 'from-purple-500 to-pink-500',
    comingSoon: true
  },
  {
    id: 'brain',
    title: 'Brain Dump',
    description: 'Capture thoughts and ideas without overwhelming your mind',
    icon: Brain,
    color: 'from-orange-500 to-red-500',
    comingSoon: true
  }
];

export default function LifeOptimizer() {
  const [activeFeature, setActiveFeature] = useState('focus');
  const [focusTime, setFocusTime] = useState(25);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const router = useRouter();

  const startFocusSession = () => {
    setIsTimerActive(true);
    // This would integrate with the existing useFocusTimer hook
    alert(`Starting ${focusTime} minute focus session!`);
  };

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'focus':
        return (
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Focus Session</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Timer Settings */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                <h4 className="text-lg font-semibold text-white mb-4">Session Settings</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Focus Duration (minutes)</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="15"
                        max="60"
                        step="5"
                        value={focusTime}
                        onChange={(e) => setFocusTime(parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-white font-semibold w-12 text-center">{focusTime}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={startFocusSession}
                    variant="default"
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                    leftIcon={<Play className="w-5 h-5" />}
                  >
                    {isTimerActive ? 'Session Active' : 'Start Focus Session'}
                  </Button>
                </div>
              </div>

              {/* Focus Tips */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                <h4 className="text-lg font-semibold text-white mb-4">Neurodivergent-Friendly Tips</h4>
                <ul className="space-y-3 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    Choose background sounds that help you focus
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    Adjust lighting to reduce sensory overwhelm
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    Use fidget tools if they help you concentrate
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                    Take breaks when you need them, not just when scheduled
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
            <p className="text-white/70">
              This feature is currently in development. Check back soon!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
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
            <Target className="w-8 h-8 text-blue-400" />
            Life Optimizer
          </h1>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {OPTIMIZER_FEATURES.map((feature) => (
            <Button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              variant={activeFeature === feature.id ? "default" : "ghost"}
              className={`p-4 text-left relative overflow-hidden h-auto ${
                activeFeature === feature.id
                  ? 'bg-white text-gray-900 shadow-lg hover:bg-gray-50'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {feature.comingSoon && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-xs text-black rounded-full font-semibold">
                  Soon
                </div>
              )}
              
              <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center bg-gradient-to-r ${feature.color}`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className={`text-sm ${activeFeature === feature.id ? 'text-gray-600' : 'text-white/70'}`}>
                {feature.description}
              </p>
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
        >
          {renderFeatureContent()}
        </motion.div>
      </div>
    </div>
  );
}
