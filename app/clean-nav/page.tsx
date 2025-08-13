'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Palette, Zap, Settings } from 'lucide-react';

export default function CleanDashboard() {
  const pages = [
    {
      title: 'Home',
      description: 'Main landing page',
      href: '/',
      icon: Home,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Style Test',
      description: 'Color palette and typography',
      href: '/test-styling',
      icon: Palette,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Button Demo',
      description: 'Animated button showcase',
      href: '/button-demo',
      icon: Zap,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Medical Hub',
      description: 'Health and medical features',
      href: '/medical-hub',
      icon: Settings,
      color: 'from-emerald-400 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎨 LISTO Navigation
        </h1>
        <p className="text-lg text-gray-600">
          Clean navigation to all your beautiful pages
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {pages.map((page, index) => {
            const Icon = page.icon;
            return (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            ✨ All Fixed!
          </h2>
          <p className="text-gray-600">
            Your styling issues have been resolved. All pages should now display cleanly without any code sprawl.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
