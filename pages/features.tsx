import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/EnhancedCards';
import { 
  Heart, 
  Brain, 
  Target,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const FeaturesShowcase: React.FC = () => {
  const features = [
    {
      title: 'Health Hub',
      description: 'Comprehensive health tracking with privacy-first design',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      href: '/health',
      color: 'red',
      items: [
        'Cycle Tracking',
        'Menopause Support', 
        'Mood & Weather Correlations',
        'Medication Effectiveness',
        'Privacy-First Design'
      ]
    },
    {
      title: 'Dopamine Garden',
      description: 'Gamified achievement tracking with your personal garden',
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      href: '/dopamine-garden',
      color: 'yellow',
      items: [
        'Plant Growth System',
        'Achievement Integration',
        'Weather Effects',
        'Plant Evolution',
        'Interactive Garden'
      ]
    },
    {
      title: 'Enhanced Voice Navigation',
      description: 'Advanced speech-to-text with smart silence detection',
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      href: '#voice-demo',
      color: 'purple',
      items: [
        'Continuous Recognition',
        'Silence Detection',
        'Privacy Controls',
        'Custom Commands',
        'Accessibility Focus'
      ]
    },
    {
      title: 'Smart Reflection Prompts',
      description: 'Context-aware prompts with optimal timing algorithms',
      icon: <Target className="w-8 h-8 text-blue-500" />,
      href: '#reflection-demo',
      color: 'blue',
      items: [
        'Optimal Timing',
        'Context Awareness',
        'Mood Integration',
        'Progress Tracking',
        'Personalization'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-sage-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            LISTO Features Showcase
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Discover our comprehensive suite of neurodivergent-friendly features designed with 
            privacy, accessibility, and evidence-based approaches at the core.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="h-full hover:shadow-xl transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-${feature.color}-100`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-${feature.color}-500`}></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {feature.href.startsWith('/') ? (
                    <Link href={feature.href}>
                      <button className={`w-full bg-${feature.color}-600 text-white py-3 px-6 rounded-lg hover:bg-${feature.color}-700 transition-colors font-medium group-hover:scale-105 transform duration-200`}>
                        Explore {feature.title}
                      </button>
                    </Link>
                  ) : (
                    <button 
                      className={`w-full bg-${feature.color}-600 text-white py-3 px-6 rounded-lg hover:bg-${feature.color}-700 transition-colors font-medium group-hover:scale-105 transform duration-200`}
                      onClick={() => alert(`${feature.title} demo coming soon!`)}
                    >
                      Demo {feature.title}
                    </button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card variant="glass" className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy First</h3>
                <p className="text-gray-600 text-sm">
                  All sensitive data stays local on your device with optional encryption. 
                  You maintain complete control over your information.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Neurodivergent Friendly</h3>
                <p className="text-gray-600 text-sm">
                  Designed specifically for ADHD, autism, and other neurodivergent minds 
                  with sensory considerations and executive function support.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Evidence Based</h3>
                <p className="text-gray-600 text-sm">
                  Every feature is backed by research and clinical studies, 
                  providing meaningful insights rather than superficial tracking.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to explore?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/health">
              <button className="bg-sage-600 text-white px-8 py-3 rounded-lg hover:bg-sage-700 transition-colors font-medium">
                Try Health Hub
              </button>
            </Link>
            <Link href="/dopamine-garden">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Visit Your Garden
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Dashboard
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesShowcase;
