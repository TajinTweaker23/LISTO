import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAvatarSVG } from "./AvatarPicker";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/calendar", label: "Calendar" },
  { href: "/vision-board", label: "Vision Board" },
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
  }, []);

  // Example: Show a toast when userName is set
  useEffect(() => {
    if (userName) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [userName]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 to-teal-600">
      {/* Header */}
      <header
        className={`sticky top-0 z-30 bg-blue-900/90 backdrop-blur text-white p-4 flex items-center justify-between shadow transition-shadow ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Logo or Icon */}
          <span className="bg-yellow-400 text-blue-900 font-extrabold rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-neon">
            L
          </span>
          <span className="font-bold text-2xl tracking-tight">LISTO</span>
          <span className="ml-2 text-sm text-teal-200 italic hidden sm:inline">
            Dream. Do. Dominate.
          </span>
        </div>
        {/* Desktop Nav */}
        <nav
          className="space-x-4 hidden md:block"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                router.pathname === link.href
                  ? "bg-yellow-400 text-blue-900 font-bold"
                  : "hover:bg-blue-800"
              }`}
              tabIndex={0}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* User Avatar */}
        <div className="ml-4 relative group">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-yellow-400 shadow hover:scale-105 transition cursor-pointer"
            title={userName ? `Logged in as ${userName}` : "Guest"}
          >
            {getAvatarSVG(avatar)}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
            {userName ? userName : "Guest"}
          </div>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-2"
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <nav
            className="absolute top-16 right-4 bg-blue-900 rounded shadow-lg py-2 px-4 flex flex-col space-y-2 md:hidden animate-fade-in-scale"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  router.pathname === link.href
                    ? "bg-yellow-400 text-blue-900 font-bold"
                    : "hover:bg-blue-800"
                }`}
                tabIndex={0}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-scale bg-yellow-400 text-blue-900 px-4 py-2 rounded shadow-lg font-semibold">
          Welcome{userName ? `, ${userName}` : ""}!
        </div>
      )}
      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-6 py-6">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-gray-100 text-center p-2 text-xs text-gray-500">
        © {new Date().getFullYear()} LISTO &mdash; Dream. Do. Dominate.
      </footer>
    </div>
  );
}