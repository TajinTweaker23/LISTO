"use client";

import { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { HealthProvider } from '../../context/HealthContext';
import { ErrorBoundary } from '../ErrorBoundary';

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <HealthProvider>
          {children}
        </HealthProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
