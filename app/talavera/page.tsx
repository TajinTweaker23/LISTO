'use client';

import React from 'react';
import TalaveraFeed from '../../components/talavera/TalaveraFeed';

export default function TalaveraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Talavera Community
        </h1>
        <TalaveraFeed />
      </div>
    </div>
  );
}