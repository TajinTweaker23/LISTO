import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from '../Sidebar';
import DarkModeToggle from './DarkModeToggle';
import { useViewport } from "../../hooks/useViewport";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useViewport();

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col min-h-screen lg:pl-64">
        {/* Mobile menu button */}
        <header className="lg:hidden sticky top-0 bg-white bg-opacity-80 backdrop-blur-xl z-10 border-b border-gray-200 border-opacity-60">
          <div className="p-4 flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(true)} 
              aria-label="Open menu"
              className="text-gray-700 hover:text-primary-600 p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <DarkModeToggle />
          </div>
        </header>
        
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={typeof children === 'object' && children && 'key' in children ? children.key : 'main'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
