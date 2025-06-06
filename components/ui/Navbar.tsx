// components/ui/Navbar.tsx

import Link from "next/link";
import { useAuth, auth } from "../lib/firebase"; // ← updated path
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { Home as HomeIcon, User as UserIcon } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow py-4 px-6">
      <Link href="/" passHref>
        <HomeIcon className="w-6 h-6 text-[#46675B] hover:text-[#36574B] cursor-pointer" />
      </Link>

      <h1 className="text-xl font-bold text-[#46675B]">LISTO</h1>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-600">Hi, {user.displayName || user.email}</span>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login" passHref>
            <UserIcon className="w-6 h-6 text-[#46675B] hover:text-[#36574B] cursor-pointer" />
          </Link>
        )}
      </div>
    </nav>
  );
}
