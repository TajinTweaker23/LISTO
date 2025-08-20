import React from 'react';
import { motion } from 'framer-motion';
import TransitionRitualBuilder from '../components/productivity/TransitionRitualBuilder';
import EnhancedAppLayout from '../components/layout/EnhancedAppLayout';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

const TransitionRitualsPage: React.FC = () => {
  const router = useRouter();

  return (
    <EnhancedAppLayout showAllFeatures={false}>
      <div className="min-h-screen pt-20 pb-12">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Transition Rituals</h1>
              <p className="text-gray-600 mt-1">
                Smooth context switching for neurodivergent minds 🧠✨
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-3">
              🎯 Why Transition Rituals Work for ADHD & Autism
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h3 className="font-medium mb-2">For ADHD Minds:</h3>
                <ul className="space-y-1 text-blue-600">
                  <li>• Reduces executive function load</li>
                  <li>• Creates predictable structure</li>
                  <li>• Helps with task switching difficulties</li>
                  <li>• Provides dopamine through completion</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">For Autistic Minds:</h3>
                <ul className="space-y-1 text-blue-600">
                  <li>• Manages sensory transitions</li>
                  <li>• Reduces anxiety about change</li>
                  <li>• Creates safe, predictable patterns</li>
                  <li>• Supports routine needs</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-green-800 mb-3">
              🔒 Privacy & Security Features
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-green-700">
                <h3 className="font-medium mb-2">🛡️ Private Mode</h3>
                <p>No data stored permanently. Rituals exist only during your session.</p>
              </div>
              <div className="text-green-700">
                <h3 className="font-medium mb-2">⚙️ Configurable</h3>
                <p>Turn off notifications, sounds, or the entire feature easily.</p>
              </div>
              <div className="text-green-700">
                <h3 className="font-medium mb-2">🏠 Local Storage</h3>
                <p>When enabled, all data stays on your device - never sent anywhere.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Component */}
        <TransitionRitualBuilder />
      </div>
    </EnhancedAppLayout>
  );
};

export default TransitionRitualsPage;
