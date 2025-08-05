import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  Brain, 
  Target, 
  Sparkles,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Heart,
  Zap,
  Award,
  Focus,
  Palette,
  Shield,
  Archive,
  Smartphone
} from 'lucide-react';

// Import all our feature components
import ResonanceCircles from './social/ResonanceCircles';
import DataIntegrationHub from './integrations/DataIntegrationHub';
import IntelligentBreakReminder from './productivity/IntelligentBreakReminder';
import ExecutiveFunctionSupport from './productivity/ExecutiveFunctionSupport';
import SensoryConsiderations from './accessibility/SensoryConsiderations';
import MemoryOrganizationSupport from './productivity/MemoryOrganizationSupport';
import EnhancedMobileOptimization from './mobile/EnhancedMobileOptimization';
import VisualImprovements from './visual/VisualImprovements';
import CollaborativeGoalTracking from './collaboration/CollaborativeGoalTracking';

interface UserProfile {
  id: string;
  energySignature: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  neurodivergentProfile: {
    conditions: string[];
    accommodations: string[];
    sensoryNeeds: string[];
  };
  onboardingCompleted: boolean;
  lastActiveDate: Date;
}

interface DashboardStats {
  wellnessScore: number;
  productivityStreak: number;
  communityConnections: number;
  todaysFocus: string;
  recentAchievements: string[];
  upcomingGoals: string[];
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  description: string;
  badge?: number;
  isNew?: boolean;
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
          <p className="text-sm text-gray-600">Keep it up! You're building great habits.</p>
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

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {dashboardStats.recentAchievements.map((achievement) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + dashboardStats.recentAchievements.indexOf(achievement) * 0.1 }}
                className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-gray-700">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Brain, label: 'Check Insights', action: () => setActiveView('insights'), color: 'blue' },
              { icon: Users, label: 'Find Resonance', action: () => setActiveView('resonance'), color: 'purple' },
              { icon: Heart, label: 'Take Break', action: () => setActiveView('wellness'), color: 'green' },
              { icon: Target, label: 'Review Goals', action: () => setActiveView('goals'), color: 'orange' }
            ].map(({ icon: Icon, label, action, color }) => (
              <motion.button
                key={label}
                onClick={action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 p-4 bg-${color}-50 text-${color}-700 rounded-lg hover:bg-${color}-100 transition-colors`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Feature Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore LISTO Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'resonance', label: 'Resonance Circles', icon: Users, description: 'Anonymous energy-based social connections', isNew: true },
            { id: 'insights', label: 'Insights Lab', icon: Brain, description: 'AI-powered life pattern analysis' },
            { id: 'wellness', label: 'Wellness Studio', icon: Heart, description: 'Intelligent breaks and sensory optimization' }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              onClick={() => setActiveView(item.id)}
              className="cursor-pointer p-4 bg-white rounded-lg hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />
                <span className="font-medium text-gray-800">{item.label}</span>
                {item.isNew && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">NEW</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ListoMainApp: React.FC = () => {
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

  // Navigation configuration
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'LISTO Hub',
      icon: Home,
      component: () => <DashboardComponent dashboardStats={dashboardStats} setActiveView={setActiveView} />,
      description: 'Your personalized wellness command center'
    },
    {
      id: 'resonance',
      label: 'Resonance Circles',
      icon: Users,
      component: ResonanceCircles,
      description: 'Anonymous energy-based social connections',
      badge: 2,
      isNew: true
    },
    {
      id: 'insights',
      label: 'Insights Lab',
      icon: Brain,
      component: DataIntegrationHub,
      description: 'AI-powered life pattern analysis'
    },
    {
      id: 'wellness',
      label: 'Wellness Studio',
      icon: Heart,
      component: IntelligentBreakReminder,
      description: 'Intelligent breaks and sensory optimization'
    },
    {
      id: 'productivity',
      label: 'Focus Flow',
      icon: Zap,
      component: ExecutiveFunctionSupport,
      description: 'Executive function and cognitive support'
    },
    {
      id: 'sensory',
      label: 'Sensory Space',
      icon: Focus,
      component: SensoryConsiderations,
      description: 'Environment and sensory accommodations'
    },
    {
      id: 'memory',
      label: 'Memory Palace',
      icon: Archive,
      component: MemoryOrganizationSupport,
      description: 'External memory and organization system'
    },
    {
      id: 'goals',
      label: 'Goal Galaxy',
      icon: Target,
      component: CollaborativeGoalTracking,
      description: 'Collaborative goal tracking and challenges'
    },
    {
      id: 'mobile',
      label: 'Mobile Hub',
      icon: Smartphone,
      component: EnhancedMobileOptimization,
      description: 'Voice, gesture, and haptic optimization'
    },
    {
      id: 'visual',
      label: 'Experience Studio',
      icon: Palette,
      component: VisualImprovements,
      description: 'Visual themes and micro-interactions'
    }
  ];

  useEffect(() => {
    loadUserProfile();
    loadDashboardStats();
    checkFirstTime();
  }, []);

  const loadUserProfile = () => {
    const saved = localStorage.getItem('listo-user-profile');
    if (saved) {
      const profile = JSON.parse(saved);
      profile.lastActiveDate = new Date(profile.lastActiveDate);
      // Profile loaded but not used in current state management
    } else {
      // First time user
      setShowWelcome(true);
    }
  };

  const loadDashboardStats = () => {
    // In a real app, this would fetch from various feature modules
    const stats = {
      wellnessScore: Math.floor(Math.random() * 40) + 60,
      productivityStreak: Math.floor(Math.random() * 10) + 1,
      communityConnections: Math.floor(Math.random() * 20) + 5,
      todaysFocus: 'Optimizing your daily flow',
      recentAchievements: [
        'Completed mindful break session',
        'Maintained focus for 90 minutes',
        'Connected with resonance match'
      ],
      upcomingGoals: [
        'Log evening mood check',
        'Review weekly insights',
        'Participate in community challenge'
      ]
    };
    setDashboardStats(stats);
  };

  const checkFirstTime = () => {
    const hasVisited = localStorage.getItem('listo-has-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('listo-has-visited', 'true');
    }
  };

  const ActiveComponent = navigationItems.find(item => item.id === activeView)?.component || DashboardComponent;

  const getCurrentTitle = () => {
    const currentItem = navigationItems.find(item => item.id === activeView);
    return currentItem ? currentItem.label : 'LISTO Hub';
  };

// Dashboard Component
const DashboardComponent: React.FC<{ dashboardStats: DashboardStats; setActiveView: (view: string) => void }> = ({ dashboardStats, setActiveView }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
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
                  <p className="text-xs text-gray-500 hidden sm:block">Life Intelligence & Support</p>
                </div>
              </div>
            </div>

            {/* Current Page Title */}
            <div className="hidden md:block">
              <h2 className="text-lg font-medium text-gray-700">{getCurrentTitle()}</h2>
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

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed lg:relative lg:translate-x-0 w-80 h-screen bg-white shadow-lg z-30 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <span className="text-lg font-semibold">Navigation</span>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setSidebarOpen(false);
                      }}
                      whileHover={{ x: 5 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all group ${
                        activeView === item.id
                          ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.isNew && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              NEW
                            </span>
                          )}
                          {item.badge && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </nav>

                {/* User Energy Status */}
                <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Energy Resonance</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Harmonious wavelength</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {React.createElement(getCurrentComponent())}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to LISTO!</h2>
                <p className="text-gray-600">
                  Your neurodivergent-friendly wellness ecosystem. Let's start your journey to optimized living.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-700">Privacy-first anonymous social connections</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Brain className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700">AI-powered insights that understand you</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-purple-700">Comprehensive neurodivergent support</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Get Started
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

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
    </div>
  );
};

export default ListoMainApp;
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeView === 'dashboard' ? (
                  <DashboardComponent dashboardStats={dashboardStats} setActiveView={setActiveView} />
                ) : (
                  <ActiveComponent />
                )}
              </motion.div>
            </AnimatePresence>
