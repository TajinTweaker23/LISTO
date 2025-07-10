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

// Pass a logo image src to use a custom logo
export default function Navbar({
  theme,
  setTheme,
  logoSrc,
}: {
  theme: string;
  setTheme?: (theme: string) => void;
  logoSrc?: string; // Pass your custom logo URL if you want
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // Navigation links config (edit/add/remove as you like)
  const navLinks = [
    { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
    user && {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    user && {
      label: "Profile",
      href: "/profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      label: "Vision Board",
      href: "/vision",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      label: "Moodboards",
      href: "/moodboards",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      label: "Calendar",
      href: "/calendar",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
  ].filter(Boolean);

  return (
    <nav
      className={`w-full py-4 px-6 flex justify-between items-center z-40 sticky top-0 backdrop-blur-xl
        ${
          theme === "dark"
            ? "bg-[#181824]/80 border-b border-fuchsia-400/20 shadow-xl"
            : "bg-white/80 border-b border-cyan-400/20 shadow-xl"
        }
        transition-all duration-300`}
    >
      {/* Brand/Logo */}
      <Link href="/" className="flex items-center gap-2 group select-none">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="LISTO logo"
            className="h-7 w-7 rounded shadow"
          />
        ) : (
          <motion.span
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          >
            <LayoutGrid className="h-7 w-7 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
          </motion.span>
        )}
        <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
          LISTO
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5 sm:gap-6">
        {navLinks.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className="flex items-center gap-1 hover:text-blue-500 transition-colors font-medium"
          >
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        ))}
        {user ? (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-neon hover:scale-105 transition-all font-medium"
            title="Sign out"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-neon hover:scale-105 transition-all font-medium"
          >
            Login
          </Link>
        )}
        {/* Theme Toggle */}
        {setTheme && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-indigo-200 dark:bg-gray-800 dark:hover:bg-pink-400 shadow transition"
            title="Toggle theme"
            aria-label="Toggle dark mode"
            type="button"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-700" />
            )}
          </button>
        )}
      </div>

      {/* Hamburger icon for mobile */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden p-2 rounded hover:bg-indigo-50 dark:hover:bg-pink-950 transition"
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
            className={`fixed inset-0 z-[9999] flex`}
          >
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setDrawerOpen(false)}
            />
            <div className={`ml-auto w-72 bg-white dark:bg-[#1c1b2b] h-full shadow-2xl px-6 py-8 flex flex-col`}>
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-lg tracking-tight text-indigo-600 dark:text-pink-300">
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">LISTO</span>
                </span>
                <button
                  className="p-2 rounded hover:bg-indigo-100 dark:hover:bg-pink-900"
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
                    className="flex items-center gap-3 text-lg font-medium py-2 px-2 rounded hover:bg-indigo-50 dark:hover:bg-pink-800 transition"
                    onClick={() => setDrawerOpen(false)}
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
                    className="flex items-center gap-3 px-3 py-2 rounded bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-neon hover:scale-105 transition-all font-medium mt-2"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-neon hover:scale-105 transition-all font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
              {/* Theme toggle on mobile */}
              {setTheme && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mt-10 flex items-center gap-2 p-2 rounded bg-gray-100 hover:bg-indigo-200 dark:bg-gray-800 dark:hover:bg-pink-400 shadow transition"
                  aria-label="Toggle theme"
                  type="button"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-indigo-700" />
                  )}
                  <span className="font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
