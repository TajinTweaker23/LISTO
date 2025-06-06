// pages/_app.tsx

import { AuthProvider } from "../context/AuthContext";
import type { AppProps } from "next/app";
import "../styles/globals.css"; // Only if you have a global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
