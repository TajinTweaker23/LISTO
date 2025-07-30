import { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../lib/firebase";
import { motion } from "framer-motion";

const auth = getAuth(app);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-warm-gray-50 to-sage-100 p-6">
      {/* Sophisticated background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-sage-200/20 to-sage-300/10 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-warm-gray-200/30 to-sage-200/20 blur-2xl"
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <motion.form
        onSubmit={handleAuth}
        className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-sage-200/50 p-10 w-full max-w-md space-y-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{ y: -4 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 text-sage-800"
          style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isNewUser ? "✨ Create Account" : "👋 Welcome Back"}
        </motion.h1>

        <motion.input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-5 py-4 border border-sage-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-all bg-white text-sage-800"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        <motion.input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-5 py-4 border border-sage-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-all bg-white text-sage-800"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        />

        {error && (
          <motion.p 
            className="text-red-500 text-sm p-3 bg-red-50 rounded-xl border border-red-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          className="w-full bg-sage-600 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-sage-700 transition-all duration-300 font-semibold disabled:opacity-50"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {loading ? "Please wait..." : isNewUser ? "Create Account ✨" : "Sign In 🚀"}
        </motion.button>

        <motion.p
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-center text-sm text-sage-600 cursor-pointer hover:text-sage-800 transition-colors font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isNewUser
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </motion.p>

        <motion.button
          type="button"
          onClick={() => signOut(auth)}
          className="w-full mt-4 text-sm text-sage-500 hover:text-sage-700 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Sign Out
        </motion.button>
      </motion.form>
    </div>
  );
}
