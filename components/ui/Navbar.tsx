import Link from "next/link";
import { useRouter } from "next/router";
import { Home as HomeIcon, User as UserIcon, LogOut, LayoutGrid } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import React from "react";

type Props = { theme: string };

export default function Navbar({ theme }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav
      className={`w-full py-4 px-6 flex justify-between items-center z-30 relative
        ${theme === "dark"
          ? "bg-[#181824]/80 border-b border-fuchsia-400/20 shadow-lg"
          : "bg-white/80 border-b border-cyan-400/20 shadow-lg"
        }
        backdrop-blur-xl transition-all duration-300`}
    >
      {/* Logo & Brand */}
      <Link href="/" className="flex items-center gap-2 group">
        <LayoutGrid className="h-7 w-7 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-neon">
          LISTO
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-1 hover:text-blue-500 transition-colors">
          <HomeIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        {user && (
          <Link href="/dashboard" className="flex items-center gap-1 hover:text-purple-500 transition-colors">
            <LayoutGrid className="h-5 w-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        )}
        {user ? (
          <>
            <Link href="/profile" className="flex items-center gap-1 hover:text-pink-500 transition-colors">
              <UserIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-neon hover:scale-105 transition-all"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-neon hover:scale-105 transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}