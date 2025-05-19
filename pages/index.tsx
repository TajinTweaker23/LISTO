// pages/index.tsx
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const floatingIcons = [
  { emoji: '📷', label: 'Photography' },
  { emoji: '🧠', label: 'Science' },
  { emoji: '📚', label: 'Education' },
  { emoji: '🛰️', label: 'Space' },
  { emoji: '🥗', label: 'Recipes' },
  { emoji: '🏋️‍♀️', label: 'Fitness' },
  { emoji: '🛋️', label: 'Interior' },
  { emoji: '🌱', label: 'Eco-Friendly' },
  { emoji: '📺', label: 'Shows' },
  { emoji: '📰', label: 'News' },
];

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-white to-blue-50">
      <div className="z-10 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
          Welcome to <span className="text-purple-600">LISTO</span>
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Your personalized dashboard for dreaming, doing, and dominating.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/vision-board">
            <button className="px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-xl shadow">
              ✨ Enter Your Vision Board
            </button>
          </Link>
          <Link href="/explore">
            <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow">
              🌍 Explore Articles & News
            </button>
          </Link>
        </div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute text-3xl opacity-70 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
        >
          <span title={item.label}>{item.emoji}</span>
        </motion.div>
      ))}
    </main>
  );
}
