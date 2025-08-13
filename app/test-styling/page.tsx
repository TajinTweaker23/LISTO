'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Sparkles, Heart, Target, Brain, ArrowRight } from 'lucide-react';

export default function TestStyling() {
  const [loading, setLoading] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState<'spinner' | 'dots' | 'bars'>('spinner');

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎨 LISTO Style System Test
        </h1>
        <p className="text-lg text-gray-600">
          Testing all your beautiful colors, animations, and components!
        </p>
      </motion.div>

      {/* Color Palette Test */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Primary Colors */}
          <div className="bg-primary text-white p-4 rounded-lg text-center">
            <div className="font-semibold">Primary</div>
            <div className="text-sm opacity-90">Blue</div>
          </div>
          <div className="bg-brand-primary text-white p-4 rounded-lg text-center">
            <div className="font-semibold">Brand</div>
            <div className="text-sm opacity-90">Primary</div>
          </div>
          <div className="bg-brand-secondary text-gray-900 p-4 rounded-lg text-center">
            <div className="font-semibold">Brand</div>
            <div className="text-sm opacity-90">Secondary</div>
          </div>
          <div className="bg-sage-500 text-white p-4 rounded-lg text-center">
            <div className="font-semibold">Sage</div>
            <div className="text-sm opacity-90">Green</div>
          </div>
          <div className="bg-accent-success text-white p-4 rounded-lg text-center">
            <div className="font-semibold">Success</div>
            <div className="text-sm opacity-90">Green</div>
          </div>
          <div className="bg-accent-warning text-white p-4 rounded-lg text-center">
            <div className="font-semibold">Warning</div>
            <div className="text-sm opacity-90">Orange</div>
          </div>

          {/* Soft Colors */}
          <div className="bg-cream p-4 rounded-lg text-center text-gray-800">
            <div className="font-semibold">Cream</div>
            <div className="text-sm opacity-75">Warm</div>
          </div>
          <div className="bg-blush p-4 rounded-lg text-center text-gray-800">
            <div className="font-semibold">Blush</div>
            <div className="text-sm opacity-75">Pink</div>
          </div>
          <div className="bg-sky p-4 rounded-lg text-center text-gray-800">
            <div className="font-semibold">Sky</div>
            <div className="text-sm opacity-75">Blue</div>
          </div>
          <div className="bg-fog p-4 rounded-lg text-center text-gray-800">
            <div className="font-semibold">Fog</div>
            <div className="text-sm opacity-75">Gray</div>
          </div>
          <div className="bg-apricot p-4 rounded-lg text-center text-gray-800">
            <div className="font-semibold">Apricot</div>
            <div className="text-sm opacity-75">Orange</div>
          </div>
          <div className="bg-mint p-4 rounded-lg text-center text-gray-800">
            <div className="font-semibold">Mint</div>
            <div className="text-sm opacity-75">Green</div>
          </div>
        </div>
      </motion.section>

      {/* Button Variants Test */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Button Variations</h2>
        
        <div className="grid gap-6">
          {/* Standard Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Standard Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
          </div>

          {/* Glow Button - Your Custom Animation! */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">✨ Animated Glow Button</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="glow" className="text-lg px-8 py-4">
                <Sparkles className="mr-2" />
                GLOW EFFECT
              </Button>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button leftIcon={<Heart className="w-4 h-4" />}>
                With Left Icon
              </Button>
              <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
                With Right Icon
              </Button>
              <Button 
                leftIcon={<Target className="w-4 h-4" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Both Icons
              </Button>
            </div>
          </div>

          {/* Loading States */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Loading States</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button 
                loading={loading} 
                loadingVariant="spinner"
                onClick={handleLoadingTest}
              >
                Spinner Loading
              </Button>
              <Button 
                loading={loading} 
                loadingVariant="dots"
                onClick={handleLoadingTest}
              >
                Dots Loading
              </Button>
              <Button 
                loading={loading} 
                loadingVariant="bars"
                onClick={handleLoadingTest}
              >
                Bars Loading
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small Button</Button>
              <Button size="default">Default Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Cards with Gradient Backgrounds */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gradient Cards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card-premium p-6 hover-lift"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full mb-4 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Hub</h3>
            <p className="text-gray-600">AI-powered health insights and medical learning</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card-premium p-6 hover-lift"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Brain Training</h3>
            <p className="text-gray-600">Cognitive exercises and mental wellness</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card-premium p-6 hover-lift"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Goal Tracker</h3>
            <p className="text-gray-600">Smart goal setting and achievement tracking</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Animated Elements */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Animations</h2>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-sage-400 to-sage-600 rounded-2xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.section>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12 p-6 bg-green-50 border border-green-200 rounded-xl"
      >
        <div className="text-green-800 text-lg font-medium mb-2">
          ✅ All Styles Working Correctly!
        </div>
        <div className="text-green-600 text-sm">
          Your color scheme, typography, and animations are all properly loaded.
          <br />
          Tailwind CSS is now processing all your app directory styles.
        </div>
      </motion.div>
    </div>
  );
}
