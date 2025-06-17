// pages/index.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Use motion-ified Link to avoid nested <a> mismatches:
const MotionLink = motion(Link);

const moodboards = [
  {
    title: "Dreamy Pastels",
    description: "Soft hues to calm your mind and spark creativity.",
    colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
    images: [
      // FIXED Unsplash asset URLs
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513116476489-7635e79feb27?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Bold Contrast",
    description: "Vivid shades that ignite passion and energy.",
    colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    images: [
      "https://images.unsplash.com/photo-1511909525230-c4f3092f0a47?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Earthy Tones",
    description: "Natural shades to ground your ambitions.",
    colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Vibrant Energy",
    description: "Bursting with zest and vigor for a productive day.",
    colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
    images: [
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Calm Serenity",
    description: "A peaceful blend of cool tones to relax and inspire.",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
    images: [
      "https://images.unsplash.com/photo-1470274477920-577b0e039142?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500631195313-5a1b7f6a6dd8?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

function AnimatedMoodboardCard({ images, title, description, colors }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(iv);
  }, [images]);

  return (
    <motion.div
      className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative h-56">
        <Image
          src={images[idx]}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          priority={idx === 0}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex gap-2">
          {colors.map((c, i) => (
            <span
              key={i}
              className="w-8 h-8 rounded-full border border-gray-300"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-teal-600 min-h-screen">
      <section className="flex flex-col items-center justify-center text-center p-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to <span className="text-yellow-400">LISTO</span>
        </h1>
        <p className="mt-4 text-gray-100 text-lg max-w-xl">
          Your personalized dashboard for dreaming, doing, and dominating.
        </p>
        <div className="mt-6 flex flex-wrap gap-6 justify-center">
          <MotionLink
            href="/vision-board"
            whileHover={{ scale: 1.1 }}
            className="inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500"
          >
            ✨ Enter Your Vision Board
          </MotionLink>
          <MotionLink
            href="/explore"
            whileHover={{ scale: 1.1 }}
            className="inline-block px-6 py-3 bg-blue-400 text-white font-bold rounded-lg shadow-lg hover:bg-blue-500"
          >
            🌐 Explore Articles & News
          </MotionLink>
        </div>
      </section>

      <section className="py-16">
        <header className="w-full py-12 bg-gradient-to-r from-indigo-800 to-purple-700 text-center">
          <h2 className="text-4xl font-extrabold text-white">
            LISTO Vision Board
          </h2>
        </header>
        <main className="max-w-7xl mx-auto px-8 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {moodboards.map((mb, i) => (
            <AnimatedMoodboardCard key={i} {...mb} />
          ))}
        </main>
      </section>
    </div>
  );
}