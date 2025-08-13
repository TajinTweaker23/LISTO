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
import React, { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Accept color props with nice defaults
function BrandLogo({ logoSrc }: { readonly logoSrc?: string }) {
  return (
    <Link href="/" className="flex items-center gap-3 group select-none">
      {logoSrc ? (
        <img src={logoSrc} alt="LISTO logo" className="h-10 w-10 rounded-xl shadow-lg" />
      ) : (
        <motion.div
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-sage-500 to-sage-600 flex items-center justify-center shadow-lg"
          initial={{ rotate: -8 }}
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        >
          <LayoutGrid className="h-6 w-6 text-white" />
        </motion.div>
      )}
      <span
        className="font-bold text-3xl tracking-tight"
        style={{
          fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif',
          background: 'linear-gradient(135deg, #6d7c6d 0%, #8fa08f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        LISTO
      </span>
    </Link>
  );
}

function DesktopNavLinks({
  navLinks,
  router,
  theme,
}: {
  readonly navLinks: { label: string; href: string; icon: JSX.Element }[];
  readonly router: ReturnType<typeof useRouter>;
  readonly theme: string;
}) {
  return (
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 font-medium ${
            router.pathname === link.href
              ? theme === "dark"
                ? "bg-sage-800/60 text-sage-100 shadow-lg"
                : "bg-sage-100 text-sage-700 shadow-md"
              : theme === "dark"
              ? "text-sage-300 hover:text-sage-100 hover:bg-sage-800/40"
              : "text-sage-600 hover:text-sage-700 hover:bg-sage-50"
          }`}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function ThemeToggleButton({
  theme,
  setTheme,
}: {
  readonly theme: "dark" | "light";
  readonly setTheme?: (theme: "dark" | "light") => void;
}) {
  if (!setTheme) return null;
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-3 rounded-2xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-sage-800/60 text-sage-200 hover:bg-sage-700/60"
          : "bg-sage-100 text-sage-600 hover:bg-sage-200"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </motion.button>
  );
}

function UserActions({
  user,
  theme,
  handleSignOut,
}: {
  readonly user: any;
  readonly theme: string;
  readonly handleSignOut: () => void;
}) {
  return user ? (
    <div className="hidden md:flex items-center gap-3">
      <span className={`text-sm font-medium ${theme === "dark" ? "text-sage-200" : "text-sage-700"}`}>
        {user.email}
      </span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSignOut}
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 font-medium ${
          theme === "dark"
            ? "bg-red-900/60 text-red-200 hover:bg-red-800/60"
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </motion.button>
    </div>
  ) : (
    <Link
      href="/login"
      className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-semibold ${
        theme === "dark"
          ? "bg-sage-600 text-white hover:bg-sage-500 shadow-lg"
          : "bg-sage-600 text-white hover:bg-sage-700 shadow-md"
      }`}
    >
      Sign In
    </Link>
  );
}

function MobileDrawer({
  drawerOpen,
  navLinks,
  router,
  theme,
  user,
  handleSignOut,
  setDrawerOpen,
}: {
  readonly drawerOpen: boolean;
  readonly navLinks: { label: string; href: string; icon: JSX.Element }[];
  readonly router: ReturnType<typeof useRouter>;
  readonly theme: string;
  readonly user: any;
  readonly handleSignOut: () => void;
  readonly setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden border-t ${
            theme === "dark"
              ? "bg-warm-gray-900/95 border-sage-700/30"
              : "bg-white/95 border-sage-200/50"
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                  router.pathname === link.href
                    ? theme === "dark"
                      ? "bg-sage-800/60 text-sage-100"
                      : "bg-sage-100 text-sage-700"
                    : theme === "dark"
                    ? "text-sage-300 hover:bg-sage-800/40"
                    : "text-sage-600 hover:bg-sage-50"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="pt-4 border-t border-sage-200/50 space-y-3">
                <div className={`px-4 text-sm ${theme === "dark" ? "text-sage-300" : "text-sage-600"}`}>
                  {user.email}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignOut}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium w-full ${
                    theme === "dark"
                      ? "bg-red-900/60 text-red-200"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </motion.button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                  theme === "dark"
                    ? "bg-sage-600 text-white"
                    : "bg-sage-600 text-white"
                }`}
              >
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface NavbarProps {
  readonly theme: "dark" | "light";
  readonly setTheme: (theme: "dark" | "light") => void;
}

interface MobileMenuItemProps {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly href: string;
  readonly onClick?: () => void;
  readonly badge?: string;
  readonly isActive?: boolean;
  readonly className?: string;
}

export default function Navbar({
  theme,
  setTheme,
  logoSrc,
  onMenuClick, // Add this
  primaryColor = "#6366f1",
  secondaryColor = "#f472b6",
  gradient = "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #fbbf24)",
}: {
  readonly theme: "dark" | "light";
  readonly setTheme?: (theme: "dark" | "light") => void;
  readonly logoSrc?: string;
  readonly onMenuClick?: () => void; // Add this
  readonly primaryColor?: string;
  readonly secondaryColor?: string;
  readonly gradient?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
    user && { label: "Dashboard", href: "/dashboard", icon: <LayoutGrid className="h-5 w-5" /> },
    user && { label: "Health Hub", href: "/health", icon: <LayoutGrid className="h-5 w-5" /> },
    user && { label: "Dopamine Garden", href: "/dopamine-garden", icon: <LayoutGrid className="h-5 w-5" /> },
    user && { label: "Profile", href: "/profile", icon: <UserIcon className="h-5 w-5" /> },
    { label: "Features", href: "/features", icon: <LayoutGrid className="h-5 w-5" /> },
    { label: "Vision Board", href: "/vision-board", icon: <LayoutGrid className="h-5 w-5" /> },
    { label: "Explore", href: "/explore", icon: <LayoutGrid className="h-5 w-5" /> },
    { label: "UI Demo", href: "/mobile-ui-demo", icon: <LayoutGrid className="h-5 w-5" /> },
  ].filter(Boolean) as { label: string; href: string; icon: JSX.Element }[];

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className={`fixed w-full top-0 left-0 z-50 shadow-xl backdrop-blur-2xl border-b ${
        theme === "dark"
          ? "bg-warm-gray-900/90 border-sage-700/30"
          : "bg-white/80 border-sage-200/50"
      }`}
      style={{
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex h-20 items-center justify-between">
        <BrandLogo logoSrc={logoSrc} />
        <DesktopNavLinks navLinks={navLinks} router={router} theme={theme} />
        <div className="flex items-center gap-4">
          <ThemeToggleButton theme={theme} setTheme={setTheme} />
          <UserActions user={user} theme={theme} handleSignOut={handleSignOut} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick} // Change this line
            className={`md:hidden p-3 rounded-2xl transition-all duration-300 ${
              theme === "dark"
                ? "bg-sage-800/60 text-sage-200"
                : "bg-sage-100 text-sage-600"
            }`}
            aria-label="Toggle mobile menu"
          >
            {drawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>
      <MobileDrawer
        drawerOpen={drawerOpen}
        navLinks={navLinks}
        router={router}
        theme={theme}
        user={user}
        handleSignOut={handleSignOut}
        setDrawerOpen={setDrawerOpen}
      />
    </motion.nav>
  );
}
/* No additional code needed at the end of this file. */
