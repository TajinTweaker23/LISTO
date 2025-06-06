// lib/firebase.tsx
// -----------------------
// 1) Initialize Firebase (client‐side)
// 2) Expose `auth` and a React context + `useAuth()` hook

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  type User,
  type Auth
} from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ─── 1. Your Firebase configuration ───────────────────────────────────────────
//    (These environment variables should already be set in Vercel / .env.local)
//    Make sure you create the following NEXT_PUBLIC_... variables in Vercel:
//      - NEXT_PUBLIC_FIREBASE_API_KEY
//      - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//      - NEXT_PUBLIC_FIREBASE_PROJECT_ID
//      - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//      - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
//      - NEXT_PUBLIC_FIREBASE_APP_ID
//
//    If you haven't done so, go to your Firebase Console > Project Settings >
//    General > Your apps > Firebase SDK snippet, and copy the config fields.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
};

// ─── 2. Initialize App & Auth ───────────────────────────────────────────────────
let firebaseApp: FirebaseApp;
let auth: Auth;

// Only initialize once on the client
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
} else {
  // If it's already initialized (e.g. during hot reload), reuse it
  firebaseApp = getApps()[0];
  auth = getAuth();
}

// ─── 3. Create a React Context & Provider ───────────────────────────────────────
interface AuthContextValue {
  user: User | null;
}

const AuthContext = createContext<AuthContextValue>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Now we can safely use AuthContext.Provider (AuthContext is already in scope)
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── 4. Export a `useAuth()` hook ───────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}

// ─── 5. Export the raw `auth` object in case you need to call signIn/signOut  ───
export { auth };
