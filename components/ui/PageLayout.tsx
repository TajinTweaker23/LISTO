// components/ui/PageLayout.tsx - ULTRA-ENHANCED VERSION
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  ArrowLeft, 
  Home, 
  BarChart3, 
  Search, 
  Calendar, 
  User, 
  Menu, 
  X, 
  Sparkles,
  Zap,
  Moon,
  Sun,
  Bell,
  Settings,
  ChevronDown,
  Palette,
  Eye,
  Layers
} from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  hideNavigation?: boolean;
  className?: string;
  showBackButton?: boolean;
  backgroundPattern?: 'mesh' | 'dots' | 'grid' | 'waves' | 'aurora' | 'particles' | 'geometric' | 'none';
  glassEffect?: boolean;
  animatedBackground?: boolean;
  parallaxElements?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

// Advanced background patterns with CSS-in-JS for performance
const backgroundPatterns = {
  mesh: {
    background: `
      radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.3) 0px, transparent 0%),
      radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.3) 0px, transparent 50%),
      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.3) 0px, transparent 50%),
      radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.3) 0px, transparent 50%),
      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.3) 0px, transparent 50%),
      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.3) 0px, transparent 50%),
      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.3) 0px, transparent 50%)
    `,
    filter: 'blur(100px) saturate(150%)'
  },
  dots: {
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
    backgroundSize: '24px 24px'
  },
  grid: {
    background: `
      linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px'
  },
  waves: {
    background: `
      linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.1) 30%, rgba(99, 102, 241, 0.1) 70%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(168, 85, 247, 0.1) 30%, rgba(168, 85, 247, 0.1) 70%, transparent 70%)
    `,
    backgroundSize: '60px 60px'
  },
  aurora: {
    background: `
      linear-gradient(118deg, rgb(168, 85, 247) 0%, rgb(99, 102, 241) 50%, rgb(59, 130, 246) 100%),
      radial-gradient(90% 100% at 50% 0%, rgba(120, 119, 198, 0.3) 0%, rgba(255, 255, 255, 0) 100%)
    `,
    filter: 'blur(40px) saturate(200%) opacity(0.1)'
  },
  particles: {
    background: `
      radial-gradient(2px 2px at 20px 30px, rgba(99, 102, 241, 0.3), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(168, 85, 247, 0.3), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(59, 130, 246, 0.3), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(34, 197, 94, 0.3), transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(239, 68, 68, 0.3), transparent)
    `,
    backgroundSize: '200px 100px',
    animation: 'particle-float 20s linear infinite'
  },
  geometric: {
    background: `
      conic-gradient(at 50% 50%, rgba(99, 102, 241, 0.1) 0deg, transparent 60deg, rgba(168, 85, 247, 0.1) 120deg, transparent 180deg, rgba(59, 130, 246, 0.1) 240deg, transparent 300deg, rgba(99, 102, 241, 0.1) 360deg)
    `,
    backgroundSize: '400px 400px'
  },
  none: { background: 'transparent' }
};

// Floating elements for parallax
const FloatingElements: React.FC<{ pattern: string }> = ({ pattern }) => {
  const elements = [
    { size: 'w-64 h-64', color: 'bg-gradient-to-r from-blue-400/10 to-purple-400/10', delay: 0 },
    { size: 'w-32 h-32', color: 'bg-gradient-to-r from-pink-400/10 to-red-400/10', delay: 2 },
    { size: 'w-48 h-48', color: 'bg-gradient-to-r from-green-400/10 to-teal-400/10', delay: 4 },
    { size: 'w-40 h-40', color: 'bg-gradient-to-r from-yellow-400/10 to-orange-400/10', delay: 6 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el, idx) => (
        <motion.div
          key={idx}
          className={`absolute rounded-full blur-xl ${el.size} ${el.color}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -100, 0, 100, 0],
            scale: [1, 1.2, 1, 0.8, 1],
            opacity: [0.3, 0.6, 0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 20 + el.delay,
            repeat: Infinity,
            ease: "linear",
            delay: el.delay,
          }}
        />
      ))}
    </div>
  );
};

