import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Users, 
  Heart, 
  Zap, 
  Shield, 
  Sparkles,
  Target,
  Focus,
  Palette,
  Archive,
  Smartphone,
  ChevronRight,
  Star,
  Lightbulb,
  Rocket
} from 'lucide-react';

const ListoLandingPage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 9);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Resonance Circles',
      subtitle: 'Anonymous Social Revolution',
      description: 'Connect with others through energy patterns, not profiles. Share experiences anonymously while building meaningful connections.',
      highlight: 'World\'s first energy-based social network',
      color: 'purple'
    },
    {
      icon: Brain,
      title: 'Insights Lab',
      subtitle: 'AI-Powered Life Analysis',
      description: 'Discover patterns across all your apps and data. Get personalized recommendations that adapt to your unique neurodivergent needs.',
      highlight: 'Cross-platform data intelligence',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Wellness Studio',
      subtitle: 'Intelligent Break System',
      description: 'Personalized breaks that understand your sensory needs, energy levels, and cognitive patterns for optimal well-being.',
      highlight: 'Neurodivergent-first design',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Focus Flow',
      subtitle: 'Executive Function Support',
      description: 'Advanced task management that works with ADHD, autism, and other neurodivergent thinking patterns.',
      highlight: 'Cognitive load optimization',
      color: 'orange'
    },
    {
      icon: Focus,
      title: 'Sensory Space',
      subtitle: 'Environment Optimization',
      description: 'Real-time sensory monitoring and adjustments to create your perfect work and living environment.',
      highlight: 'Sensory accommodation engine',
      color: 'indigo'
    },
    {
      icon: Archive,
      title: 'Memory Palace',
      subtitle: 'External Memory System',
      description: 'Never lose important information again. AI-organized memory support that learns how you think.',
      highlight: 'Forgetting curve compensation',
      color: 'cyan'
    },
    {
      icon: Target,
      title: 'Goal Galaxy',
      subtitle: 'Collaborative Achievement',
      description: 'Share goals anonymously, join challenges, and celebrate achievements with your resonance network.',
      highlight: 'Social goal accountability',
      color: 'pink'
    },
    {
      icon: Smartphone,
      title: 'Mobile Hub',
      subtitle: 'Voice, Gesture & Haptic',
      description: 'Complete mobile optimization with voice notes, gesture controls, and haptic feedback for accessibility.',
      highlight: 'Multi-modal interaction',
      color: 'teal'
    },
    {
      icon: Palette,
      title: 'Experience Studio',
      subtitle: 'Personalized Interface',
      description: 'Themes, soundscapes, and micro-interactions that adapt to your sensory preferences and mental state.',
      highlight: 'Dynamic sensory adaptation',
      color: 'violet'
    }
  ];

  const stats = [
    { number: '9', label: 'Revolutionary Features', icon: Rocket },
    { number: '100%', label: 'Privacy Protected', icon: Shield },
    { number: '∞', label: 'Neurodivergent Focused', icon: Brain },
    { number: '24/7', label: 'AI Support', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-3xl mx-auto mb-8 flex items-center justify-center"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              LISTO
            </h1>
            <p className="text-3xl md:text-4xl font-light mb-4 opacity-90">
              Life Intelligence & Support Through Optimization
            </p>
            <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-4xl mx-auto">
              The world's first neurodivergent-friendly wellness ecosystem combining anonymous social connections, 
              AI-powered insights, and comprehensive accessibility features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-900 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-2xl"
              >
                Experience LISTO <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-900 transition-all"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Revolutionary Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nine groundbreaking features working together to create the most comprehensive 
              neurodivergent-friendly wellness platform ever built.
            </p>
          </motion.div>

          {/* Interactive Feature Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    activeFeature === index
                      ? `bg-${feature.color}-50 border-2 border-${feature.color}-200 shadow-lg`
                      : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.subtitle}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      activeFeature === index ? 'rotate-90' : ''
                    } text-gray-400`} />
                  </div>
                  
                  <AnimatePresence>
                    {activeFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-700 mb-3">{feature.description}</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${feature.color}-100 text-${feature.color}-700 rounded-full text-sm font-medium`}>
                          <Star className="w-4 h-4" />
                          {feature.highlight}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Feature Visualization */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className={`w-24 h-24 bg-gradient-to-br from-${features[activeFeature].color}-400 to-${features[activeFeature].color}-600 rounded-3xl mx-auto mb-8 flex items-center justify-center`}>
                {React.createElement(features[activeFeature].icon, { className: "w-12 h-12 text-white" })}
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                {features[activeFeature].title}
              </h3>
              <p className="text-center text-gray-600 mb-6">
                {features[activeFeature].description}
              </p>
              <div className="text-center">
                <span className={`inline-flex items-center gap-2 px-4 py-2 bg-${features[activeFeature].color}-50 text-${features[activeFeature].color}-700 rounded-full font-medium`}>
                  <Sparkles className="w-4 h-4" />
                  {features[activeFeature].highlight}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why LISTO Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Why LISTO Changes Everything
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: 'Anonymous Social Innovation',
                    description: 'First-ever social network based on energy resonance, not personal data. Connect authentically while staying completely private.'
                  },
                  {
                    icon: Brain,
                    title: 'Neurodivergent-First Design',
                    description: 'Every feature built specifically for ADHD, autism, and other neurodivergent minds. No afterthoughts, no compromises.'
                  },
                  {
                    icon: Shield,
                    title: 'Privacy by Design',
                    description: 'Your data stays yours. Anonymous connections, encrypted storage, and complete control over your digital footprint.'
                  },
                  {
                    icon: Lightbulb,
                    title: 'AI That Understands You',
                    description: 'Machine learning that adapts to neurodivergent patterns, providing insights that actually make sense for how your mind works.'
                  }
                ].map((point, index) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Join the Revolution</h3>
                <p className="text-lg opacity-90 mb-8">
                  Be among the first to experience the future of neurodivergent-friendly technology.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 mx-auto"
                >
                  Get Early Access <Rocket className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Life?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of neurodivergent individuals who are already experiencing the LISTO difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 rounded-2xl font-bold text-lg"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ListoLandingPage;
