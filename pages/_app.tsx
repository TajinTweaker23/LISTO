// pages/_app.tsx

import { AuthProvider } from "../lib/firebase";
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
