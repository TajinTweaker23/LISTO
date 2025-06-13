// pages/_app.tsx

import { AuthProvider } from "../context/AuthContext";
import type { AppProps } from "next/app";
import "../styles/globals.css"; // Global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;