import { useRouter } from "next/router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useState } from "react";
import Navbar from "../components/ui/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Login / Sign Up</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </label>
        <div className="flex space-x-4">
          <button onClick={handleSignIn}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Sign In</button>
          <button onClick={handleSignUp}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sign Up</button>
          <button onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Sign Out</button>
        </div>
      </main>
    </div>
  );
}
