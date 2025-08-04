import "../styles/globals.css";
import "../styles/faq.css";
import "../styles/calendar.scss";
import "../styles/docs.css";
import "../styles/events.css";
import "../styles/premium-effects.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/ui/Layout";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WhiteboardProvider } from '../context/WhiteboardContext';
import { HealthProvider } from '../context/HealthContext';
import { ToastProvider } from '../hooks/useToast';
import { AchievementsProvider } from '../hooks/useAchievements';
import { SoundscapeProvider } from '../hooks/useSoundscape';
import { FocusTimerProvider } from '../hooks/useFocusTimer';
import { ParallaxProvider } from '../hooks/useParallax';
import { NotificationProvider } from '../components/ui/NotificationSystem';

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
        <HealthProvider>
          <ToastProvider>
            <AchievementsProvider>
              <SoundscapeProvider>
                <FocusTimerProvider>
                  <ParallaxProvider>
                    <NotificationProvider>
                      <WhiteboardProvider>
                        <Layout theme={theme} setTheme={handleSetTheme}>
                          {page}
                        </Layout>
                      </WhiteboardProvider>
                    </NotificationProvider>
                  </ParallaxProvider>
                </FocusTimerProvider>
              </SoundscapeProvider>
            </AchievementsProvider>
          </ToastProvider>
        </HealthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
