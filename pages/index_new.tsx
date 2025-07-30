// pages/index.tsx

import { useEffect, useState, useRef } from "react";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "../lib/firebase";
import { getAvatarSVG } from "../components/ui/AvatarPicker";
import { motion, AnimatePresence } from "framer-motion";
import FaqSection from '@/components/FaqSection';
import '../styles/faq.css';
import { Link as LinkIcon } from 'lucide-react'; // Import an icon

// Landing page component for non-authenticated users
function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-warm-gray-50">
      {/* Hero Section */}
      <header className="flex flex-col items-center py-20 relative overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop')"}}>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        
        <motion.div 
          className="text-center z-10 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-sage-800 mb-6">
            Dream. Do. <span className="text-sage-600">Dominate.</span>
          </h1>
          <p className="text-xl md:text-2xl text-sage-700 mb-8 max-w-2xl mx-auto">
            Your personal productivity companion for turning visions into reality. 
            Create moodboards, track goals, and build your dream life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/login"
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free ✨
            </motion.a>
            <motion.a
              href="#features"
              className="bg-white/80 backdrop-blur-sm border-2 border-sage-200 text-sage-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-10 w-20 h-20 bg-sage-300 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 bg-warm-gray-400 rounded-full opacity-50"
          animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-sage-800 mb-4">
            Everything You Need to <span className="text-sage-600">Succeed</span>
          </h2>
          <p className="text-xl text-sage-600 max-w-2xl mx-auto">
            LISTO combines powerful productivity tools with beautiful design to help you achieve your dreams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🎨",
              title: "Mood Boards",
              description: "Visualize your goals with beautiful, customizable mood boards that inspire action."
            },
            {
              icon: "📅",
              title: "Smart Calendar",
              description: "Plan your path to success with intelligent scheduling and goal-based time blocking."
            },
            {
              icon: "🎯",
              title: "Vision Tracking",
              description: "Turn dreams into actionable steps with our comprehensive vision board system."
            },
            {
              icon: "📊",
              title: "Progress Analytics",
              description: "Track your growth with detailed insights and achievement milestones."
            },
            {
              icon: "🤝",
              title: "Community Support",
              description: "Connect with like-minded achievers and share your journey to success."
            },
            {
              icon: "📱",
              title: "Mobile Ready",
              description: "Access your goals and plans anywhere with our responsive design."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-sage-200/50 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="text-4xl mb-4 text-center">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-sage-800 mb-4">{feature.title}</h3>
              <p className="text-sage-600 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <FaqSection />
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Show landing page for non-authenticated users
  if (!user) {
    return <LandingPage />;
  }

  // Show loading while redirecting authenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-white to-warm-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-600 mx-auto"></div>
        <p className="mt-4 text-sage-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
