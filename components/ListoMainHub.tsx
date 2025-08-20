import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Brain, 
  Target, 
  Sparkles,
  Settings,
  Bell,
  Search,
  Menu,
  Heart,
  Zap,
  Focus,
  Palette,
  Shield,
  Archive,
  Smartphone
} from 'lucide-react';

interface DashboardStats {
  wellnessScore: number;
  productivityStreak: number;
  communityConnections: number;
  todaysFocus: string;
  recentAchievements: string[];
  upcomingGoals: string[];
}

// Dashboard Component
const DashboardComponent: React.FC<{ dashboardStats: DashboardStats; setActiveView: (view: string) => void }> = ({ dashboardStats, setActiveView }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold">Welcome to LISTO</h1>
            <p className="text-xl opacity-90">Life Intelligence & Support Through Optimization</p>
          </div>
        </div>
        <p className="text-lg opacity-80">
          Your personalized neurodivergent-friendly wellness ecosystem. 
          Today's focus: <strong>{dashboardStats.todaysFocus}</strong>
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Wellness Score</h3>
              <p className="text-2xl font-bold text-green-600">{dashboardStats.wellnessScore}/100</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${dashboardStats.wellnessScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Focus Streak</h3>
              <p className="text-2xl font-bold text-blue-600">{dashboardStats.productivityStreak} days</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Consistent daily progress.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Resonance Network</h3>
              <p className="text-2xl font-bold text-purple-600">{dashboardStats.communityConnections}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Anonymous connections sharing your energy</p>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-6">LISTO Feature Ecosystem</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'resonance', label: 'Resonance Circles', icon: Users, description: 'Anonymous energy-based connections', color: 'purple', isNew: true },
            { id: 'insights', label: 'Insights Lab', icon: Brain, description: 'AI-powered pattern analysis', color: 'blue' },
            { id: 'wellness', label: 'Wellness Studio', icon: Heart, description: 'Intelligent breaks & optimization', color: 'green' },
            { id: 'productivity', label: 'Focus Flow', icon: Zap, description: 'Executive function support', color: 'orange' },
            { id: 'sensory', label: 'Sensory Space', icon: Focus, description: 'Environment accommodations', color: 'indigo' },
            { id: 'memory', label: 'Memory Palace', icon: Archive, description: 'External memory system', color: 'cyan' },
            { id: 'goals', label: 'Goal Galaxy', icon: Target, description: 'Collaborative tracking', color: 'pink' },
            { id: 'mobile', label: 'Mobile Hub', icon: Smartphone, description: 'Voice, gesture & haptic', color: 'teal' },
            { id: 'visual', label: 'Experience Studio', icon: Palette, description: 'Themes & micro-interactions', color: 'violet' }
          ].map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              onClick={() => setActiveView(feature.id)}
              className={`cursor-pointer p-4 bg-${feature.color}-50 border border-${feature.color}-100 rounded-lg hover:shadow-md hover:bg-${feature.color}-100 transition-all group`}
            >
              <div className="flex items-center gap-3 mb-2">
                <feature.icon className={`w-5 h-5 text-${feature.color}-600 group-hover:text-${feature.color}-700`} />
                <span className="font-medium text-gray-800">{feature.label}</span>
                {feature.isNew && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">NEW</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Brand Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">LISTO: Where Innovation Meets Accessibility</h2>
        <p className="text-lg opacity-90 mb-6">
          The world's first neurodivergent-friendly wellness ecosystem combining anonymous social connections, 
          AI-powered insights, and comprehensive accessibility features.
        </p>
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">🧠</div>
            <div className="text-sm">AI-Powered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">🔗</div>
            <div className="text-sm">Anonymous Social</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">♿</div>
            <div className="text-sm">Accessibility First</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">🎯</div>
            <div className="text-sm">Neurodivergent Focus</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ListoMainHub: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    wellnessScore: 78,
    productivityStreak: 5,
    communityConnections: 12,
    todaysFocus: 'Morning Routine Optimization',
    recentAchievements: ['7-day meditation streak', 'Perfect focus session', 'New resonance connection'],
    upcomingGoals: ['Complete health check-in', 'Join community challenge', 'Review weekly patterns']
  });
  const [notifications] = useState(3);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Load user data and check for first time user
    const hasVisited = localStorage.getItem('listo-has-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('listo-has-visited', 'true');
    }
    
    // Load dashboard stats
    const savedStats = localStorage.getItem('listo-dashboard-stats');
    if (savedStats) {
      setDashboardStats(JSON.parse(savedStats));
    }
  }, []);

  const handleFeatureNavigation = (featureId: string) => {
    setActiveView(featureId);
    setSidebarOpen(false);
    
    // In a real app, this would route to the actual feature components
    console.log(`Navigating to feature: ${featureId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                title="Toggle navigation menu"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">LISTO</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Life Intelligence & Support Through Optimization</p>
                </div>
              </div>
            </div>

            {/* Center Title */}
            <div className="hidden md:block">
              <h2 className="text-lg font-medium text-gray-700">LISTO Hub</h2>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 relative"
                title="View notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button 
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Search"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Settings"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DashboardComponent dashboardStats={dashboardStats} setActiveView={handleFeatureNavigation} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to LISTO</h2>
                <p className="text-gray-600">
                  Your neurodivergent-friendly wellness ecosystem. Experience the future of accessible, AI-powered personal optimization.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-700">Revolutionary anonymous social networking</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Brain className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700">AI insights that adapt to your unique needs</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-purple-700">Comprehensive neurodivergent accommodations</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Explore LISTO
                </button>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListoMainHub;
