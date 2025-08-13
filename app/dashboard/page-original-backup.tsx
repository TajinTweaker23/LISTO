'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { 
  Clock, 
  Save, 
  Cloud, 
  ExternalLink, 
  Stethoscope,
  Brain,
  Target,
  Calendar,
  Heart,
  Sparkles,
  BookOpen,
  Settings,
  BarChart3,
  MapPin,
  Camera,
  Music,
  Palette,
  Plus
} from "lucide-react";

// Feature cards data with visual appeal
const featureCards = [
  {
    id: 'medical-hub',
    title: 'Medical Hub',
    description: 'Health tracking, disease prevention, and medical insights',
    icon: Stethoscope,
    href: '/medical-hub',
    color: 'from-emerald-500 to-teal-600',
    bgImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
    features: ['Brain Rot Learning', 'Disease Prevention', 'MA Assistant'],
    progress: 65,
    lastUsed: '2 days ago'
  },
  {
    id: 'wellness-tracker',
    title: 'Wellness Tracker',
    description: 'Mood tracking, cycle monitoring, and health correlations',
    icon: Heart,
    href: '/wellness',
    color: 'from-pink-500 to-rose-600',
    bgImage: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(225, 29, 72, 0.1) 100%)',
    features: ['Mood Tracking', 'Cycle Monitoring', 'Health Insights'],
    progress: 45,
    lastUsed: '1 day ago'
  },
  {
    id: 'productivity',
    title: 'Life Optimizer',
    description: 'Smart task management and neurodivergent-friendly tools',
    icon: Target,
    href: '/productivity',
    color: 'from-blue-500 to-indigo-600',
    bgImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
    features: ['Smart Tasks', 'Focus Sessions', 'Time Blocking'],
    progress: 80,
    lastUsed: '3 hours ago'
  },
  {
    id: 'moodboard',
    title: 'Vision Board',
    description: 'Create inspiring moodboards and track your aspirations',
    icon: Sparkles,
    href: '/moodboard',
    color: 'from-purple-500 to-violet-600',
    bgImage: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    features: ['Visual Goals', 'Mood Boards', 'Inspiration'],
    progress: 30,
    lastUsed: '5 days ago'
  },
  {
    id: 'calendar',
    title: 'Smart Calendar',
    description: 'AI-powered scheduling with health-aware planning',
    icon: Calendar,
    href: '/calendar',
    color: 'from-orange-500 to-red-600',
    bgImage: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
    features: ['Smart Scheduling', 'Health Integration', 'Event Planning'],
    progress: 55,
    lastUsed: '12 hours ago'
  },
  {
    id: 'analytics',
    title: 'Life Analytics',
    description: 'Deep insights into your health, productivity, and habits',
    icon: BarChart3,
    href: '/analytics',
    color: 'from-cyan-500 to-blue-600',
    bgImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
    features: ['Data Insights', 'Trend Analysis', 'Correlations'],
    progress: 40,
    lastUsed: '1 week ago'
  }
];

const quickActions = [
  { icon: Plus, label: 'Add Entry', action: 'create' },
  { icon: Camera, label: 'Photo Journal', action: 'photo' },
  { icon: Music, label: 'Mood Playlist', action: 'music' },
  { icon: BookOpen, label: 'Quick Learn', action: 'learn' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Load last visit
    const lastVisitStored = localStorage.getItem('lastVisit');
    setLastVisit(lastVisitStored);
    localStorage.setItem('lastVisit', new Date().toISOString());

    // Load recent activity from localStorage
    const activities = [];
    const healthData = localStorage.getItem(`health-cycles-${user.uid}`);
    const achievements = localStorage.getItem('achievements');
    const diseaseProgress = localStorage.getItem('diseasePreventionProgress');
    
    if (healthData) {
      activities.push({
        id: 'health-1',
        title: 'Health data updated',
        type: 'Health',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        icon: Heart
      });
    }
    
    if (achievements) {
      const parsed = JSON.parse(achievements);
      const unlocked = parsed.filter((a: any) => a.unlocked);
      if (unlocked.length > 0) {
        activities.push({
          id: 'achievement-1',
          title: `${unlocked.length} achievements unlocked`,
          type: 'Achievement',
          timestamp: new Date(Date.now() - 172800000), // 2 days ago
          icon: Sparkles
        });
      }
    }
    
    if (diseaseProgress) {
      activities.push({
        id: 'prevention-1',
        title: 'Prevention strategy completed',
        type: 'Medical',
        timestamp: new Date(Date.now() - 259200000), // 3 days ago
        icon: Stethoscope
      });
    }

    setRecentActivity(activities);
  }, [user]);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  const getWelcomeMessage = () => {
    if (!lastVisit) return "Welcome to LISTO! 🎉";
    
    const lastVisitDate = new Date(lastVisit);
    const now = new Date();
    const timeDiff = now.getTime() - lastVisitDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff === 0) return "Welcome back! 👋";
    if (daysDiff === 1) return "Good to see you again! ✨";
    if (daysDiff <= 7) return `Welcome back after ${daysDiff} days! 🌟`;
    return `Long time no see! It's been ${daysDiff} days 🎊`;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to continue</h2>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10" />
        <div className="relative z-10 pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {getWelcomeMessage()}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {lastVisit 
                  ? "Pick up where you left off or explore something new"
                  : "Your comprehensive wellness and productivity ecosystem awaits"
                }
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Quick Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                {showQuickActions ? 'Less' : 'More'}
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.icon className="w-6 h-6 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative"
            >
              <div
                className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full"
                onClick={() => handleCardClick(card.id)}
                style={{ background: card.bgImage }}
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Last used</div>
                      <div className="text-sm font-medium text-gray-700">{card.lastUsed}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">Progress</span>
                      <span className="text-xs font-bold text-gray-700">{card.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${card.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${card.progress}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-white/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = card.href;
                    }}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r ${card.color} text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    Continue Journey
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <item.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{item.title}</div>
                      <div className="text-sm text-gray-600">
                        {item.type} • {item.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    <Save className="w-4 h-4 text-gray-400" />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Save className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity yet</p>
                  <p className="text-sm">Start exploring to see your progress here!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600 mb-1">7</div>
                <div className="text-sm text-gray-600">Active Goals</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">23</div>
                <div className="text-sm text-gray-600">Days Streak</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
                <div className="text-sm text-gray-600">Health Score</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                <div className="text-2xl font-bold text-pink-600 mb-1">12</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-800">Today's Focus</span>
              </div>
              <p className="text-sm text-gray-600">
                Complete your morning wellness check-in and review your prevention strategies
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl p-4 hover:shadow-3xl transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        onClick={() => setShowQuickActions(!showQuickActions)}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
