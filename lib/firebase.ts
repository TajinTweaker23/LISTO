import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  type User,
  type Auth
} from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ─── 1. Your Firebase configuration ───────────────────────────────────────────
//    (These NEXT_PUBLIC_... vars must exist in .env.local and Vercel env variables):
//      NEXT_PUBLIC_FIREBASE_API_KEY
//      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//      NEXT_PUBLIC_FIREBASE_PROJECT_ID
//      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
//      NEXT_PUBLIC_FIREBASE_APP_ID
//
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

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
} else {
  firebaseApp = getApps()[0];
  auth = getAuth();
}

// ─── 3. Create a React Context & Provider ───────────────────────────────────────
interface AuthContextValue {
  user: User | null;
}

// **This line is absolutely required**—it declares the AuthContext namespace
const AuthContext = createContext<AuthContextValue>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to auth‐state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Provide `user` to any component calling useAuth()
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

// ─── 5. Export the raw `auth` object (for signIn/signOut) ───────────────────────
export { auth };
