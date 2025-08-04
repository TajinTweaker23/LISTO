import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Calendar, FileText, Settings, Users, Heart } from 'lucide-react';

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly currentView: string;
  readonly onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'health', label: 'Health Hub', icon: Heart },
  { id: 'activism', label: 'Activism Hub', icon: Users },
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
          <motion.dialog
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-[80] p-6 flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-label="Main navigation"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close navigation"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-8">LISTO</h2>
            <nav>
              <ul>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewChange(item.id);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        currentView === item.id
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;