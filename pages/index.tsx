import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play,
  Users,
  Brain,
  Heart,
  Shield
} from 'lucide-react';
import ListoLandingPage from '../components/ListoLandingPage';
import ListoMainHub from '../components/ListoMainHub';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');

  if (currentView === 'app') {
    return (
      <>
        <Head>
          <title>LISTO - Life Intelligence & Support Through Optimization</title>
          <meta name="description" content="The world's first neurodivergent-friendly wellness ecosystem combining anonymous social connections, AI-powered insights, and comprehensive accessibility features." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ListoMainHub />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>LISTO - Life Intelligence & Support Through Optimization</title>
        <meta name="description" content="The world's first neurodivergent-friendly wellness ecosystem combining anonymous social connections, AI-powered insights, and comprehensive accessibility features." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="LISTO - Revolutionary Neurodivergent Wellness Platform" />
        <meta property="og:description" content="Experience anonymous social networking, AI-powered insights, and comprehensive accessibility features designed specifically for neurodivergent minds." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LISTO - The Future of Neurodivergent Technology" />
        <meta name="twitter:description" content="Nine revolutionary features working together to create the most comprehensive neurodivergent-friendly wellness platform ever built." />
      </Head>

      <div className="relative">
        {/* Quick Demo Banner */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span className="text-sm font-medium">
                🎉 LISTO is now live! Experience all 9 revolutionary features.
              </span>
            </div>
            <motion.button
              onClick={() => setCurrentView('app')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Try Demo <Play className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Section */}
        <section className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Gradient Orbs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl"
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </motion.div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
              >
                LISTO
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl md:text-4xl font-light mb-4 opacity-90"
              >
                Life Intelligence & Support Through Optimization
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl mb-12 opacity-80 max-w-4xl mx-auto leading-relaxed"
              >
                The world's first neurodivergent-friendly wellness ecosystem combining{' '}
                <span className="text-blue-300 font-semibold">anonymous social connections</span>,{' '}
                <span className="text-green-300 font-semibold">AI-powered insights</span>, and{' '}
                <span className="text-purple-300 font-semibold">comprehensive accessibility features</span>.
              </motion.p>

              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
              >
                {[
                  { icon: Users, label: 'Anonymous Social', color: 'purple' },
                  { icon: Brain, label: 'AI-Powered', color: 'blue' },
                  { icon: Heart, label: 'Wellness First', color: 'green' },
                  { icon: Shield, label: 'Privacy Protected', color: 'orange' }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex flex-col items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}-300`} />
                    </div>
                    <span className="text-sm font-medium text-center">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  onClick={() => setCurrentView('app')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-2xl transition-all"
                >
                  Experience LISTO <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/50 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Features
                </motion.button>
              </motion.div>

              {/* Beta Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
                className="mt-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium border border-yellow-500/30">
                  <Sparkles className="w-4 h-4" />
                  Revolutionary Beta • 9 Features Available Now
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Landing Page Content */}
        <div id="features">
          <ListoLandingPage />
        </div>
      </div>
    </>
  );
}
