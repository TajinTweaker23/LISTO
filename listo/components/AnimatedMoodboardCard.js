// components/AnimatedMoodboardCard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AnimatedMoodboardCard = ({ moodboard, index }) => {
  // Create a pseudo-carousel that cycles through multiple images per card.
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
      {/* Updated Image usage using the new Next.js 13 API */}
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

export default AnimatedMoodboardCard;
