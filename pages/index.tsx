// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Moodboards array (from HEAD)
const moodboards = [
  {
    title: "Dreamy Pastels",
    description: "Soft hues to calm your mind and spark creativity.",
    colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    title: "Bold Contrast",
    description: "Vivid shades that ignite passion and energy.",
    colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    title: "Earthy Tones",
    description: "Natural shades to ground your ambitions.",
    colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    title: "Vibrant Energy",
    description: "Bursting with zest and vigor for a productive day.",
    colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
    image: "https://picsum.photos/600/400?random=4",
  },
  {
    title: "Calm Serenity",
    description: "A peaceful blend of cool tones to relax and inspire.",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
    image: "https://picsum.photos/600/400?random=5",
  },
];

// AnimatedMoodboardCard component (from HEAD)
const AnimatedMoodboardCard = ({ moodboard, index }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    moodboard.image,
    `https://picsum.photos/600/400?random=${index * 10 + 2}`,
    `https://picsum.photos/600/400?random=${index * 10 + 3}`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg overflow-hidden transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={moodboard.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {moodboard.title}
        </h2>
        <p className="text-gray-600 mb-4">{moodboard.description}</p>
        <div className="flex gap-2">
          {moodboard.colors.map((color, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-full border border-gray-200"
            ></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Floating icons array (from remote)
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
  // State for moodboard navigation (from HEAD)
  const [currentMoodboard, setCurrentMoodboard] = useState(0);
  const nextMoodboard = () =>
    setCurrentMoodboard((prev) => (prev + 1) % moodboards.length);
  const prevMoodboard = () =>
    setCurrentMoodboard((prev) => (prev - 1 + moodboards.length) % moodboards.length);

  return (
    <div>
      {/* Welcome / Dashboard Section (from remote) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-purple-600">LISTO</span>
        </h1>
        <p className="mt-4 text-center text-gray-600 max-w-xl">
          Your personalized dashboard for dreaming, doing, and dominating.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center z-10">
          <Link href="/vision-board">
            <button className="p-2 px-4 border rounded-xl bg-orange-100 hover:bg-orange-200">
              ✨ Enter Your Vision Board
            </button>
          </Link>
          <Link href="/explore">
            <button className="p-2 px-4 border rounded-xl bg-blue-100 hover:bg-blue-200">
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
      </section>

      {/* Moodboards Section (from HEAD) */}
      <section className="min-h-screen flex flex-col">
        <header className="w-full py-12 bg-gradient-to-r from-blue-900 to-teal-500">
          <h1 className="text-5xl font-extrabold text-center text-white">
            LISTO Vision Board
          </h1>
        </header>
        <main className="flex-grow p-8">
          <div className="max-w-7xl mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {moodboards.map((mb, idx) => (
                <div key={idx} className="break-inside">
                  <AnimatedMoodboardCard moodboard={mb} index={idx} />
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-8">
              <button
                onClick={prevMoodboard}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2"
              >
                Prev
              </button>
              <button
                onClick={nextMoodboard}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}