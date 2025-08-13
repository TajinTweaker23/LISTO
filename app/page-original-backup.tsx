'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ParticleBackground from '../components/ParticleBackground';
import EnhancedCursor from '../components/EnhancedCursor';
import { 
  Heart, 
  Brain, 
  Target, 
  Sparkles, 
  ArrowRight,
  Shield,
  Calendar,
  Users
} from 'lucide-react';

const FEATURE_CARDS = [
  {
    id: 'medical',
    title: '🏥 Medical Hub',
    subtitle: 'AI-powered health insights',
    description: 'Disease prevention, medical learning, and healthcare navigation',
    gradient: 'from-emerald-400 to-cyan-400',
    link: '/medical-hub',
    icon: Heart,
    features: ['Brain Rot Learning', 'Disease Prevention', 'MA Assistant']
  },
  {
    id: 'wellness',
    title: '❤️ Wellness Tracker', 
    subtitle: 'Holistic health monitoring',
    description: 'Mood tracking, cycle monitoring, and health correlations',
    gradient: 'from-pink-400 to-rose-400',
    link: '/wellness',
    icon: Shield,
    features: ['Mood Tracking', 'Cycle Monitoring', 'Health Insights']
  },
  {
    id: 'optimizer',
    title: '🎯 Life Optimizer',
    subtitle: 'Smart productivity system', 
    description: 'Neurodivergent-friendly task management and focus tools',
    gradient: 'from-blue-400 to-indigo-400',
    link: '/optimizer',
    icon: Target,
    features: ['Smart Tasks', 'Focus Sessions', 'Time Blocking']
  },
  {
    id: 'vision',
    title: '✨ Vision Board',
    subtitle: 'Goal visualization hub',
    description: 'Create visual representations of your dreams and goals',
    gradient: 'from-purple-400 to-pink-400',
    link: '/vision-board',
    icon: Sparkles,
    features: ['Goal Setting', 'Visual Planning', 'Progress Tracking']
  }
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      <ParticleBackground />
      <EnhancedCursor />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-20 pb-12 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-8xl mb-6"
          >
            🎯
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
          >
            LISTO
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-white/90 mb-4 font-light"
          >
            Life Intelligence System & Task Optimizer
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Your comprehensive companion for health, wellness, productivity, and personal growth
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 group flex items-center gap-3"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => router.push('/medical-hub')}
              className="px-8 py-4 border-2 border-white/30 text-white text-lg font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Features
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 px-4 pb-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURE_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => router.push(card.link)}
              >
                <div className="h-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                    {card.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="space-y-2">
                    {card.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/40">
                        <div className="w-1 h-1 bg-white/40 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 pb-12 px-4 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-white/60 mb-6">
            Join thousands of users optimizing their lives with AI-powered insights
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-white/20 text-white rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            Start Your Journey →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
