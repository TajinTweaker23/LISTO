"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FilePlus, Moon, Sun, Music, LayoutGrid, Youtube, Plus } from "lucide-react";

// ---- Moodboard Presets ----
const moodboardsData = [
  {
    title: "Dreamy Pastels",
    description: "Soft hues to calm your mind and spark creativity.",
    colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
    image: "https://source.unsplash.com/200x160/?pastel",
    themeSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Bold Contrast",
    description: "Vivid shades that ignite passion and energy.",
    colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    image: "https://source.unsplash.com/200x160/?bold",
    themeSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Earthy Tones",
    description: "Natural shades to ground your ambitions.",
    colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
    image: "https://source.unsplash.com/200x160/?earth",
    themeSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Vibrant Energy",
    description: "Bursting with zest and vigor for a productive day.",
    colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
    image: "https://source.unsplash.com/200x160/?vibrant",
    themeSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    title: "Calm Serenity",
    description: "A peaceful blend of cool tones to relax and inspire.",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
    image: "https://source.unsplash.com/200x160/?serene",
    themeSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
];

export default function VisionBoard() {
  const [visionItems, setVisionItems] = useState<any[]>([]);
  const [draggedMood, setDraggedMood] = useState<any | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showGifModal, setShowGifModal] = useState(false);
  const [gifUrl, setGifUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [colorBlock, setColorBlock] = useState("#ff69b4");
  const [borderBlock, setBorderBlock] = useState("#222");
  const [themeSong, setThemeSong] = useState<string | null>(null);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (themeSong && audioRef.current) {
      audioRef.current.play();
    }
  }, [themeSong]);

  // ---- Drag and Drop ----
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedMood) {
      setVisionItems([...visionItems, draggedMood]);
      setDraggedMood(null);
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setVisionItems([...visionItems, { type: "image", src: event.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    }
    e.dataTransfer.clearData();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ---- Add Media ----
  const handleAddGif = () => {
    if (gifUrl) {
      setVisionItems([...visionItems, { type: "gif", src: gifUrl }]);
      setGifUrl("");
      setShowGifModal(false);
    }
  };

  const handleAddYoutube = () => {
    if (youtubeUrl) {
      setVisionItems([...visionItems, { type: "youtube", src: youtubeUrl }]);
      setYoutubeUrl("");
    }
  };

  const handleAddColorBlock = () => {
    setVisionItems([...visionItems, { type: "color", color: colorBlock }]);
  };

  const handleAddBorderBlock = () => {
    setVisionItems([...visionItems, { type: "border", color: borderBlock }]);
  };

  const handleSelectThemeSong = (url: string) => {
    setThemeSong(url);
  };

  return (
    <div className={`min-h-screen py-6 px-2 sm:px-6 relative`} style={{ fontFamily: "Inter, Poppins, Arial, sans-serif" }}>
      <div className="animated-gradient-bg" />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl py-8 mb-6 shadow-lg flex flex-col items-center"
          style={{
            background: "rgba(255,255,255,0.36)",
            backdropFilter: "blur(12px) saturate(180%)"
          }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-2" style={{ fontFamily: "Poppins, Inter, Arial" }}>✨ Your Vision Board</h1>
          <p className="text-lg font-medium text-center max-w-xl text-gray-700 dark:text-gray-200">Drag in moodboards, GIFs, YouTube, colored blocks, and more—make it yours!</p>
        </motion.div>

        {/* Moodboard Presets */}
        <section className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Moodboard Presets</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {moodboardsData.map((mood, idx) => (
              <motion.div
                key={idx}
                draggable
                onDragStart={() => setDraggedMood({ ...mood, type: "mood" })}
                whileHover={{ scale: 1.08 }}
                className="cursor-grab flex-shrink-0 w-36 h-52 border-4 border-white rounded-xl relative shadow-lg"
                style={{
                  borderColor: mood.colors[0],
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(9px) saturate(180%)"
                }}
                onDoubleClick={() => {
                  setVisionItems([...visionItems, { ...mood, type: "mood" }]);
                  handleSelectThemeSong(mood.themeSong);
                }}
              >
                <img src={mood.image} alt={mood.title} className="w-full h-24 object-cover rounded-t-xl" />
                <div className="p-2">
                  <h3 className="font-semibold text-base mb-1">{mood.title}</h3>
                  <div className="flex gap-1 mb-1">
                    {mood.colors.map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-full border" style={{ background: c }} />
                    ))}
                  </div>
                  <button className="text-xs text-blue-500 mt-1 underline" onClick={() => handleSelectThemeSong(mood.themeSong)}>
                    Play Theme
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Media FAB (Floating Action Button) */}
        <button
          className="fixed bottom-10 right-10 z-50 bg-indigo-600 hover:bg-indigo-700 rounded-full p-4 shadow-lg focus:outline-none transition-all flex items-center gap-2"
          onClick={() => setShowFabMenu((v) => !v)}
          style={{ boxShadow: "0 4px 24px rgba(80,0,170,0.16)" }}
        >
          <Plus className="w-7 h-7 text-white" />
          <span className="hidden sm:inline text-white font-bold text-lg">Add Media</span>
        </button>

        <AnimatePresence>
          {showFabMenu && (
            <motion.div
              className="fixed bottom-28 right-10 z-50 p-4 rounded-xl flex flex-col gap-3 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.42)",
                backdropFilter: "blur(16px) saturate(180%)"
              }}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
            >
              <button onClick={() => setShowGifModal(true)} className="bg-pink-500 hover:bg-pink-600 text-white rounded px-4 py-2">Add GIF</button>
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="YouTube URL"
                  className="p-1 border rounded w-28"
                  value={youtubeUrl}
                  onChange={e => setYoutubeUrl(e.target.value)}
                />
                <button onClick={handleAddYoutube} className="bg-red-500 hover:bg-red-600 text-white rounded px-2">
                  <Youtube size={18}/> Video
                </button>
              </div>
              <div className="flex gap-1">
                <input type="color" value={colorBlock} onChange={e => setColorBlock(e.target.value)} />
                <button onClick={handleAddColorBlock} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2">Color Block</button>
              </div>
              <div className="flex gap-1">
                <input type="color" value={borderBlock} onChange={e => setBorderBlock(e.target.value)} />
                <button onClick={handleAddBorderBlock} className="bg-gray-600 hover:bg-gray-700 text-white rounded px-2">Border Block</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vision Board Grid */}
        <section>
          <div
            className="mb-8 border-4 border-dashed border-indigo-400 rounded-2xl min-h-[150px] flex flex-wrap items-center justify-center gap-3 p-4"
            style={{
              background: "rgba(255,255,255,0.32)",
              backdropFilter: "blur(8px) saturate(180%)"
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-lg text-gray-500 w-full text-center mb-1">
              Drag here to add items, or use the + button below!
            </p>
            {visionItems.length === 0 && (
              <p className="text-center text-gray-400 italic w-full">Your board is empty. Start creating!</p>
            )}
            {visionItems.map((item, idx) => {
              if (item.type === "image" || item.type === "mood") {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-32 h-28 m-1 rounded-lg shadow-lg overflow-hidden border-2"
                    style={{
                      borderColor: item.colors?.[0] || "#aaa",
                      background: "rgba(255,255,255,0.22)",
                      backdropFilter: "blur(6px) saturate(180%)"
                    }}
                  >
                    <img src={item.image || item.src} alt="" className="object-cover w-full h-full" />
                    {item.title && <div className="absolute bottom-0 bg-black/40 w-full text-xs text-white text-center">{item.title}</div>}
                  </motion.div>
                );
              }
              if (item.type === "gif") {
                return (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    key={idx}
                    src={item.src}
                    alt="GIF"
                    className="w-28 h-28 m-1 rounded"
                    style={{
                      background: "rgba(255,255,255,0.14)",
                      backdropFilter: "blur(4px)"
                    }}
                  />
                );
              }
              if (item.type === "youtube") {
                const match = item.src.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                const videoId = match?.[1];
                return videoId ? (
                  <motion.iframe
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    key={idx}
                    width="120"
                    height="70"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Video"
                    className="rounded m-1"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null;
              }
              if (item.type === "color") {
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    key={idx}
                    className="w-16 h-16 m-1 rounded"
                    style={{
                      background: item.color,
                      border: "2px solid #fff"
                    }}
                  ></motion.div>
                );
              }
              if (item.type === "border") {
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    key={idx}
                    className="w-16 h-16 m-1 rounded border-4"
                    style={{
                      borderColor: item.color,
                      borderStyle: "solid",
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(3px)"
                    }}
                  ></motion.div>
                );
              }
              return null;
            })}
          </div>
        </section>
      </div>

      {/* GIF Modal */}
      <AnimatePresence>
        {showGifModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full flex flex-col gap-3">
              <h3 className="font-bold mb-2">Add a GIF</h3>
              <input
                type="text"
                placeholder="Paste GIF URL"
                value={gifUrl}
                onChange={e => setGifUrl(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                onClick={handleAddGif}
                className="bg-pink-500 text-white px-3 py-1 rounded"
              >
                Add GIF
              </button>
              <button
                onClick={() => setShowGifModal(false)}
                className="text-gray-600 hover:underline text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Gradient Background */}
      <style jsx global>{`
        body {
          font-family: 'Inter', 'Poppins', Arial, sans-serif;
        }
        .animated-gradient-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: linear-gradient(270deg, #5eead4, #818cf8, #f472b6, #facc15, #38bdf8, #f472b6);
          background-size: 1800% 1800%;
          animation: gradient-animate 24s ease infinite;
        }
        @keyframes gradient-animate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}