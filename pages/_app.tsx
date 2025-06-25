// pages/_app.tsx

import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import OnboardingModal from "../components/OnboardingModal";
import "../styles/globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
// Remove the problematic import and initialize auth and db here
import { app as firebaseApp } from "../lib/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { motion } from "framer-motion";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function MyApp({ Component, pageProps }: AppProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check onboarding status in Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().onboarded) {
          setShowOnboarding(false);
        } else {
          setShowOnboarding(true);
        }
      } else {
        setShowOnboarding(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // or a spinner

  if (showOnboarding) {
    return (
      <OnboardingModal
        onClose={() => setShowOnboarding(false)}
        onComplete={async () => {
          const user = auth.currentUser;
          if (user) {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { onboarded: true }, { merge: true });
          }
          setShowOnboarding(false);
        }}
      />
    );
  }

  // Example: Add darkMode state (default: false)
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <Layout>
        <div className={`${darkMode ? "dark" : ""} font-sans transition-all duration-300`} style={{ fontFamily: "'Quicksand', sans-serif" }}>
          <Component {...pageProps} />
          {/* Add this near the end of your main layout or each page */}
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
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;

// If you need backend API routes, place them in the /pages/api directory as separate files.

// firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();