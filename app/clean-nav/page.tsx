'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, Heart, Brain, Target, Calendar, Utensils, 
  Users, Activity, LineChart, Sparkles, Settings,
  LayoutDashboard
} from 'lucide-react';

export default function CleanDashboard() {
  const pages = [
    {
      title: 'Home',
      description: 'Main landing page',
      href: '/',
      icon: Home,
      color: 'from-blue-400 to-blue-600',
      category: 'Main'
    },
    {
      title: 'Wellness Hub',
      description: 'Mental health and wellness tracking',
      href: '/wellness',
      icon: Heart,
      color: 'from-emerald-400 to-green-600',
      category: 'Main'
    },
    {
      title: 'Medical Hub',
      description: 'Health management and medical resources',
      href: '/medical-hub',
      icon: Brain,
      color: 'from-blue-400 to-indigo-600',
      category: 'Main'
    },
    {
      title: 'Vision Board',
      description: 'Goal setting and visualization',
      href: '/vision-board',
      icon: Target,
      color: 'from-purple-400 to-pink-600',
      category: 'Main'
    },
    {
      title: 'Dashboard',
      description: 'Personal activity dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      color: 'from-cyan-400 to-blue-600',
      category: 'Tools'
    },
    {
      title: 'Health Tracker',
      description: 'Detailed health metrics',
      href: '/health',
      icon: Activity,
      color: 'from-red-400 to-pink-600',
      category: 'Tools'
    },
    {
      title: 'Meal Planner',
      description: 'ADHD-friendly meal planning',
      href: '/adhd-meal-planner-demo',
      icon: Utensils,
      color: 'from-orange-400 to-amber-600',
      category: 'Tools'
    },
    {
      title: 'Growth Pods',
      description: 'Collaborative growth tracking',
      href: '/growth-pods',
      icon: Users,
      color: 'from-green-400 to-emerald-600',
      category: 'Tools'
    },
    {
      title: 'Optimizer',
      description: 'AI-powered optimization',
      href: '/optimizer',
      icon: LineChart,
      color: 'from-violet-400 to-purple-600',
      category: 'Tools'
    }
  ];

  const mainPages = pages.filter(p => p.category === 'Main');
  const toolPages = pages.filter(p => p.category === 'Tools');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎨 LISTO Navigation Hub
        </h1>
        <p className="text-lg text-gray-600">
          Access all your tools and features in one place
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main Features */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Main Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainPages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={page.href}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 h-full hover:scale-105">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {page.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {page.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tools & Features */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tools & Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolPages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link href={page.href}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {page.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-500 group-hover:text-blue-700 text-sm font-medium">
                        Visit Page →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 max-w-6xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          ✨ Navigation Hub Active!
        </h2>
        <p className="text-gray-600">
          All pages are organized and ready to explore. Click any card to navigate to that feature.
        </p>
      </motion.div>
    </div>
  );
}
