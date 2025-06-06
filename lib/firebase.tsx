// lib/firebase.tsx
// ────────────────────────────────────────────────────────────────────────────────
// 1) Initialize Firebase (client‐side)
// 2) Expose `auth`, `db` (Firestore), and a React context + `useAuth()` hook

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  type User,
  type Auth
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ─── 1. Your Firebase configuration ────────────────
// (Make sure you’ve set these in Vercel/.env.local under NEXT_PUBLIC_...)
//   NEXT_PUBLIC_FIREBASE_API_KEY
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
//   NEXT_PUBLIC_FIREBASE_APP_ID

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
};

// ─── 2. Initialize App, Auth & Firestore ─────────
let firebaseApp: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
} else {
  firebaseApp = getApps()[0];
  auth = getAuth();
  db = getFirestore();
}

// ─── 3. Create a React Context & Provider ─────────
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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── 4. Export a `useAuth()` hook ──────────────────
export function useAuth() {
  return useContext(AuthContext);
}

// ─── 5. Export raw `auth` and `db` for Firestore usage ───
export { auth, db };
