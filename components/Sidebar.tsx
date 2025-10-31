import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Calendar, FileText, Settings, Users, Heart, Search } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
import DarkModeToggle from './ui/DarkModeToggle';

interface SidebarProps {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
  readonly currentView?: string;
  readonly onViewChange?: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose = () => {} }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'talavera', label: 'Talavera', icon: Users, href: '/talavera' },
    { id: 'explore', label: 'Explore', icon: Search, href: '/explore' },
    { id: 'health', label: 'Health Hub', icon: Heart, href: '/health' },
    { id: 'meal-planner', label: 'Meal Planner', icon: Calendar, href: '/meal-planner' },
    { id: 'vision-board', label: 'Vision Board', icon: FileText, href: '/vision-board' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        className="fixed inset-y-0 left-0 w-64 bg-white bg-opacity-95 backdrop-blur-xl border-r border-gray-200 border-opacity-60 z-50 p-6 flex-col hidden lg:flex shadow-lg"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="mb-8">
          <Logo variant="full" size="md" />
        </div>

        {/* Navigation */}
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="mb-2">
                  <Link
                    href={item.href}
                    className="nav-link group"
                  >
                    <IconComponent className="w-5 h-5 transition-colors group-hover:text-primary-600" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Theme</span>
            <DarkModeToggle />
          </div>
          <div className="p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl border border-gray-200 border-opacity-60">
            <p className="text-sm text-gray-600 mb-2">LISTO Pro</p>
            <p className="text-xs text-gray-500">Unlock advanced wellness insights</p>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 left-0 w-64 bg-white bg-opacity-95 backdrop-blur-xl border-r border-gray-200 border-opacity-60 z-50 p-6 flex flex-col lg:hidden shadow-2xl"
            aria-label="Mobile navigation"
          >
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between mb-8">
              <Logo variant="full" size="sm" />
              <button
                onClick={onClose}
                aria-label="Close navigation"
                className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow">
              <ul>
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.id} className="mb-2">
                      <Link
                        href={item.href}
                        className="nav-link group"
                      >
                        <IconComponent className="w-5 h-5 transition-colors group-hover:text-primary-600" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Footer */}
            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Theme</span>
                <DarkModeToggle />
              </div>
              <div className="p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl border border-gray-200 border-opacity-60">
                <p className="text-sm text-gray-600 mb-1">LISTO Pro</p>
                <p className="text-xs text-gray-500">Advanced features</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;