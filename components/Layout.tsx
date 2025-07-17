import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAvatarSVG } from "../components/AvatarPicker";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/explore", label: "Explore", icon: "🧭" },
  { href: "/calendar", label: "Calendar", icon: "📅" },
  { href: "/vision-board", label: "Vision Board", icon: "🌈" },
];

function getInitials(name: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    setUserName(localStorage.getItem("listoUserName"));
    const stored = localStorage.getItem("listoAvatar");
    setAvatar(stored ? JSON.parse(stored) : null);
    // Theme from localStorage
    const storedTheme = localStorage.getItem("listoTheme");
    if (storedTheme === "light" || storedTheme === "dark")
      setTheme(storedTheme);
  }, []);

  // Example: Show a toast when userName is set
  useEffect(() => {
    if (userName) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [userName]);

  // Theme switcher
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("listoTheme", theme);
  }, [theme]);

  // Animation variants
  const logoVariants = {
    initial: { scale: 0.9, rotate: -8, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { type: "spring" as const, duration: 0.8 },
    },
  };
  const navLinkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.07,
        type: "spring" as const,
        stiffness: 300,
      },
    }),
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700"
          : "bg-gradient-to-br from-blue-100 via-white to-teal-100"
      }`}
    >
      {/* Animated, glassy SVG blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <svg viewBox="0 0 400 400" fill="none">
          <ellipse
            cx="200"
            cy="200"
            rx="180"
            ry="120"
            fill={theme === "dark" ? "#38bdf8" : "#a5b4fc"}
            fillOpacity="0.5"
            filter="url(#blur1)"
          />
          <filter id="blur1">
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </svg>
      </motion.div>
      <motion.div
        className="absolute -bottom-32 right-0 w-96 h-96 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <svg viewBox="0 0 400 400" fill="none">
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="100"
            fill={theme === "dark" ? "#fbbf24" : "#f472b6"}
            fillOpacity="0.5"
            filter="url(#blur2)"
          />
          <filter id="blur2">
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </svg>
      </motion.div>

      {/* Kawaii Floating Stars & Blobs */}
      <motion.div
        className="absolute top-10 right-10 w-16 h-16 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
        animate={{ opacity: 0.4, scale: 1, rotate: 10 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg viewBox="0 0 64 64" fill="none">
          <path
            d="M32 4 L39 24 H60 L42 38 L49 58 L32 46 L15 58 L22 38 L4 24 H25 Z"
            fill="#fbbf24"
            opacity="0.7"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 w-12 h-12 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
        animate={{ opacity: 0.3, scale: 1, rotate: -10 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#a5b4fc" opacity="0.6" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 w-10 h-10 z-0 pointer-events-none"
        style={{ translate: "-50% -50%" }}
        initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
        animate={{ opacity: 0.25, scale: 1, rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 64 64" fill="none">
          <ellipse
            cx="32"
            cy="32"
            rx="24"
            ry="12"
            fill="#f472b6"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* Animated Header */}
      <motion.header
        className={`sticky top-0 z-30 bg-white/30 dark:bg-blue-900/80 backdrop-blur-md text-blue-900 dark:text-white p-4 flex items-center justify-between shadow transition-shadow ${
          scrolled ? "shadow-lg" : ""
        }`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <motion.div
          className="flex items-center gap-3"
          variants={logoVariants}
          initial="initial"
          animate="animate"
        >
          {/* Animated Logo with Sparkle */}
          <motion.span
            className="bg-yellow-400 text-blue-900 font-extrabold rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-neon ring-4 ring-yellow-300 animate-pulse relative"
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            L{/* Sparkle */}
            <motion.span
              className="absolute -top-2 -right-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 0 L10.5 7.5 L18 9 L10.5 10.5 L9 18 L7.5 10.5 L0 9 L7.5 7.5 Z"
                  fill="#fbbf24"
                />
              </svg>
            </motion.span>
          </motion.span>
          <span
            className="font-bold text-2xl tracking-tight drop-shadow-lg"
            style={{ fontFamily: "'Quicksand', 'Baloo 2', sans-serif" }}
          >
            LISTO
          </span>
          <span className="ml-2 text-sm text-teal-700 dark:text-teal-200 italic hidden sm:inline">
            Dream. Do. Dominate.
          </span>
          {/* Kawaii badge */}
          <motion.span
            className="ml-2 px-2 py-0.5 rounded-full bg-pink-200 text-pink-700 text-xs font-bold shadow hidden sm:inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            ✨ New!
          </motion.span>
        </motion.div>
        {/* Desktop Nav */}
        <nav className="space-x-2 hidden md:block" aria-label="Main navigation">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              custom={i}
              variants={navLinkVariants}
              initial="initial"
              animate="animate"
              className="inline-block"
            >
              <Link
                href={link.href}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  router.pathname === link.href
                    ? "bg-yellow-400 text-blue-900 font-bold shadow"
                    : "hover:bg-blue-800/80 hover:text-yellow-300 dark:hover:bg-blue-700/80"
                }`}
                tabIndex={0}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        {/* Theme Switcher */}
        <button
          className="mx-2 p-2 rounded-full bg-white/60 dark:bg-blue-800/80 shadow hover:scale-110 transition"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
        {/* User Avatar with Glow & Status */}
        <motion.div
          className="ml-2 relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-yellow-400 shadow-lg hover:shadow-yellow-300/80 hover:scale-105 transition cursor-pointer ring-2 ring-yellow-200 relative"
            title={userName ? `Logged in as ${userName}` : "Guest"}
            style={{
              boxShadow:
                theme === "dark"
                  ? "0 0 0 4px #38bdf8, 0 2px 8px #0002"
                  : "0 0 0 4px #fbbf24, 0 2px 8px #0001",
            }}
          >
            {getAvatarSVG(avatar)}
            {/* Animated Online status dot */}
            <motion.span
              className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
            {userName ? userName : "Guest"}
          </div>
        </motion.div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-2"
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="absolute top-16 right-4 bg-white/90 dark:bg-blue-900/95 rounded shadow-lg py-2 px-4 flex flex-col space-y-2 md:hidden animate-fade-in-scale"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    router.pathname === link.href
                      ? "bg-yellow-400 text-blue-900 font-bold"
                      : "hover:bg-blue-800/80 hover:text-yellow-300 dark:hover:bg-blue-700/80"
                  }`}
                  tabIndex={0}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-20 right-4 z-50 animate-fade-in-scale bg-yellow-400 text-blue-900 px-4 py-2 rounded shadow-lg font-semibold"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4 }}
          >
            Welcome{userName ? `, ${userName}` : ""}!
          </motion.div>
        )}
      </AnimatePresence>
      {/* Glassmorphism Card for Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-6 py-6 z-10">
        <div className="rounded-3xl bg-white/60 dark:bg-blue-900/60 shadow-xl p-6 backdrop-blur-md border border-blue-100 dark:border-blue-800">
          {children}
        </div>
      </main>
      {/* Animated Footer with SVG Wave and Extra Layer */}
      <footer className="relative bg-white/30 dark:bg-blue-900/80 backdrop-blur-md text-center p-2 text-xs text-gray-700 dark:text-gray-300 overflow-hidden">
        {/* Main Wave */}
        <motion.svg
          className="absolute left-0 bottom-full w-full h-8"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.path
            d="M0 40 Q 360 80 720 40 T 1440 40 V80H0V40Z"
            fill={theme === "dark" ? "#38bdf8" : "#a5b4fc"}
            animate={{
              d: [
                "M0 40 Q 360 80 720 40 T 1440 40 V80H0V40Z",
                "M0 30 Q 360 60 720 30 T 1440 30 V80H0V30Z",
                "M0 40 Q 360 80 720 40 T 1440 40 V80H0V40Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
        {/* Extra lighter wave for depth */}
        <motion.svg
          className="absolute left-0 bottom-[calc(100%-8px)] w-full h-8"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <motion.path
            d="M0 50 Q 360 90 720 50 T 1440 50 V80H0V50Z"
            fill={theme === "dark" ? "#fbbf24" : "#f472b6"}
            opacity="0.3"
            animate={{
              d: [
                "M0 50 Q 360 90 720 50 T 1440 50 V80H0V50Z",
                "M0 40 Q 360 70 720 40 T 1440 40 V80H0V40Z",
                "M0 50 Q 360 90 720 50 T 1440 50 V80H0V50Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
        <span className="relative z-10">
          © {new Date().getFullYear()} LISTO &mdash; Dream. Do. Dominate.
        </span>
      </footer>
    </div>
  );
}

/* Import Google Fonts in your global CSS file (e.g., styles/globals.css) */

/* Example for app/layout.tsx */
export const metadata = {
  icons: {
    icon: "/favicon.png",
  },
};
