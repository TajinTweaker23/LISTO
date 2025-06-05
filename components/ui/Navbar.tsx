// components/ui/Navbar.tsx
// ───────────────────────────────────────────────────────────────────────────
// A simple, always-visible Navbar that displays "Login" or "Logout".
// We use `useAuth()` from lib/firebase, and `auth.signOut()` to log out.

import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth, auth } from "../../lib/firebase"; // ← our useAuth + auth instance
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user } = useAuth();       // user is `null` if not signed in, or a Firebase User object
  const router = useRouter();

  // Handles clicking the "Logout" button
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally force a redirect to home page after logout:
      router.push("/");
    } catch (err) {
      console.error("Error during sign-out:", err);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      {/* Left side: Logo or Home link */}
      <Link href="/">
        <a className="text-xl font-semibold text-[#46675B] hover:text-[#36574B]">
          LISTO
        </a>
      </Link>

      {/* Right side: show Login or Logout */}
      {user ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <Link href="/login">
          <a className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Login
          </a>
        </Link>
      )}
    </nav>
  );
}
