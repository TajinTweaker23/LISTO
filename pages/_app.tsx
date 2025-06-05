// pages/_app.tsx
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/firebase";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
