import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const floatingIcons = [
  { emoji: '🌐', label: 'Global' },
  { emoji: '📸', label: 'Photos' },
  { emoji: '🎥', label: 'Videos' },
  { emoji: '🍲', label: 'Recipes' },
  { emoji: '🧘‍♀️', label: 'Wellness' },
  { emoji: '🏃‍♂️', label: 'Fitness' },
  { emoji: '🧬', label: 'Science' },
  { emoji: '🌱', label: 'Eco-Friendly' },
  { emoji: '🎨', label: 'Design' },
  { emoji: '📚', label: 'Education' },
  { emoji: '📰', label: 'News' },
  { emoji: '🌌', label: 'Space' },
  { emoji: '👠', label: 'Fashion' },
  { emoji: '⚖️', label: 'Justice' },
];

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Welcome to <span className="text-purple-600">LISTO</span>
      </h1>
      <p className="mt-4 text-center text-gray-600 max-w-xl">
        Your personalized dashboard for dreaming, doing, and dominating.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/vision-board">
          <button className="p-2 border rounded bg-orange-100 hover:bg-orange-200">
            ✨ Enter Your Vision Board
          </button>
        </Link>
        <Link href="/explore">
          <button className="p-2 border rounded bg-blue-100 hover:bg-blue-200">
            🌐 Explore Articles & News
          </button>
        </Link>
      </div>

      {floatingIcons.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4 + index, repeat: Infinity }}
          className="absolute text-2xl md:text-4xl"
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
  );
}
