// pages/_app.tsx

import "../styles/globals.css";
import "../styles/faq.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/ui/Layout";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client instance
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");

  // Effect to load and apply the saved theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Function to update theme state, local storage, and DOM
  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  // If a page has a specific layout, use it. Otherwise, use the default.
  // This is a common pattern for pages that shouldn't have a sidebar (e.g., a login page).
  const getLayout = (page: React.ReactElement) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout theme={theme} setTheme={handleSetTheme}>
          {page}
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );

  return getLayout(<Component {...pageProps} />);
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