// Advanced Glassmorphism Navigation
const GlassNavigation: React.FC<{
  title: string;
  showBackButton: boolean;
  handleBack: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  theme: string;
  toggleTheme: () => void;
}> = ({ title, showBackButton, handleBack, mobileMenuOpen, setMobileMenuOpen, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  const navigationItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: Calendar, label: 'Calendar', href: '/calendar' },
    { icon: User, label: 'Profile', href: '/profile' }
  ];

  return (
    <motion.header
      style={{ y: headerY, opacity: headerOpacity }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-900/5' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {showBackButton && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={handleBack}
                  className="group p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
            
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {title}
                </h1>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-2 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 dark:border-gray-700/50">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
                <motion.div
                  className="absolute inset-0 bg-white/80 dark:bg-gray-700/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"
                  layoutId="nav-hover"
                />
              </motion.a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse" />
            </motion.button>

            {/* Settings */}
            <motion.button
              className="p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/10"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-4">
              <nav className="space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Enhanced Loading Animation
const EnhancedLoader: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed top-0 left-0 right-0 z-50"
  >
    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: [-100, 400] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);

// Theme Toggle Button Component
const ThemeVisualizer: React.FC<{ currentTheme: string }> = ({ currentTheme }) => (
  <div className="fixed bottom-6 right-6 z-40">
    <motion.div
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-900/10"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center gap-3">
        <Palette className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </motion.div>
  </div>
);

// MAIN COMPONENT
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title = 'LISTO',
  description = 'Your productivity companion',
  hideNavigation = false,
  className = '',
  showBackButton = false,
  backgroundPattern = 'mesh',
  glassEffect = true,
  animatedBackground = true,
  parallaxElements = true,
  theme: initialTheme = 'auto'
}) => {
  const router = useRouter();
  const { navigateWithFeedback, isNavigating } = useEnhancedNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Handle theme
  useEffect(() => {
    setMounted(true);
    if (initialTheme === 'auto') {
      const stored = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setTheme(stored as 'light' | 'dark' | 'auto');
    }
  }, [initialTheme]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (parallaxElements) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [parallaxElements, mouseX, mouseY]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      navigateWithFeedback('/');
    }
  };

  const pageTitle = title === 'LISTO' ? title : `${title} | LISTO`;

  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -20, scale: 1.02 }
  };

  const pageTransition = {
    type: 'spring' as const,
    damping: 25,
    stiffness: 500,
    duration: 0.4
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme === 'dark' ? '#111827' : '#ffffff'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        className={`page-wrapper min-h-screen transition-colors duration-500 ${
          glassEffect ? 'backdrop-blur-sm' : ''
        } ${className}`}
        style={backgroundPatterns[backgroundPattern]}
      >
        {/* Animated Background Elements */}
        {animatedBackground && parallaxElements && (
          <FloatingElements pattern={backgroundPattern} />
        )}

        {/* Mouse Follower Effect */}
        {parallaxElements && (
          <motion.div
            className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
            style={{
              x: mouseXSpring,
              y: mouseYSpring,
              translateX: '-50%',
              translateY: '-50%'
            }}
          >
            <div className="w-full h-full bg-white rounded-full opacity-50" />
          </motion.div>
        )}

        {/* Navigation */}
        {!hideNavigation && (
          <GlassNavigation
            title={title}
            showBackButton={showBackButton}
            handleBack={handleBack}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            theme={theme}
            toggleTheme={toggleTheme}
          />
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
              className="container mx-auto px-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Enhanced Loading Indicator */}
        <AnimatePresence>
          {isNavigating && <EnhancedLoader />}
        </AnimatePresence>

        {/* Theme Visualizer */}
        <ThemeVisualizer currentTheme={theme} />

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes particle-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-30px) rotate(120deg); }
            66% { transform: translateY(-60px) rotate(240deg); }
          }
          
          .page-wrapper {
            background-attachment: fixed;
            background-repeat: no-repeat;
            background-size: cover;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #6366f1, #a855f7);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #4f46e5, #9333ea);
          }
          
          /* Dark mode scrollbar */
          .dark ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          
          /* Selection styling */
          ::selection {
            background: linear-gradient(45deg, #6366f1, #a855f7);
            color: white;
          }
          
          /* Focus styles */
          .focus-visible {
            outline: 2px solid #6366f1;
            outline-offset: 2px;
          }
        `}</style>
      </div>
    </>
  );
};

export default PageLayout;