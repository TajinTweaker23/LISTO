import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/layout.css"; // Import layout styles

// Enhanced Design System Imports
import { useToast } from "../../hooks/useToast";
import { useAchievements } from "../../hooks/useAchievements";
import { useSoundscape } from "../../hooks/useSoundscape";
import { useParallax } from "../../hooks/useParallax";
import { useFocusTimer } from "../../hooks/useFocusTimer";
import { ThemeProvider } from "../providers/ThemeProvider";

// UI Components
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import ShapeInsert from "./ShapeInsert";
import TableInsert from "./TableInsert";
import Mascot from "./Mascot";
import AchievementBadge from "./AchievementBadge";
import OnboardingModal from '../OnboardingModal';
import TabBar from "./TabBar";
import NotificationContainer, { useNotifications } from "./NotificationSystem";
import Sidebar from '../Sidebar';
import ActivismHub from '../ActivismHub';
import GreetingBar from './GreetingBar';
import CommandPalette from './CommandPalette';
import ActionButtons from './ActionButtons';
import QuickAddButton from './QuickAddButton';
import { useWhiteboard } from "../../context/WhiteboardContext";

export type LayoutProps = {
  children: ReactNode;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
};

// --- Enhanced Emoji Rain Component ---
function EmojiRain({ show }: { readonly show: boolean }) {
  const emojis = ["🎉", "✨", "🥳", "💡", "🚀", "🎈"];
  return (
    <AnimatePresence>
      {show &&
        Array.from({ length: 18 }, (_, i) => ({ id: `emoji-${i}`, index: i })).map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: "100vh", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2 + Math.random(),
              delay: Math.random() * 0.5,
            }}
            className="fixed left-0 pointer-events-none z-[99]"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${24 + Math.random() * 32}px`,
              top: 0,
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

// --- Enhanced Reading Ruler Component ---
function ReadingRuler({ enabled }: { readonly enabled: boolean }) {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => setY(e.clientY);
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);
  
  if (!enabled) return null;
  
  return (
    <div
      className="fixed left-0 w-full pointer-events-none z-[98] reading-ruler"
      style={{ top: y - 24 }}
    />
  );
}

// --- Error Boundary ---
class ErrorBoundary extends React.Component<
  { readonly children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // Log error for analytics/reporting if needed
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-2">🚨</div>
          <div className="text-2xl font-bold">Something went wrong.</div>
          <div className="text-gray-600">Try refreshing the page.</div>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * The `Layout` component serves as the main application wrapper for LISTO, providing global UI features,
 * accessibility enhancements, and interactive elements with an enhanced sage-themed design system.
 * 
 * Features include:
 * - Sage color palette with theme customization
 * - Enhanced toast notifications with TTS support
 * - Achievement system with persistence
 * - Ambient soundscapes with volume control
 * - Performance-optimized parallax effects
 * - Pomodoro focus timer with notifications
 * - Glass morphism UI elements
 * - Responsive design with mobile support
 *
 * @component
 * @param {LayoutProps} props - The props for the Layout component.
 * @param {React.ReactNode} props.children - The main content to be rendered within the layout.
 * @param {"light" | "dark"} props.theme - The current theme mode.
 * @param {(theme: "light" | "dark") => void} props.setTheme - Function to update the theme mode.
 */
const Layout: React.FC<LayoutProps> = ({ children, theme, setTheme }) => {
  const { notifications, removeNotification } = useNotifications();
  const { shapes, tables, handleInsertShape, handleInsertTable } = useWhiteboard();
  
  // Enhanced Design System Hooks
  const { addToast } = useToast();
  const { achievements } = useAchievements();
  // Remove unused variable assignments
  const { muted, toggleMute } = useSoundscape();
  const { parallax } = useParallax();
  const { isActive: isFocusTimerActive, progress: focusProgress, start: startFocusTimer } = useFocusTimer();

  // Local State (removed unused settings)
  const [focusMode, setFocusMode] = useState(false);
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [readingRuler, setReadingRuler] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // Mascot state
  const mascotRef = useRef<any>(null);
  const [mascotAction, setMascotAction] = useState<"idle" | "cheer" | "party">("idle");

  // Check for first-time user
  useEffect(() => {
    const hasOnboarded = localStorage.getItem('hasOnboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }

    // Listen for view change events from dashboard
    const handleViewChange = (event: CustomEvent) => {
      setCurrentView(event.detail);
    };

    window.addEventListener('changeView', handleViewChange as EventListener);
    
    return () => {
      window.removeEventListener('changeView', handleViewChange as EventListener);
    };
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasOnboarded', 'true');
  };

  // Enhanced trigger functions with new toast system
  const triggerEmojiRain = () => {
    setShowEmojiRain(true);
    setTimeout(() => setShowEmojiRain(false), 2200);
  };

  // Enhanced interaction handlers removed unused functions

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'activism') {
      return <ActivismHub theme={theme} />;
    }
    if (currentView === 'health') {
      return (
        <div className="p-6 bg-sage-50 rounded-lg">
          <h2 className="text-2xl font-bold text-sage-800 mb-4">Health Dashboard</h2>
          <p className="text-sage-600">Health tracking features coming soon...</p>
        </div>
      );
    }
    return children;
  };

  // Enhanced background gradient with sage theme
  const bgGradient = theme === "dark"
    ? "bg-gradient-to-br from-[#1a2318] via-[#2d3e2b] to-[#1e2b1c]"
    : "bg-gradient-to-br from-[#f0f4f0] via-[#e8f0e8] to-[#f5f8f5]";

  const glassCard = "backdrop-blur-2xl glass-card rounded-3xl shadow-xl border border-sage-light/20";

  return (
    <ThemeProvider>
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${bgGradient} font-mono relative overflow-x-hidden design-system-theme ${focusMode ? 'focus-blur-effect' : ''}`}
        aria-live="polite"
      >
        <link rel="stylesheet" href="/styles/design-system.css" />
        
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Effects & Global Elements - removed confetti */}
        <EmojiRain show={showEmojiRain} />
        
        {/* Enhanced Toast System - using context provider instead */}
        {/* Toast notifications are handled by ToastProvider in app context */}
        
        {/* Focus Timer Progress Bar */}
        {isFocusTimerActive && (
          <div className="fixed top-0 left-0 w-full z-[99]">
            <div
              className="focus-timer-progress"
              style={{ width: `${focusProgress}%` }}
            />
          </div>
        )}
        
        <ReadingRuler enabled={readingRuler} />
        <OnboardingModal onClose={handleCloseOnboarding} onComplete={(avatar, theme, music) => {
          handleCloseOnboarding();
        }} />

        {/* Achievement Display */}
        {Object.entries(achievements).map(([name, achievement]) => (
          <AchievementBadge
            key={name}
            name={achievement.name}
            description={achievement.description}
            icon={achievement.icon}
            show={achievement.unlocked}
          />
        ))}

        <GreetingBar greeting="Welcome to LISTO!" isOnline={true} />

        {/* Enhanced Mascot with better positioning */}
        <div className="fixed bottom-32 right-10 z-40 flex flex-col items-center">
          <Mascot ref={mascotRef} action={mascotAction} />
        </div>

        <Navbar theme={theme} setTheme={setTheme} onMenuClick={() => setSidebarOpen(true)} />

        {/* Enhanced Parallax Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <motion.div
            className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-gradient-to-br from-sage via-sage-light to-terracotta opacity-40 rounded-full blur-3xl animate-pulse"
            style={{ x: parallax.x, y: parallax.y }}
          />
          <motion.div
            className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-sage-light via-lavender to-sage opacity-30 rounded-full blur-3xl animate-pulse"
            style={{ x: -parallax.x, y: -parallax.y }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-gradient-to-br from-terracotta via-lavender to-sage-light opacity-20 rounded-full blur-2xl animate-spin-slow"
            style={{ x: parallax.x / 2, y: parallax.y / 2 }}
          />
        </div>

        <ThemeToggle theme={theme} setTheme={setTheme} />

        <ActionButtons
          onFocusClick={() => setFocusMode((f) => !f)}
          onCommandClick={() => setCommandOpen(true)}
          isFocusMode={focusMode}
        />

        <CommandPalette
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
          query=""
          setQuery={() => {}}
          actions={[
            { name: "Toggle Focus Mode", action: () => setFocusMode((f) => !f) },
            { name: "Insert Circle", action: () => handleInsertShape("circle") },
            { name: "Insert Square", action: () => handleInsertShape("square") },
            { name: "Insert Triangle", action: () => handleInsertShape("triangle") },
            { name: "Insert Table", action: () => handleInsertTable(2, 2) },
            { name: "Toggle Theme", action: () => setTheme(theme === "dark" ? "light" : "dark") },
            { name: "Open Settings", action: () => setShowSettings(true) },
            { name: "Party Mode", action: () => { setMascotAction("party"); triggerEmojiRain(); addToast("🎉 Party Mode!", 'info'); } },
            { name: "Start Focus Timer", action: () => startFocusTimer("focus") },
            { name: "Toggle Reading Ruler", action: () => setReadingRuler((r) => !r) },
            { name: muted ? "Unmute Soundscape" : "Mute Soundscape", action: () => toggleMute() },
          ]}
        />

        {/* Settings Panel - To be integrated */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="glass-card p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4 text-sage">Settings</h2>
              <p className="text-sage-dark mb-4">Settings panel integration coming soon!</p>
              <button 
                onClick={() => setShowSettings(false)}
                className="btn-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex-1 container mx-auto px-4 py-12 z-10 ${glassCard} mt-8`}
          style={{
            boxShadow: "0 8px 32px 0 rgba(95, 147, 95, 0.2), 0 0 40px 4px rgba(95, 147, 95, 0.1)",
          }}
        >
          <ErrorBoundary>
            <ShapeInsert onInsert={handleInsertShape} />
            <TableInsert onInsert={handleInsertTable} />
            
            {/* Enhanced Shape and Table Display */}
            <div className="my-6 flex gap-6 flex-wrap justify-center">
              <AnimatePresence>
                {shapes.map((shape, idx) => (
                  <motion.div
                    key={`shape-${idx}-${shape}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="transition-transform hover:scale-110"
                  >
                    {shape === "circle" && (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sage via-sage-light to-terracotta shadow-lg border-2 border-white/30" />
                    )}
                    {shape === "square" && (
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sage-light via-lavender to-terracotta shadow-lg border-2 border-white/30" />
                    )}
                    {shape === "triangle" && (
                      <div className="triangle-shape" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <AnimatePresence>
                {tables.map((table, idx) => (
                  <motion.table
                    key={`table-${idx}-${table.rows}x${table.cols}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="border-separate border-spacing-1 border border-sage/60 glass-table rounded-xl shadow-lg mx-4"
                    style={{ minWidth: 90 }}
                  >
                    <tbody>
                      {Array.from({ length: table.rows }).map((_, r) => (
                        <tr key={`table-${idx}-row-${r}`}>
                          {Array.from({ length: table.cols }).map((_, c) => (
                            <td
                              key={`table-${idx}-cell-${r}-${c}`}
                              className="border border-sage/40 w-10 h-10 rounded-lg bg-sage-light/20 shadow-inner"
                            ></td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </motion.table>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Conditional Content Rendering */}
            {renderContent()}
          </ErrorBoundary>
        </motion.main>

        <QuickAddButton onClick={() => addToast("Quick Add coming soon! ✨", 'info')} />

        {/* Enhanced Footer */}
        <footer className="glass-footer text-center p-3 text-xs text-sage-dark rounded-t-xl mt-4 shadow-inner transition-all duration-300 flex items-center justify-center gap-2 pb-20 md:pb-3">
          <span className="animate-pulse text-sage">✨</span>
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold tracking-wide">LISTO</span>
          </span>
          <span className="animate-pulse text-terracotta">✨</span>
        </footer>

        {/* Mobile Tab Bar */}
        <TabBar />

        {/* Enhanced Notification Container */}
        <NotificationContainer 
          notifications={notifications}
          onClose={removeNotification}
          position="top-right"
        />
        
        {/* Enhanced CSS Animations */}
        <style>{`
          .animate-spin-slow {
            animation: spin 2.5s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .animate-fab-pulse {
            animation: fabPulse 2.2s infinite alternate;
          }
          @keyframes fabPulse {
            0% { box-shadow: 0 0 0 0 var(--color-sage); }
            100% { box-shadow: 0 0 32px 8px var(--color-sage); }
          }
          .glass-table {
            background: rgba(95, 147, 95, 0.1);
            backdrop-filter: blur(10px);
          }
          .glass-footer {
            background: rgba(240, 244, 240, 0.8);
            backdrop-filter: blur(20px);
          }
          .design-system-theme {
            --color-sage: #5f935f;
            --color-sage-light: #8fb48f;
            --color-sage-dark: #4a7a4a;
            --color-terracotta: #d7581c;
            --color-lavender: #a68cff;
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
