// pages/_app.tsx

import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import OnboardingModal from "../components/OnboardingModal";
import "../styles/globals.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app as firebaseApp, auth, db } from "../lib/firebase";

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

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
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