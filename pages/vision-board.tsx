"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FilePlus, Moon, Sun, Music, Square, Youtube } from "lucide-react";

// --------------- Feature: Moodboard Presets ---------------
const moodboardsData = [
  {
    title: "Dreamy Pastels",
    description: "Soft hues to calm your mind and spark creativity.",
    colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
    image: "https://source.unsplash.com/600x400/?pastel",
    themeSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Bold Contrast",
    description: "Vivid shades that ignite passion and energy.",
    colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    image: "https://source.unsplash.com/600x400/?bold",
    themeSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  // Add more as needed...
];

const boardCategories = ["Personal", "Career", "Health", "Travel"];

// --------------- Main Vision Board ---------------
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play theme song on board open
  useEffect(() => {
    if (themeSong && audioRef.current) {
      audioRef.current.play();
    }
  }, [themeSong]);

  // Drag & Drop: Allow adding media via drag/drop or click
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

  // Add GIF by URL
  const handleAddGif = () => {
    if (gifUrl) {
      setVisionItems([...visionItems, { type: "gif", src: gifUrl }]);
      setGifUrl("");
      setShowGifModal(false);
    }
  };

  // Add YouTube video by URL
  const handleAddYoutube = () => {
    if (youtubeUrl) {
      setVisionItems([...visionItems, { type: "youtube", src: youtubeUrl }]);
      setYoutubeUrl("");
    }
  };

  // Add color block
  const handleAddColorBlock = () => {
    setVisionItems([...visionItems, { type: "color", color: colorBlock }]);
  };

  // Add border block
  const handleAddBorderBlock = () => {
    setVisionItems([...visionItems, { type: "border", color: borderBlock }]);
  };

  // Handle theme song selection
  const handleSelectThemeSong = (url: string) => {
    setThemeSong(url);
  };

  return (
    <div className={`min-h-screen py-6 px-2 sm:px-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold">🎨 Vision Board</h1>
          <div className="flex items-center gap-3">
            <button className="bg-gray-700 text-white rounded px-3 py-1" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
            </button>
            {themeSong && (
              <audio ref={audioRef} src={themeSong} autoPlay controls style={{ display: "none" }} />
            )}
            <button className="bg-indigo-600 text-white rounded px-3 py-1" onClick={() => setThemeSong(null)}>
              <Music size={18}/> Stop Music
            </button>
          </div>
        </header>

        {/* Moodboard Presets */}
        <section>
          <h2 className="text-xl font-bold mb-3">✨ Moodboard Presets (Drag to Import)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {moodboardsData.map((mood, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => setDraggedMood({ ...mood, type: "mood" })}
                className="cursor-grab bg-white rounded-lg shadow-md overflow-hidden"
                style={{ border: `4px solid ${mood.colors[0]}` }}
                onDoubleClick={() => {
                  setVisionItems([...visionItems, { ...mood, type: "mood" }]);
                  handleSelectThemeSong(mood.themeSong);
                }}
              >
                <div className="relative w-full h-28">
                  {/* Use <img> for demo to avoid Next.js static import issues */}
                  <img src={mood.image} alt={mood.title} className="w-full h-full object-cover"/>
                </div>
                <div className="p-2">
                  <h3 className="font-semibold">{mood.title}</h3>
                  <p className="text-xs">{mood.description}</p>
                  <div className="flex gap-1 mt-1">
                    {mood.colors.map((c,i)=><div key={i} className="w-5 h-5 rounded-full" style={{background:c}} />)}
                  </div>
                  <button className="text-xs mt-2 underline" onClick={() => handleSelectThemeSong(mood.themeSong)}>
                    Play Theme Song
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Add Media Controls */}
        <section className="mb-6 flex flex-wrap gap-2 items-center">
          {/* GIF */}
          <button onClick={() => setShowGifModal(true)} className="bg-pink-500 text-white px-3 py-1 rounded">Add GIF</button>
          {/* YouTube */}
          <input
            type="text"
            placeholder="Paste YouTube URL"
            className="p-1 border rounded"
            value={youtubeUrl}
            onChange={e => setYoutubeUrl(e.target.value)}
            style={{width:170}}
          />
          <button onClick={handleAddYoutube} className="bg-red-500 text-white px-2 rounded">
            <Youtube size={18}/> Add Video
          </button>
          {/* Color Block */}
          <input type="color" value={colorBlock} onChange={e => setColorBlock(e.target.value)} />
          <button onClick={handleAddColorBlock} className="bg-blue-500 text-white px-2 rounded">Add Color Block</button>
          {/* Border Block */}
          <input type="color" value={borderBlock} onChange={e => setBorderBlock(e.target.value)} />
          <button onClick={handleAddBorderBlock} className="bg-gray-600 text-white px-2 rounded">Add Border Block</button>
        </section>

        {/* The "Grab Box" */}
        <section>
          <div
            className="mb-8 border-4 border-dashed border-indigo-400 rounded-lg min-h-[180px] flex flex-wrap items-center justify-center gap-4 p-4 bg-white"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-lg text-gray-500 w-full text-center mb-2">
              Drag here to add items, or click buttons above!
            </p>
            {visionItems.length === 0 && (
              <p className="text-center text-gray-400 italic w-full">Your board is empty. Start creating!</p>
            )}
            {/* Render all vision board items */}
            {visionItems.map((item, idx) => {
              if (item.type === "image" || item.type === "mood") {
                return (
                  <div key={idx} className="relative w-40 h-32 m-2 rounded-lg shadow-lg overflow-hidden border-2" style={{borderColor: item.colors?.[0] || "#aaa"}}>
                    <img src={item.image || item.src} alt="" className="object-cover w-full h-full" />
                    {item.title && <div className="absolute bottom-0 bg-black/40 w-full text-xs text-white text-center">{item.title}</div>}
                  </div>
                );
              }
              if (item.type === "gif") {
                return (
                  <img key={idx} src={item.src} alt="GIF" className="w-32 h-32 m-2 rounded" />
                );
              }
              if (item.type === "youtube") {
                // Extract YouTube video ID and embed
                const match = item.src.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                const videoId = match?.[1];
                return videoId ? (
                  <iframe
                    key={idx}
                    width="180"
                    height="110"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Video"
                    className="rounded m-2"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null;
              }
              if (item.type === "color") {
                return (
                  <div key={idx} className="w-24 h-24 m-2 rounded" style={{ background: item.color }}></div>
                );
              }
              if (item.type === "border") {
                return (
                  <div key={idx} className="w-24 h-24 m-2 rounded border-8" style={{ borderColor: item.color, borderStyle: "solid" }}></div>
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
    </div>
  );
}