'use client';

import React from 'react';
import ThemeSettings from '../../components/ThemeSettings';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <ThemeSettings />
      </div>
    </div>
  );
}