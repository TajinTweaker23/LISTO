import Link from "next/link";
import { useRouter } from "next/router";
import {
  Home as HomeIcon,
  User as UserIcon,
  LogOut,
  LayoutGrid,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1️⃣ Accept color props with nice defaults
export default function Navbar({
  theme,
  setTheme,
  logoSrc,
  primaryColor = "#6366f1",       // Default: indigo-500
  secondaryColor = "#f472b6",     // Default: pink-400
  gradient = "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #fbbf24)", // blue > purple > pink > yellow
}: {
  theme: string;
  setTheme?: (theme: string) => void;
  logoSrc?: string;
  primaryColor?: string;
  secondaryColor?: string;
  gradient?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
    user && { label: "Dashboard", href: "/dashboard", icon: <LayoutGrid className="h-5 w-5" /> },
    user && { label: "Profile", href: "/profile", icon: <UserIcon className="h-5 w-5" /> },
    { label: "Vision Board", href: "/vision", icon: <LayoutGrid className="h-5 w-5" /> },
    { label: "Moodboards", href: "/moodboards", icon: <LayoutGrid className="h-5 w-5" /> },
    { label: "Calendar", href: "/calendar", icon: <LayoutGrid className="h-5 w-5" /> },
  ].filter(Boolean);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className={`fixed w-full top-0 left-0 z-50 shadow-xl backdrop-blur-lg border-b
        ${theme === "dark"
          ? "bg-[#181824cc] border-fuchsia-400/20"
          : "bg-white/80 border-cyan-400/20"
        }`}
      style={{
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-2 group select-none">
          {logoSrc ? (
            <img src={logoSrc} alt="LISTO logo" className="h-8 w-8 rounded shadow" />
          ) : (
            <motion.span
              initial={{ rotate: -8 }}
              animate={{ rotate: [0, 14, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <LayoutGrid className="h-8 w-8"
                style={{ color: primaryColor, filter: "drop-shadow(0 0 8px " + secondaryColor + ")" }}
              />
            </motion.span>
          )}
          <span
            className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent animate-gradient-x"
            style={{ background: gradient }}
          >
            LISTO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              className="flex items-center gap-1 px-3 py-1 rounded-full transition-all font-medium"
              style={{
                color: primaryColor,
                border: "1px solid transparent",
                background: "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = secondaryColor + "22")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
          {user ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleSignOut}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-white shadow-lg hover:scale-105 transition-all font-medium"
              style={{ background: gradient, boxShadow: "0 0 8px " + secondaryColor }}
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </motion.button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 transition-all font-medium"
              style={{ background: gradient }}
            >
              Login
            </Link>
          )}
          {setTheme && (
            <motion.button
              whileTap={{ rotate: 22, scale: 1.1 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 p-2 rounded-full shadow transition"
              style={{ background: primaryColor, color: "#fff" }}
              title="Toggle theme"
              aria-label="Toggle dark mode"
              type="button"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </motion.button>
          )}
        </div>

        {/* Hamburger for Mobile */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden p-2 rounded transition"
          style={{ color: primaryColor, background: secondaryColor + "12" }}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.33, type: "spring" }}
              className="fixed inset-0 z-[9999] flex"
            >
              <div
                className="fixed inset-0 bg-black/40"
                onClick={() => setDrawerOpen(false)}
              />
              <div className="ml-auto w-72 bg-white dark:bg-[#1c1b2b] h-full shadow-2xl px-6 py-8 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-bold text-lg tracking-tight"
                    style={{ background: gradient, WebkitBackgroundClip: "text", color: "transparent" }}
                  >
                    LISTO
                  </span>
                  <button
                    className="p-2 rounded"
                    style={{ background: secondaryColor + "22" }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-5">
                  {navLinks.map((link, i) => (
                    <Link
                      href={link.href}
                      key={i}
                      className="flex items-center gap-3 text-lg font-medium py-2 px-2 rounded transition"
                      style={{ color: primaryColor }}
                      onClick={() => setDrawerOpen(false)}
                      onMouseEnter={e => (e.currentTarget.style.background = secondaryColor + "22")}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  {user ? (
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        handleSignOut();
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded text-white shadow-lg hover:scale-105 transition-all font-medium mt-2"
                      style={{ background: gradient }}
                      title="Sign out"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="px-4 py-2 mt-2 rounded-full text-white shadow-lg hover:scale-105 transition-all font-medium"
                      style={{ background: gradient }}
                    >
                      Login
                    </Link>
                  )}
                </div>
                {setTheme && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="mt-10 flex items-center gap-2 p-2 rounded shadow transition"
                    style={{ background: primaryColor, color: "#fff" }}
                    aria-label="Toggle theme"
                    type="button"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-white" />
                    )}
                    <span className="font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
