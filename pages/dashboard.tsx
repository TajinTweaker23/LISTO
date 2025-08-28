// pages/dashboard.tsx
import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  Unsubscribe,
  DocumentData,
  QuerySnapshot
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Save, 
  Cloud, 
  ExternalLink, 
  TrendingUp,
  Zap,
  Brain,
  Target,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react";
import EnhancedAppLayout from "../components/layout/EnhancedAppLayout";

// Types
interface CloudProvider {
  name: string;
  icon: string;
  url: string;
  description: string;
  mainstream: boolean;
  security?: 'standard' | 'enhanced' | 'military';
  freeStorage: string;
}

interface ActivityItem {
  id: string;
  type: 'Moodboard' | 'Goal' | 'Event' | 'Vision Item';
  title?: string;
  text?: string;
  caption?: string;
  timestamp: Date;
  status?: 'completed' | 'in-progress' | 'pending';
  priority?: 'low' | 'medium' | 'high';
}

interface DashboardStats {
  totalItems: number;
  completedGoals: number;
  recentActivity: number;
  streak: number;
}

// Enhanced cloud storage providers with security ratings
const cloudStorageProviders: CloudProvider[] = [
  {
    name: "Google Drive",
    icon: "🔷",
    url: "https://drive.google.com",
    description: "15GB free • AI-powered search",
    mainstream: true,
    security: 'standard',
    freeStorage: '15GB'
  },
  {
    name: "Dropbox", 
    icon: "📦",
    url: "https://dropbox.com",
    description: "2GB free • Smart sync",
    mainstream: true,
    security: 'standard',
    freeStorage: '2GB'
  },
  {
    name: "OneDrive",
    icon: "☁️", 
    url: "https://onedrive.live.com",
    description: "5GB free • Office integration",
    mainstream: true,
    security: 'standard',
    freeStorage: '5GB'
  },
  {
    name: "iCloud",
    icon: "🍎",
    url: "https://icloud.com",
    description: "5GB free • Apple ecosystem",
    mainstream: true,
    security: 'enhanced',
    freeStorage: '5GB'
  },
  {
    name: "pCloud",
    icon: "🌤️",
    url: "https://pcloud.com",
    description: "10GB free • Lifetime plans available",
    mainstream: false,
    security: 'enhanced',
    freeStorage: '10GB'
  },
  {
    name: "Mega",
    icon: "🔒",
    url: "https://mega.nz",
    description: "20GB free • End-to-end encryption",
    mainstream: false,
    security: 'enhanced',
    freeStorage: '20GB'
  },
  {
    name: "Sync.com",
    icon: "🔐",
    url: "https://sync.com", 
    description: "5GB free • Zero-knowledge encryption",
    mainstream: false,
    security: 'enhanced',
    freeStorage: '5GB'
  },
  {
    name: "SpiderOak",
    icon: "🕷️",
    url: "https://spideroak.com",
    description: "2GB free • No-knowledge architecture",
    mainstream: false,
    security: 'military',
    freeStorage: '2GB'
  },
  {
    name: "Tresorit",
    icon: "🏰",
    url: "https://tresorit.com",
    description: "3GB free • Swiss privacy laws",
    mainstream: false,
    security: 'military',
    freeStorage: '3GB'
  },
  {
    name: "Icedrive",
    icon: "🧊",
    url: "https://icedrive.net",
    description: "10GB free • Client-side encryption",
    mainstream: false,
    security: 'enhanced',
    freeStorage: '10GB'
  }
];

// AI-powered insights for dashboard
const generateSmartInsights = (recentActivity: ActivityItem[], stats: DashboardStats): string[] => {
  const insights: string[] = [];
  
  if (stats.completedGoals > 0) {
    insights.push(`🎯 You've completed ${stats.completedGoals} goals this month!`);
  }
  
  if (stats.streak > 7) {
    insights.push(`🔥 Amazing ${stats.streak}-day streak! Keep the momentum going.`);
  }
  
  const recentGoals = recentActivity.filter(item => item.type === 'Goal').length;
  if (recentGoals > 3) {
    insights.push(`💡 You're goal-oriented! ${recentGoals} new goals created recently.`);
  }
  
  const timeOfDay = new Date().getHours();
  if (timeOfDay < 12) {
    insights.push(`🌅 Perfect morning to tackle your vision board!`);
  } else if (timeOfDay > 18) {
    insights.push(`🌙 Evening reflection time - review your progress!`);
  }
  
  return insights;
};

// Utility functions
const mapDocToItem = (doc: DocumentData, type: ActivityItem['type']): ActivityItem => {
  const data = doc.data();
  return {
    id: doc.id,
    type,
    title: data.title,
    text: data.text,
    caption: data.caption,
    timestamp: data.createdAt?.toDate() || new Date(),
    status: data.status || 'pending',
    priority: data.priority || 'medium'
  };
};

