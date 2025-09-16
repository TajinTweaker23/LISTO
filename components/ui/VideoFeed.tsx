import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

const videos = [
  { id: 1, title: "Intro to LISTO", thumbnail: "/placeholder.jpg" },
  { id: 2, title: "Productivity Tips", thumbnail: "/placeholder.jpg" },
];

const VideoFeed: React.FC = () => {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="space-y-4 p-6">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="relative">
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setPlaying(playing === video.id ? null : video.id)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-4xl"
            >
              {playing === video.id ? <FaPause /> : <FaPlay />}
            </motion.button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">{video.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VideoFeed;