import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Calendar, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly currentView: string;
  readonly onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onViewChange }) => {
  const handleViewChange = (view: string) => {
    onViewChange(view);
    onClose(); // Close sidebar on selection
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-72 bg-white/80 dark:bg-[#1a1b23]/90 backdrop-blur-lg shadow-2xl z-[80] flex flex-col p-6"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">LISTO</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition" aria-label="Close sidebar">
                <X className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <nav>
              <ul>
                {navItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleViewChange(item.id)}
                      className={`flex items-center w-full text-left px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                        currentView === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-4" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;