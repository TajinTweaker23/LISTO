'use client';

import React from 'react';
import ExploreArticles from '../../components/ExploreArticles';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Explore Features
        </h1>
        <ExploreArticles />
      </div>
    </div>
  );
}