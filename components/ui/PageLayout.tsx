// components/ui/PageLayout.tsx
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  hideNavigation?: boolean;
  className?: string;
  showBackButton?: boolean;
  backgroundPattern?: 'dots' | 'grid' | 'gradient' | 'none';
}

const backgroundPatterns = {
  dots: 'radial-gradient(circle, var(--neutral-300) 1px, transparent 1px)',
  grid: 'linear-gradient(var(--neutral-200) 1px, transparent 1px), linear-gradient(90deg, var(--neutral-200) 1px, transparent 1px)',
  gradient: 'linear-gradient(135deg, var(--sage-50) 0%, var(--primary-50) 100%)',
  none: 'none'
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title = 'LISTO',
  description = 'Your productivity companion',
  hideNavigation = false,
  className = '',
  showBackButton = false,
  backgroundPattern = 'dots'
}) => {
  const router = useRouter();
  const { navigateWithFeedback, isNavigating } = useEnhancedNavigation();

  const pageTitle = title === 'LISTO' ? title : `${title} | LISTO`;

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      navigateWithFeedback('/');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        className={`page-wrapper ${className}`}
        style={{
          backgroundImage: backgroundPatterns[backgroundPattern],
          backgroundSize: backgroundPattern === 'dots' ? '20px 20px' : backgroundPattern === 'grid' ? '20px 20px' : 'auto',
          backgroundPosition: backgroundPattern === 'grid' ? '0 0, 0 0' : 'auto'
        }}
      >
        {/* Navigation Header */}
        {!hideNavigation && (
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  {showBackButton && (
                    <button
                      onClick={handleBack}
                      className="nav-link p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Go back"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  <h1 className="text-xl font-bold text-gray-900">
                    {title}
                  </h1>
                </div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center gap-2">
                  <a href="/" className="nav-link">Home</a>
                  <a href="/dashboard" className="nav-link">Dashboard</a>
                  <a href="/explore" className="nav-link">Explore</a>
                  <a href="/calendar" className="nav-link">Calendar</a>
                  <a href="/profile" className="nav-link">Profile</a>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden nav-link p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.header>
        )}

        {/* Page Content */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="container mx-auto px-4"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Loading Indicator */}
        <AnimatePresence>
          {isNavigating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-500 to-primary-500 z-50"
              style={{
                background: 'linear-gradient(90deg, var(--sage-500), var(--primary-500))',
                animation: 'loading-bar 2s ease-in-out infinite'
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-20%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
};

export default PageLayout;
