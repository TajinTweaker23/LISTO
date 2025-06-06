// components/ui/Navbar.tsx
// ──────────────────────────────────────────────────────────────────────────────
// A top‐bar that shows a “Home” link + Profile (if logged in). Uses `useAuth()`.

import Link from "next/link";
import { useRouter } from "next/router";
import { Home as HomeIcon, User as UserIcon, LogOut } from "lucide-react";
import { useAuth, auth } from "../../lib/firebase"; // ← correct relative path
import { signOut } from "firebase/auth";
import { useEffect } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow py-4 px-6">
      {/* Home Icon */}
      <Link href="/" passHref>
        <HomeIcon className="w-6 h-6 text-[#46675B] hover:text-[#36574B] cursor-pointer" />
      </Link>

      {/* Placeholder Logo or Title */}
      <h1 className="text-xl font-bold text-[#46675B]">LISTO</h1>

      {/* Right side: either Show “Login” or User+Logout */}
      {user ? (
        <div className="flex items-center space-x-4">
          <Link href="/profile" passHref>
            <UserIcon className="w-6 h-6 text-[#46675B] hover:text-[#36574B] cursor-pointer" />
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-1 text-red-500 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      ) : (
        <Link href="/login" passHref>
          <button className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
}
