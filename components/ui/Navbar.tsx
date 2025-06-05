// components/Nav.tsx (or wherever your <Nav /> is defined)
import Link from "next/link";
import { useAuth } from "../lib/firebase"; // or wherever your auth hook lives
import { signOut } from "firebase/auth";

export default function Nav() {
  const { user } = useAuth(); // your custom hook that returns { user }
  
  const handleLogout = async () => {
    try {
      await signOut(/* your Firebase auth instance */);
      // optionally redirect to home
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
      {/* Left side: logo */}
      <Link href="/">
        <a className="text-xl font-semibold text-[#46675B] hover:text-[#36574B]">
          LISTO
        </a>
      </Link>

      {/* Always-visible Login / Logout button on the right */}
      {user ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <Link href="/login">
          <a className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
            Login
          </a>
        </Link>
      )}
    </nav>
  );
}
