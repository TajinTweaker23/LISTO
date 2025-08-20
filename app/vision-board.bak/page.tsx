'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Plus, Search, Youtube, Sparkles, X } from 'lucide-react';

// Moodboard Presets
const moodboardsData = [
  {
    title: "Dreamy Pastels",
    description: "Soft hues to calm your mind and spark creativity.",
    colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=180&fit=crop",
  },
  {
    title: "Bold Contrast",
    description: "Vivid shades that ignite passion and energy.",
    colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=180&fit=crop",
  },
  {
    title: "Earthy Tones",
    description: "Natural shades to ground your ambitions.",
    colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=180&fit=crop",
  },
  {
    title: "Vibrant Energy",
    description: "Bursting with zest and vigor for a productive day.",
    colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=180&fit=crop",
  },
  {
    title: "Calm Serenity",
    description: "A peaceful blend of cool tones to relax and inspire.",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=180&fit=crop",
  },
];

export default function VisionBoard() {
  const [visionItems, setVisionItems] = useState<any[]>([]);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [selectedMoodboard, setSelectedMoodboard] = useState<any>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => router.push('/')}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            Vision Board
          </h1>
        </div>

        {/* Moodboard Presets */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Choose Your Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {moodboardsData.map((moodboard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
                onClick={() => setSelectedMoodboard(moodboard)}
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <img 
                    src={moodboard.image} 
                    alt={moodboard.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{moodboard.title}</h3>
                <p className="text-white/70 text-xs mb-3">{moodboard.description}</p>
                <div className="flex gap-1">
                  {moodboard.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Board Canvas */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 min-h-96">
          {selectedMoodboard ? (
            <div className="text-center">
              <div 
                className="w-full h-64 rounded-xl mb-6 flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${selectedMoodboard.colors.join(', ')})` 
                }}
              >
                <div className="text-white text-lg font-semibold bg-black/30 px-6 py-3 rounded-xl backdrop-blur-sm">
                  {selectedMoodboard.title} Vision
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedMoodboard.title}</h3>
              <p className="text-white/70 mb-6">{selectedMoodboard.description}</p>
              
              <Button
                onClick={() => setSelectedMoodboard(null)}
                variant="default"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                Try Another Style
              </Button>
            </div>
          ) : (
            <div className="text-center text-white/50">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-4">Select a moodboard above to start creating your vision</p>
              <p className="text-sm">Visualize your dreams and goals with beautiful, inspiring layouts</p>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setShowFabMenu(!showFabMenu)}
            variant="glow"
            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 p-0"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