const createSnapshotHandler = (
  type: ActivityItem['type'], 
  setRecentActivity: React.Dispatch<React.SetStateAction<ActivityItem[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return (snapshot: QuerySnapshot<DocumentData>) => {
    try {
      const items = snapshot.docs.map(doc => mapDocToItem(doc, type));
      setRecentActivity(prev => {
        const filtered = prev.filter(item => item.type !== type);
        const updated = [...filtered, ...items];
        return updated.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 8);
      });
      setError(null);
    } catch (err) {
      console.error(`Error processing ${type} snapshot:`, err);
      setError(`Failed to load ${type} data`);
    } finally {
      setLoading(false);
    }
  };
};

// Main Dashboard Component
export default function Dashboard() {
  const { user } = useAuth();
  
  // State management
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [showCloudStorage, setShowCloudStorage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    completedGoals: 0,
    recentActivity: 0,
    streak: 0
  });

  // Memoized values
  const smartInsights = useMemo(() => 
    generateSmartInsights(recentActivity, stats), 
    [recentActivity, stats]
  );

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    const name = user?.displayName?.split(' ')[0] || 'there';
    
    if (hour < 12) return `Good morning, ${name}! ☀️`;
    if (hour < 17) return `Good afternoon, ${name}! ⛅`;
    return `Good evening, ${name}! 🌙`;
  }, [user]);

  const getPriorityColor = (priority?: ActivityItem['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-green-600';
      default: return 'text-sage-600';
    }
  };

  const getStatusIcon = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      default: return <Save className="w-4 h-4 text-sage-400" />;
    }
  };

  // Effects
  useEffect(() => {
    if (!user) return;

    const db = getFirestore();
    const unsubscribes: Unsubscribe[] = [];
    
    // Enhanced query configurations
    const recentQueries = [
      { collection: 'moodboards', type: 'Moodboard' as const },
      { collection: 'goals', type: 'Goal' as const },
      { collection: 'events', type: 'Event' as const },
      { collection: 'visionItems', type: 'Vision Item' as const }
    ];

    try {
      // Set up real-time listeners
      recentQueries.forEach(({ collection: collectionName, type }) => {
        const q = query(
          collection(db, collectionName),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        
        const unsubscribe = onSnapshot(
          q, 
          createSnapshotHandler(type, setRecentActivity, setLoading, setError),
          (err) => {
            console.error(`Error in ${type} listener:`, err);
            setError(`Failed to connect to ${type} data`);
            setLoading(false);
          }
        );
        
        unsubscribes.push(unsubscribe);
      });

      // Update last visit tracking
      const stored = localStorage.getItem('lastVisit');
      setLastVisit(stored);
      localStorage.setItem('lastVisit', new Date().toISOString());
      
      // Calculate streak (mock implementation)
      const streak = Math.floor(Math.random() * 30) + 1; // Replace with real calculation
      setStats(prev => ({ ...prev, streak }));

    } catch (err) {
      console.error('Dashboard initialization error:', err);
      setError('Failed to initialize dashboard');
      setLoading(false);
    }

    // Cleanup function
    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [user]);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Loading state
  if (loading && recentActivity.length === 0) {
    return (
      <EnhancedAppLayout>
        <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-warm-gray-50 pt-24 pb-12">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="w-12 h-12 text-sage-600 animate-spin mx-auto mb-4" />
              <p className="text-sage-600">Loading your dashboard...</p>
            </motion.div>
          </div>
        </div>
      </EnhancedAppLayout>
    );
  }

  // Authentication guard
  if (!user) {
    return (
      <EnhancedAppLayout>
        <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-warm-gray-50 pt-24 pb-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <AlertCircle className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-sage-800 mb-2">Authentication Required</h2>
            <p className="text-sage-600">Please log in to access your personalized dashboard.</p>
          </div>
        </div>
      </EnhancedAppLayout>
    );
  }

  return (
    <EnhancedAppLayout>
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-warm-gray-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
        
          {/* Enhanced Welcome Header */}
          <motion.div className="mb-8" {...fadeIn}>
            <h1 className="text-4xl font-bold text-sage-800 mb-2">
              {getGreeting()}
            </h1>
            <div className="flex items-center gap-4 text-sage-600">
              <p>
                {lastVisit 
                  ? `Last visit: ${new Date(lastVisit).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}`
                  : "Welcome to your dashboard"
                }
              </p>
              {stats.streak > 0 && (
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <Zap className="w-4 h-4" />
                  {stats.streak} day streak
                </span>
              )}
            </div>
          </motion.div>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400 hover:text-red-600"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smart Insights Banner */}
          {smartInsights.length > 0 && (
            <motion.div
              className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">AI Insights</span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                {smartInsights.slice(0, 2).map((insight, idx) => (
                  <p key={idx}>{insight}</p>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Enhanced Recent Activity */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-sage-600" />
                  <h2 className="text-xl font-semibold text-sage-800">Recent Activity</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-sage-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>{recentActivity.length} items</span>
                </div>
              </div>
              
              <motion.div className="space-y-3" variants={staggerChildren} animate="animate">
                <AnimatePresence mode="popLayout">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors group cursor-pointer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        layout
                      >
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium text-sage-800 truncate">
                              {item.title || item.text || item.caption || 'Untitled'}
                            </div>
                            {item.priority && (
                              <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                {item.priority.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-sage-600">
                            {item.type} • {item.timestamp.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      className="text-center py-8 text-sage-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium mb-1">Ready to start creating?</p>
                      <p className="text-sm">Your recent work will appear here as you go.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Enhanced Cloud Storage Panel */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-sage-600" />
                <h2 className="text-xl font-semibold text-sage-800">Cloud Storage</h2>
              </div>
              
              <p className="text-sm text-sage-600 mb-4">
                Your data auto-saves locally. Connect cloud storage for backup & sync:
              </p>

              {/* Popular Options */}
              <div className="space-y-2 mb-4">
                <h3 className="font-medium text-sage-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Popular Choices:
                </h3>
                {cloudStorageProviders.filter(p => p.mainstream).map((provider) => (
                  <motion.a
                    key={provider.name}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-50 transition-all group border border-transparent hover:border-sage-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg" role="img" aria-label={provider.name}>{provider.icon}</span>
                    <div className="flex-grow">
                      <div className="font-medium text-sage-800 group-hover:text-sage-900">{provider.name}</div>
                      <div className="text-xs text-sage-500">{provider.description}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-sage-400 group-hover:text-sage-600 transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Alternative Options Toggle */}
              <motion.button
                onClick={() => setShowCloudStorage(!showCloudStorage)}
                className="w-full text-center py-3 px-4 text-sm text-sage-600 hover:text-sage-800 hover:bg-sage-50 rounded-lg transition-all border border-sage-200 hover:border-sage-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={showCloudStorage}
                aria-controls="alternative-storage"
              >
                <span className="flex items-center justify-center gap-2">
                  🔐 {showCloudStorage ? 'Hide' : 'Show'} Privacy-Focused Options
                  <motion.span
                    animate={{ rotate: showCloudStorage ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↓
                  </motion.span>
                </span>
              </motion.button>

              {/* Privacy-Focused Options */}
              <AnimatePresence>
                {showCloudStorage && (
                  <motion.div 
                    id="alternative-storage"
                    className="mt-4 pt-4 border-t border-sage-200 space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-medium text-sage-700 flex items-center gap-2">
                      <span className="text-sm">🛡️</span>
                      Security-First Options:
                    </h3>
                    {cloudStorageProviders.filter(p => !p.mainstream).map((provider) => (
                      <motion.a
                        key={provider.name}
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-50 transition-all group border border-transparent hover:border-sage-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-lg" role="img" aria-label={provider.name}>{provider.icon}</span>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sage-800 group-hover:text-sage-900">{provider.name}</span>
                            {provider.security === 'military' && (
                              <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">Military</span>
                            )}
                            {provider.security === 'enhanced' && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Enhanced</span>
                            )}
                          </div>
                          <div className="text-xs text-sage-500">{provider.description}</div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-sage-400 group-hover:text-sage-600 transition-colors" />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Enhanced Quick Actions */}
          <motion.div 
            className="mt-8 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-sage-800">Quick Actions</h2>
              <motion.div 
                className="flex items-center gap-1 text-sm text-sage-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-4 h-4" />
                <span>AI-Powered</span>
              </motion.div>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={staggerChildren}
              animate="animate"
            >
              {[
                { label: "New Vision Board", href: "/vision-board", icon: "🎨", description: "Create visual goals" },
                { label: "Activism Hub", href: "#", icon: "✊", special: "activism", description: "Make a difference" },
                { label: "Smart Calendar", href: "/calendar", icon: "📅", description: "AI-optimized scheduling" },
                { label: "Explore Ideas", href: "/explore", icon: "🔍", description: "Discover inspiration" }
              ].map((action, index) => (
                <motion.a
                  key={action.label}
                  href={action.href}
                  onClick={action.special ? (e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('changeView', { detail: action.special }));
                  } : undefined}
                  className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-sage-50 to-sage-100 rounded-xl hover:from-sage-100 hover:to-sage-200 transition-all group border border-sage-200 hover:border-sage-300 hover:shadow-md"
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform" role="img" aria-label={action.label}>
                    {action.icon}
                  </span>
                  <div className="text-center">
                    <span className="text-sm font-medium text-sage-700 group-hover:text-sage-800 block">{action.label}</span>
                    <span className="text-xs text-sage-500 group-hover:text-sage-600">{action.description}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </EnhancedAppLayout>
  );
}