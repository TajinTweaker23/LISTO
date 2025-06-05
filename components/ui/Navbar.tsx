// components/ui/Navbar.tsx
import Link from "next/link";
import { useAuth, auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login"); // adjust to your login route
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow py-4 px-6">
      <Link href="/" passHref>
        <span className="text-lg font-bold text-indigo-600 cursor-pointer">
          LISTO
        </span>
      </Link>

      <div className="flex items-center space-x-4">
        {!user ? (
          <Link href="/login" passHref>
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Login
            </span>
          </Link>
        ) : (
          <>
            <span className="text-gray-700">Hello, {user.email}</span>
            <button
              onClick={handleSignOut}
              className="text-red-500 hover:underline"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
