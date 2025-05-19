// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const floatingIcons = [
  { emoji: '📰', label: 'News' },
  { emoji: '📸', label: 'Images' },
  { emoji: '🎥', label: 'Videos' },
  { emoji: '🎯', label: 'Goals' },
  { emoji: '🌐', label: 'Web' },
  { emoji: '💡', label: 'Ideas' },
  { emoji: '🗺️', label: 'Travel' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>LISTO — Your Vision, Unlocked</title>
        <meta name="description" content="Visualize your goals. Track your dreams. Empower your journey." />
      </Head>

      <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 text-center z-10">
          Welcome to <span className="text-purple-600">LISTO</span>
        </h1>
        <p className="mt-4 text-center text-gray-600 text-lg max-w-md z-10">
          Your personalized dashboard for dreaming, doing, and dominating.
        </p>

        <Link href="/vision-board">
          <button className="mt-8 px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition z-10">
            ✨ Enter Your Vision Board
          </button>
        </Link>

        {floatingIcons.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity }}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <span title={item.label}>{item.emoji}</span>
          </motion.div>
        ))}
      </main>
    </>
  );
}
