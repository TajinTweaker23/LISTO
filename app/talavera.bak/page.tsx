'u"use client";

import React from 'react';
import TalaveraHeader from '@/components/talavera/TalaveraHeader';
import TalaveraFeed from '@/components/talavera/TalaveraFeed';

const TalaveraPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <TalaveraHeader />
        <TalaveraFeed />
      </div>
    </div>
  );
};

export default TalaveraPage;

import React from 'react';

const TalaveraPage = () => {
  return (
    <div>
      <h1>Talavera</h1>
      <p>Welcome to Talavera, a space for diverse voices.</p>
    </div>
  );
};

export default TalaveraPage;
