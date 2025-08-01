// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getFirestore, collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { Clock, Save, Cloud, ExternalLink } from "lucide-react";

// Cloud storage providers
const cloudStorageProviders = [
  {
    name: "Google Drive",
    icon: "🔷",
    url: "https://drive.google.com",
    description: "15GB free storage",
    mainstream: true
  },
  {
    name: "Dropbox", 
    icon: "📦",
    url: "https://dropbox.com",
    description: "2GB free storage",
    mainstream: true
  },
  {
    name: "OneDrive",
    icon: "☁️", 
    url: "https://onedrive.live.com",
    description: "5GB free storage",
    mainstream: true
  },
  {
    name: "iCloud",
    icon: "🍎",
    url: "https://icloud.com",
    description: "5GB free storage",
    mainstream: true
  },
  // Non-mainstream options
  {
    name: "pCloud",
    icon: "🌤️",
    url: "https://pcloud.com",
    description: "10GB free, lifetime plans available",
    mainstream: false
  },
  {
    name: "Mega",
    icon: "🔒",
    url: "https://mega.nz",
    description: "20GB free with end-to-end encryption",
    mainstream: false
  },
  {
    name: "Sync.com",
    icon: "🔐",
    url: "https://sync.com", 
    description: "5GB free, zero-knowledge encryption",
    mainstream: false
  },
  {
    name: "SpiderOak",
    icon: "🕷️",
    url: "https://spideroak.com",
    description: "Military-grade security",
    mainstream: false
  },
  {
    name: "Tresorit",
    icon: "🏰",
    url: "https://tresorit.com",
    description: "Swiss-based, ultra-secure",
    mainstream: false
  },
  {
    name: "Icedrive",
    icon: "🧊",
    url: "https://icedrive.net",
    description: "10GB free, client-side encryption",
    mainstream: false
  }
];

const mapDocToItem = (doc, type) => {
  const data = doc.data();
  return {
    id: doc.id,
    type,
    ...data,
    timestamp: data.createdAt?.toDate() || new Date()
  };
};

const createSnapshotHandler = (type, setRecentActivity) => {
  return (snapshot) => {
    const items = snapshot.docs.map(doc => mapDocToItem(doc, type));
    setRecentActivity(prev => {
      const filtered = prev.filter(item => item.type !== type);
      const updated = [...filtered, ...items];
      return updated.sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
    });
  };
};

export default function Dashboard() {
  const { user } = useAuth();
  const [recentActivity, setRecentActivity] = useState([]);
  const [lastVisit, setLastVisit] = useState(null);
  const [showCloudStorage, setShowCloudStorage] = useState(false);

  useEffect(() => {
    if (!user) return;

    const db = getFirestore();

    // Get recent activity across all collections
    const recentQueries = [
      { collection: 'moodboards', type: 'Moodboard' },
      { collection: 'goals', type: 'Goal' },
      { collection: 'events', type: 'Event' },
      { collection: 'visionItems', type: 'Vision Item' }
    ];

    const unsubscribes = [];
    recentQueries.forEach(({ collection: collectionName, type }) => {
      const q = query(
        collection(db, collectionName),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(3)
      );
      
      unsubscribes.push(onSnapshot(q, createSnapshotHandler(type, setRecentActivity)));
    });

    // Update last visit
    setLastVisit(localStorage.getItem('lastVisit'));
    localStorage.setItem('lastVisit', new Date().toISOString());

    return () => unsubscribes.forEach(unsub => unsub());
  }, [user]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  if (!user) {
    return <div>Please log in to continue.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-warm-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Welcome Back Header */}
        <motion.div className="mb-8" {...fadeIn}>
          <h1 className="text-4xl font-bold text-sage-800 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-sage-600">
            {lastVisit ? `Last visit: ${new Date(lastVisit).toLocaleDateString()}` : "Let's pick up where you left off"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activity */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-sage-600" />
              <h2 className="text-xl font-semibold text-sage-800">Recent Activity</h2>
            </div>
            
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div>
                      <div className="font-medium text-sage-800">{item.title || item.text || item.caption}</div>
                      <div className="text-sm text-sage-600">{item.type} • {item.timestamp.toLocaleDateString()}</div>
                    </div>
                    <Save className="w-4 h-4 text-sage-400" />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-sage-500">
                  <Save className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No recent activity yet. Start creating!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Cloud Storage Panel */}
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
              Your data is auto-saved. Connect additional storage for backup:
            </p>

            {/* Basic Options */}
            <div className="space-y-2 mb-4">
              <h3 className="font-medium text-sage-700">Popular Options:</h3>
              {cloudStorageProviders.filter(p => p.mainstream).map((provider) => (
                <motion.a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-sage-50 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-lg">{provider.icon}</span>
                  <div className="flex-grow">
                    <div className="font-medium text-sage-800 group-hover:text-sage-900">{provider.name}</div>
                    <div className="text-xs text-sage-500">{provider.description}</div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-sage-400 group-hover:text-sage-600" />
                </motion.a>
              ))}
            </div>

            {/* Alternative Options Toggle */}
            <motion.button
              onClick={() => setShowCloudStorage(!showCloudStorage)}
              className="w-full text-center py-2 px-4 text-sm text-sage-600 hover:text-sage-800 hover:bg-sage-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              {showCloudStorage ? 'Hide' : 'Show'} Alternative Options ↓
            </motion.button>

            {/* Non-mainstream Options */}
            {showCloudStorage && (
              <motion.div 
                className="mt-4 pt-4 border-t border-sage-200 space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-medium text-sage-700">Privacy-Focused & Alternative:</h3>
                {cloudStorageProviders.filter(p => !p.mainstream).map((provider) => (
                  <motion.a
                    key={provider.name}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-sage-50 transition-colors group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-lg">{provider.icon}</span>
                    <div className="flex-grow">
                      <div className="font-medium text-sage-800 group-hover:text-sage-900">{provider.name}</div>
                      <div className="text-xs text-sage-500">{provider.description}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-sage-400 group-hover:text-sage-600" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-sage-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "New Moodboard", href: "/vision-board", icon: "🎨" },
              { label: "Activism Hub", href: "#", icon: "✊", special: "activism" },
              { label: "Add Event", href: "/calendar", icon: "📅" },
              { label: "Explore", href: "/explore", icon: "🔍" }
            ].map((action) => (
              <motion.a
                key={action.label}
                href={action.href}
                onClick={action.special ? (e) => {
                  e.preventDefault();
                  // This will trigger the sidebar view change
                  window.dispatchEvent(new CustomEvent('changeView', { detail: action.special }));
                } : undefined}
                className="flex flex-col items-center gap-2 p-4 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm font-medium text-sage-700 group-hover:text-sage-800">{action.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
