import { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "../lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const auth = getAuth(app);

const actionCodeSettings = {
  url: typeof window !== "undefined"
    ? `${window.location.origin}/vision-board`
    : "http://localhost:3000/vision-board",
  handleCodeInApp: true,
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [showMagic, setShowMagic] = useState(false);
  const [showGuestMsg, setShowGuestMsg] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mascotMood, setMascotMood] = useState<"neutral" | "happy" | "sad" | "cool">("neutral");

  // Handle Email/Password Login or Sign Up
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setMascotMood("neutral");
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMascotMood("happy");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMascotMood("happy");
      }
      router.push("/vision-board");
    } catch (err: any) {
      setMascotMood("sad");
      setError(
        err.code === "auth/user-not-found"
          ? "No account found. Try signing up!"
          : err.code === "auth/wrong-password"
          ? "Wrong password! Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Magic Link Login
  const handleMagicLink = async () => {
    setError("");
    setLoading(true);
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setShowMagic(false);
      setError("A magic login link has been sent to your email! 🚀");
      setMascotMood("cool");
    } catch (err: any) {
      setError(err.message);
      setMascotMood("sad");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    setMascotMood("neutral");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMascotMood("happy");
      router.push("/vision-board");
    } catch (err: any) {
      setError("Google sign-in failed.");
      setMascotMood("sad");
    } finally {
      setLoading(false);
    }
  };

  // Guest Demo Login (local storage only, not Firebase user)
  const handleGuestLogin = () => {
    setShowGuestMsg(true);
    setMascotMood("cool");
    setTimeout(() => {
      router.push("/vision-board");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-yellow-100 p-4 relative">
      {/* Animated Mascot */}
      <motion.div
        className="absolute left-8 top-8 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mascotMood}
            initial={{ scale: 0.7, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="bg-white rounded-full shadow-xl border-4 border-indigo-200 w-20 h-20 flex items-center justify-center text-5xl"
          >
            {
              {
                neutral: "🦄",
                happy: "😃",
                sad: "😢",
                cool: "😎",
              }[mascotMood]
            }
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* Login/Sign Up Form */}
      <form
        onSubmit={handleAuth}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4 relative"
        style={{ borderTop: "8px solid #a5b4fc" }}
      >
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-700 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          {isNewUser ? "Create Your LISTO Account" : "Welcome Back to LISTO!"}
        </h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
        />
        {!showMagic && (
          <input
            type="password"
            required={!showMagic}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
          />
        )}
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-500 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        {!showMagic && (
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-bold hover:bg-indigo-600 transition"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isNewUser
              ? "Sign Up"
              : "Log In"}
          </button>
        )}
        {/* Toggle Magic Link */}
        <p
          className="text-center text-xs text-indigo-500 cursor-pointer mt-1 hover:underline"
          onClick={() => setShowMagic((s) => !s)}
        >
          {showMagic
            ? "← Use password login instead"
            : "Use magic link (no password)"}
        </p>
        {/* Magic Link Box */}
        {showMagic && (
          <motion.button
            type="button"
            onClick={handleMagicLink}
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-bold mt-2 hover:bg-pink-600 transition"
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? "Sending link..." : "Send me a magic login link"}
          </motion.button>
        )}
        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-200 flex items-center justify-center gap-2 py-2 rounded-lg mt-3 font-semibold shadow hover:bg-gray-50 transition"
          disabled={loading}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            width={24}
            height={24}
            alt="Google"
          />
          Continue with Google
        </button>
        {/* Guest Demo Login */}
        <motion.button
          type="button"
          onClick={handleGuestLogin}
          className="w-full bg-gradient-to-r from-indigo-400 to-pink-400 text-white py-2 rounded-lg mt-3 font-semibold hover:from-indigo-500 hover:to-pink-500 transition"
          whileTap={{ scale: 0.96, rotate: -2 }}
          disabled={loading}
        >
          Try Demo (Guest)
        </motion.button>
        {showGuestMsg && (
          <motion.p
            className="text-green-600 text-center text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            You’re in as a guest! Start exploring 🚀
          </motion.p>
        )}
        <p
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-center text-sm text-indigo-600 cursor-pointer mt-4 hover:underline"
        >
          {isNewUser
            ? "Already have an account? Log in"
            : "New user? Create an account"}
        </p>
        <button
          type="button"
          onClick={() => signOut(auth)}
          className="w-full mt-2 text-xs text-gray-500 underline"
        >
          Sign Out
        </button>
      </form>
      {/* Animated floating action button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-indigo-500 hover:bg-pink-400 text-white rounded-full shadow-xl p-5 text-3xl border-4 border-white dark:border-indigo-900"
        whileHover={{ scale: 1.15, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Quick Action"
      >
        +
      </motion.button>
    </div>
  );
}
