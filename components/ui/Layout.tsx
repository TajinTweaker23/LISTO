import { Roboto_Mono } from "next/font/google";
import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import Confetti from "react-confetti";
import { Dialog, Combobox } from "@headlessui/react";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import CustomizationPanel from "./CustomizationPanel";
import ShapeInsert from "./ShapeInsert";
import TableInsert from "./TableInsert";
import { Howl } from "howler";
import Mascot from "./Mascot";
import AchievementBadge from "./AchievementBadge";
import OnboardingModal from './OnboardingModal';
import TabBar from "./TabBar";
import NotificationContainer, { useNotifications } from "./NotificationSystem";

// --- Font ---
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "400" });

// --- Soundscapes ---
const soundscapes = [
  { label: "None", file: "" },
  { label: "Rain", file: "/sounds/rain.mp3" },
  { label: "Café", file: "/sounds/cafe.mp3" },
  { label: "Forest", file: "/sounds/forest.mp3" },
];

export type LayoutProps = {
  children: ReactNode;
  theme: string;
  setTheme: (theme: string) => void;
};

// --- Toast ---
function Toast({ message, show }: { readonly message: string; readonly show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg z-[100] font-semibold text-sm"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Emoji Rain ---
function EmojiRain({ show }: { readonly show: boolean }) {
  const emojis = ["🎉", "✨", "🥳", "💡", "🚀", "🎈"];
  return (
    <AnimatePresence>
      {show &&
        Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
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

// --- Focus Timer ---
function FocusTimer({ show, onEnd }: { readonly show: boolean; readonly onEnd: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!show) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          onEnd();
          return 100;
        }
        return p + 0.5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [show, onEnd]);
  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 w-full z-[99]">
      <div
        className="h-2 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 rounded-b-full shadow-lg transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// --- Reading Ruler ---
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
      className="fixed left-0 w-full pointer-events-none z-[98]"
      style={{
        top: y - 24,
        height: 48,
        background: "rgba(255,255,0,0.13)",
        borderTop: "1.5px solid #ffe066",
        borderBottom: "1.5px solid #ffe066",
        transition: "top 0.1s",
      }}
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
 * accessibility enhancements, and interactive elements. It manages theme switching, focus mode, onboarding,
 * achievement badges, ambient soundscapes, command palette, settings, and visual effects such as confetti,
 * emoji rain, and animated backgrounds.
 *
 * @component
 * @param {LayoutProps} props - The props for the Layout component.
 * @param {React.ReactNode} props.children - The main content to be rendered within the layout.
 * @param {"light" | "dark"} props.theme - The current theme mode.
 * @param {(theme: "light" | "dark") => void} props.setTheme - Function to update the theme mode.
 *
 * @remarks
 * - Handles onboarding flow and achievement unlocking.
 * - Provides accessibility features such as text-to-speech, high contrast, and assistive modes.
 * - Integrates ambient soundscapes and theme scheduling.
 * - Includes animated UI elements and interactive feedback (confetti, emoji rain, toast notifications).
 * - Supports keyboard shortcuts for command palette and theme toggling.
 *
 * @example
 * ```tsx
 * <Layout theme={theme} setTheme={setTheme}>
 *   <YourAppContent />
 * </Layout>
 * ```
 */
const Layout: React.FC<LayoutProps> = ({ children, theme, setTheme }) => {
  const { notifications, removeNotification } = useNotifications();
  const [settings, setSettings] = useState({
    fontFamily: "Space Grotesk, sans-serif",
    fontColor: "#e4e6fb",
    bgColor: "#1a1b23",
    fontSize: 17,
    musicUrl: "",
    textToSpeech: false,
    highContrast: false,
    deafMode: false,
    blindMode: false,
  });
  const [shapes, setShapes] = useState<string[]>([]);
  const [tables, setTables] = useState<{ rows: number; cols: number }[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  const [soundscape, setSoundscape] = useState(soundscapes[0].file);
  const [sound, setSound] = useState<Howl | null>(null);
  const [showFocusTimer, setShowFocusTimer] = useState(false);
  const [readingRuler, setReadingRuler] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [showNetworkToast, setShowNetworkToast] = useState(false);
  const [muted, setMuted] = useState(false);
  const [achievements, setAchievements] = useState<{ [key: string]: boolean }>({});
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('hasOnboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasOnboarded', 'true');
  };

  const unlockAchievement = (name: string, description: string, icon: string) => {
    if (!achievements[name]) {
      setAchievements(prev => ({ ...prev, [name]: true }));
      // Show badge
    }
  };

  // Mascot
  const mascotRef = useRef<any>(null);
  const [mascotAction, setMascotAction] = useState<"idle" | "cheer" | "party">(
    "idle"
  );

  // Greeting
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "Welcome";
    if (hour < 5) greetingText = "Burning the midnight oil?";
    else if (hour < 12) greetingText = "Good morning";
    else if (hour < 18) greetingText = "Good afternoon";
    else greetingText = "Good evening";
    setGreeting(greetingText);
  }, []);

  // --- Error handling for children (now covered by ErrorBoundary) ---

  // Confetti/Toast/Emoji triggers
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };
  const triggerToast = (message: string) => {
    if (settings.textToSpeech) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: "", show: false }), 1800);
  };
  const triggerEmojiRain = () => {
    setShowEmojiRain(true);
    setTimeout(() => setShowEmojiRain(false), 2200);
  };
  const handleInsertShape = (shape: string) => {
    setShapes([...shapes, shape]);
    triggerConfetti();
    triggerToast(`Shape "${shape}" added!`);
    setMascotAction("cheer");
    if ((shapes.length + 1) % 5 === 0) {
      triggerEmojiRain();
      unlockAchievement("Shape Enthusiast", "You added 5 shapes!", "🎨");
    }
  };
  const handleInsertTable = (rows: number, cols: number) => {
    setTables([...tables, { rows, cols }]);
    triggerConfetti();
    triggerToast(`Table ${rows}x${cols} added!`);
    setMascotAction("cheer");
    if ((tables.length + 1) % 3 === 0) {
       unlockAchievement("Table Master", "You added 3 tables!", "📊");
    }
    if ((tables.length + 1) % 5 === 0) triggerEmojiRain();
  };

  // Command Palette actions
  const actions = [
    { name: "Toggle Focus Mode", action: () => setFocusMode((f) => !f) },
    { name: "Insert Circle", action: () => handleInsertShape("circle") },
    { name: "Insert Square", action: () => handleInsertShape("square") },
    { name: "Insert Triangle", action: () => handleInsertShape("triangle") },
    { name: "Insert Table", action: () => handleInsertTable(2, 2) },
    {
      name: "Toggle Theme",
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
    { name: "Open Settings", action: () => setShowSettings(true) },
    {
      name: "Party Mode",
      action: () => {
        setMascotAction("party");
        triggerEmojiRain();
        triggerToast("🎉 Party Mode!");
      },
    },
    { name: "Start Focus Timer", action: () => setShowFocusTimer(true) },
    { name: "Toggle Reading Ruler", action: () => setReadingRuler((r) => !r) },
    {
      name: muted ? "Unmute Soundscape" : "Mute Soundscape",
      action: () => setMuted((m) => !m),
    },
  ];
  const [query, setQuery] = useState("");
  const filteredActions = actions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  // Theme scheduler
  useEffect(() => {
    const schedule = JSON.parse(localStorage.getItem("themeSchedule") || "{}");
    if (schedule.enabled) {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= schedule.nightStart || hour < schedule.dayStart)
        setTheme("dark");
      else setTheme("light");
    }
  }, [setTheme]);

  // Soundscape
  useEffect(() => {
    if (sound) {
      sound.stop();
      setSound(null);
    }
    if (soundscape && !muted) {
      try {
        const newSound = new Howl({
          src: [soundscape],
          loop: true,
          volume: 0.3,
        });
        newSound.play();
        setSound(newSound);
      } catch (err) {
        triggerToast("Couldn't load soundscape.");
      }
    }
    return () => {
      if (sound) sound.stop();
    };
    // eslint-disable-next-line
  }, [soundscape, muted]);

  // Parallax
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Command palette shortcut and theme toggle shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (e.key.toLowerCase() === "t" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [theme, setTheme]);

  // Focus timer finish
  const handleFocusTimerEnd = () => {
    setShowFocusTimer(false);
    triggerToast("Focus session complete!");
    setMascotAction("cheer");
    triggerEmojiRain();
  };

  // Online/offline
  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      setShowNetworkToast(true);
      setTimeout(() => setShowNetworkToast(false), 1200);
    };
    const goOffline = () => {
      setIsOnline(false);
      setShowNetworkToast(true);
      setTimeout(() => setShowNetworkToast(false), 1200);
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // Idle detection for focus reminder
  useEffect(() => {
    let idleTimeout: any = null;
    const resetIdle = () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (!focusMode) triggerToast("Take a stretch break?");
      }, 10 * 60 * 1000); // 10 minutes idle
    };
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keydown", resetIdle);
    resetIdle();
    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, [focusMode]);

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-[#171824] via-[#24305e] to-[#0f2027]"
      : "bg-gradient-to-br from-[#e0eafc] via-[#cfdef3] to-[#f8f9f3]";

  const glassCard =
    "backdrop-blur-2xl bg-white/10 dark:bg-[#232946]/60 rounded-[2.5rem] shadow-2xl border border-cyan-400/20 dark:border-fuchsia-400/30 ring-2 ring-blue-400/20 dark:ring-pink-400/10";

  return (
    <div
      className={`flex flex-col min-h-screen transition-all duration-300 ${bgGradient} ${robotoMono.className} relative overflow-x-hidden`}
      style={
        focusMode
          ? { filter: "blur(2.5px) brightness(0.6) grayscale(0.3)" }
          : {}
      }
      aria-live="polite"
    >
      {/* Confetti/Emoji/Toast */}
      {showConfetti && typeof window !== "undefined" && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <EmojiRain show={showEmojiRain} />
      <Toast message={toast.message} show={toast.show} />
      <FocusTimer show={showFocusTimer} onEnd={handleFocusTimerEnd} />
      <ReadingRuler enabled={readingRuler} />

      <OnboardingModal show={showOnboarding} onClose={handleCloseOnboarding} />

      {/* Network Status Toast */}
      <Toast
        message={isOnline ? "Back online!" : "You're offline."}
        show={showNetworkToast}
      />

      {/* Achievement Badges */}
      <AchievementBadge
        name="Shape Enthusiast"
        description="You added 5 shapes!"
        icon="🎨"
        show={achievements["Shape Enthusiast"]}
      />
      <AchievementBadge
        name="Table Master"
        description="You added 3 tables!"
        icon="📊"
        show={achievements["Table Master"]}
      />

      {/* Greeting Bar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-40 mt-4 flex items-center gap-3 bg-white/70 dark:bg-black/60 px-6 py-2 rounded-full shadow-lg border border-blue-400/10 text-lg font-bold text-gray-700 dark:text-gray-100 backdrop-blur-lg animate-fade-in">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='0' y='24' font-size='24'%3E%F0%9F%91%8B%3C/text%3E%3C/svg%3E"
          alt="Waving hand emoji"
          style={{ width: "2em", height: "2em", display: "inline" }}
        />
        {greeting}, <span className="text-blue-500">LISTO User!</span>
        {!isOnline && (
          <span className="ml-2 text-red-600 text-base">[Offline]</span>
        )}
      </div>

      {/* Mascot */}
      <div className="fixed bottom-32 right-10 z-40 flex flex-col items-center">
        <Mascot ref={mascotRef} action={mascotAction} />
      </div>

      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div
          className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-gradient-to-br from-indigo-500 via-purple-700 to-pink-500 opacity-40 rounded-full blur-3xl animate-pulse"
          style={{ x: parallax.x, y: parallax.y }}
        />
        <motion.div
          className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-cyan-300 via-teal-300 to-blue-600 opacity-30 rounded-full blur-3xl animate-pulse"
          style={{ x: -parallax.x, y: -parallax.y }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-gradient-to-br from-pink-400 via-fuchsia-600 to-sky-400 opacity-20 rounded-full blur-2xl animate-spin-slow"
          style={{ x: parallax.x / 2, y: parallax.y / 2 }}
        />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle theme={theme} setTheme={setTheme} />

      {/* Focus Mode Button */}
      <button
        onClick={() => setFocusMode((f) => !f)}
        className="fixed top-8 left-8 z-30 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold shadow-lg hover:scale-105 focus:outline-none transition group"
        aria-label="Toggle Focus Mode"
      >
        <span className="mr-2">🧘</span>
        {focusMode ? "Exit Focus Mode" : "Focus Mode"}
        <span className="ml-2 text-xs opacity-60 group-hover:opacity-100 transition">
          [F]
        </span>
      </button>

      {/* Command Palette Button */}
      <button
        onClick={() => setCommandOpen(true)}
        className="fixed top-8 right-8 z-30 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 focus:outline-none transition group"
        aria-label="Open Command Palette"
      >
        ⌨️ Command Palette
        <span className="ml-2 text-xs opacity-60 group-hover:opacity-100 transition">
          [Ctrl+K]
        </span>
      </button>
      <Dialog
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="relative bg-white dark:bg-[#1a1b23] rounded-2xl shadow-2xl p-7 w-full max-w-xl mx-auto border border-sky-400/20">
          <Combobox
            value={null}
            onChange={(a) => {
              a.action();
              setCommandOpen(false);
            }}
          >
            <Combobox.Input
              className="w-full p-3 border-none rounded-xl mb-4 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-800 dark:text-gray-100 outline-none text-lg"
              placeholder="Type a command..."
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Combobox.Options className="max-h-60 overflow-auto">
              {filteredActions.map((a, idx) => (
                <Combobox.Option
                  key={`action-${a.name}`}
                  value={a}
                  className="p-3 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900 cursor-pointer transition"
                >
                  {a.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </div>
      </Dialog>

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings((s) => !s)}
        className="fixed bottom-10 left-10 p-5 bg-gradient-to-br from-gray-200 via-blue-200 to-pink-200 dark:from-gray-800 dark:via-blue-900 dark:to-pink-900 text-blue-700 dark:text-pink-200 rounded-full shadow-xl hover:scale-110 hover:shadow-pink-500/60 transition-all duration-300 border-4 border-white/20 z-20 ring-4 ring-blue-400/10 focus:outline-none group"
        aria-label="Open Settings"
        tabIndex={0}
      >
        <span className="animate-spin-slow text-2xl">⚙️</span>
        <span className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow pointer-events-none z-10 transition">
          Settings
        </span>
      </button>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <div
              className="bg-white dark:bg-[#232946] rounded-2xl shadow-2xl p-8 border border-blue-400/20"
              onClick={(e) => e.stopPropagation()}
            >
              <CustomizationPanel settings={settings} onChange={setSettings} />
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Ambient Soundscape
                </label>
                <select
                  value={soundscape}
                  onChange={(e) => setSoundscape(e.target.value)}
                  className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 transition"
                >
                  {soundscapes.map((s) => (
                    <option key={s.file} value={s.file}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button
                  className="mt-2 px-3 py-1 rounded bg-pink-500 text-white"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute Soundscape" : "Mute Soundscape"}
                >
                  {muted ? "Unmute" : "Mute"}
                </button>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Theme Scheduler
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="theme-scheduler"
                    onChange={(e) => {
                      const enabled = e.target.checked;
                      const dayStart = parseInt(
                        prompt("Day mode starts at hour (0-23)?", "7") || "7",
                        10
                      );
                      const nightStart = parseInt(
                        prompt("Night mode starts at hour (0-23)?", "19") ||
                          "19",
                        10
                      );
                      localStorage.setItem(
                        "themeSchedule",
                        JSON.stringify({ enabled, dayStart, nightStart })
                      );
                    }}
                  />
                  <label htmlFor="theme-scheduler" className="text-xs">
                    Enable automatic theme switching
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex-1 container mx-auto px-4 py-12 z-10 ${glassCard} shadow-neon`}
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 40px 4px #a21caf33, 0 0 60px 8px #0ff1ce22",
          border: "1.5px solid rgba(255,255,255,0.18)",
        }}
      >
        <ErrorBoundary>
          <ShapeInsert onInsert={handleInsertShape} />
          <TableInsert onInsert={handleInsertTable} />
          <div className="my-6 flex gap-6 flex-wrap justify-center">
            <AnimatePresence>
              {shapes.map((shape, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="transition-transform hover:scale-110"
                >
                  {shape === "circle" && (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-fuchsia-500 to-cyan-400 shadow-lg border-2 border-white/30" />
                  )}
                  {shape === "square" && (
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 via-blue-400 to-pink-400 shadow-lg border-2 border-white/30" />
                  )}
                  {shape === "triangle" && (
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "40px solid transparent",
                        borderRight: "40px solid transparent",
                        borderBottom: "70px solid #facc15",
                        filter: "drop-shadow(0 0 16px #facc15cc)",
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {tables.map((table, idx) => (
                <motion.table
                  key={idx}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="border-separate border-spacing-1 border border-sky-400/60 bg-white/30 dark:bg-[#232946]/40 rounded-xl shadow-lg mx-4 animate-fade-in"
                  style={{ minWidth: 90 }}
                >
                  <tbody>
                    {Array.from({ length: table.rows }).map((_, r) => (
                      <tr key={r}>
                        {Array.from({ length: table.cols }).map((_, c) => (
                          <td
                            key={`cell-${idx}-${r}-${c}`}
                            className="border border-sky-400/40 w-10 h-10 rounded-lg bg-white/60 dark:bg-[#2d2f4a]/60 shadow-inner"
                          ></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
              ))}
            </AnimatePresence>
          </div>
          {children}
        </ErrorBoundary>
      </motion.main>

      {/* Quick Add Floating Action Button */}
      <motion.button
        type="button"
        className="fixed bottom-10 right-10 p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-500/60 transition-all duration-300 border-4 border-white/20 z-20 ring-4 ring-pink-400/30 focus:outline-none focus:ring-8 focus:ring-blue-400/40 animate-fab-pulse"
        aria-label="Add"
        tabIndex={0}
        whileHover={{ scale: 1.13, boxShadow: "0 0 32px #f472b6" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => triggerToast("Quick Add coming soon!")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 drop-shadow-neon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow pointer-events-none z-10 transition">
          Quick Add
        </span>
      </motion.button>

      {/* Footer */}
      <footer className="bg-white/40 dark:bg-black/30 text-center p-3 text-xs text-slate-500 rounded-t-xl mt-4 shadow-inner hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100 dark:hover:from-gray-800 dark:hover:to-pink-900 transition-all duration-300 flex items-center justify-center gap-2 pb-20 md:pb-3">
        <span className="animate-pulse text-blue-400">✨</span>
        <span>
          © {new Date().getFullYear()}{" "}
          <span className="font-bold tracking-wide">LISTO</span>
        </span>
        <span className="animate-pulse text-pink-400">✨</span>
      </footer>

      {/* Mobile Tab Bar */}
      <TabBar />

      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications}
        onClose={removeNotification}
        position="top-right"
      />
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
          0% { box-shadow: 0 0 0 0 #f472b6; }
          100% { box-shadow: 0 0 32px 8px #f472b6; }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Layout;

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly currentView: string;
  readonly onViewChange: (view: string) => void;
}

interface HeaderProps {
  readonly onMenuClick: () => void;
}
