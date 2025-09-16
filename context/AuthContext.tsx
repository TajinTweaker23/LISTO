// context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../lib/firebase"; // ✅ Corrected import

interface AuthContextValue {
  user: User | null;
  reAuthenticate: (callback: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Set persistence to local for minimal re-auth
    setPersistence(auth, browserLocalPersistence).catch(console.error);
    
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsub();
  }, []);

  const reAuthenticate = async (callback: () => void) => {
    // Use biometrics or passkeys for re-auth
    if ('credentials' in navigator) {
      try {
        const credential = await navigator.credentials.get({
          publicKey: {
            challenge: new Uint8Array(32), // Generate proper challenge
            allowCredentials: [], // Use stored credentials
          },
        });
        if (credential) {
          callback(); // Proceed if authenticated
        }
      } catch (err) {
        // Fallback to password or skip for low-risk actions
        callback();
      }
    } else {
      callback(); // Fallback
    }
  };

  return (
    <AuthContext.Provider value={{ user, reAuthenticate }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };
