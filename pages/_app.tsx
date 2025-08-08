import "../styles/globals.css";
import "../styles/faq.css";
import "../styles/calendar.scss";
import "../styles/docs.css";
import "../styles/events.css";
import "../styles/premium-effects.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/ui/Layout";
import React from "react";
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
  return (
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
                        <Layout>
                          <Component {...pageProps} />
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
}

export default MyApp;
