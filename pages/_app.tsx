// pages/_app.tsx
// ───────────────────────────────────────────────────────────────────────────
// This is the root of your Next.js app. We wrap every page in AuthProvider
// so that `useAuth()` works anywhere in your component tree.

import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/firebase"; // ← our new AuthProvider
import "../styles/globals.css"; // or wherever your global CSS sits

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap the entire app in AuthProvider so `useAuth()` is available everywhere
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
