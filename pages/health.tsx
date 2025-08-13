import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Disable SSR for the Layout component to avoid hydration issues
const Layout = dynamic(() => import('../components/ui/Layout'), {
  ssr: false
});

export default function HealthPage() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="p-6 bg-sage-50 rounded-lg">
        <h1 className="text-3xl font-bold text-sage-800 mb-6">Health Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-sage-700 mb-2">Wellness Tracking</h2>
            <p className="text-sage-600">Track your daily wellness metrics</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-sage-700 mb-2">Medication Reminders</h2>
            <p className="text-sage-600">Never miss your medication schedule</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-sage-700 mb-2">Health Records</h2>
            <p className="text-sage-600">Access your medical history</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}