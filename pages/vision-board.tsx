"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FilePlus, Moon, Sun, Music, Square, Youtube } from "lucide-react";

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
    <div className={`min-h-screen py-6 px-2 sm:px-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">🎨 Vision Board</h1>
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
        <section className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2">✨ Moodboard Presets</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {moodboardsData.map((mood, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => setDraggedMood({ ...mood, type: "mood" })}
                className="cursor-grab bg-white rounded-lg shadow-md flex-shrink-0 w-36 h-52 border-4"
                style={{ borderColor: mood.colors[0] }}
                onDoubleClick={() => {
                  setVisionItems([...visionItems, { ...mood, type: "mood" }]);
                  handleSelectThemeSong(mood.themeSong);
                }}
              >
                <img src={mood.image} alt={mood.title} className="w-full h-24 object-cover rounded-t-md" />
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
              </div>
            ))}
          </div>
        </section>

        {/* Add Media Controls */}
        <section className="mb-4 flex flex-wrap gap-2 items-center">
          <button onClick={() => setShowGifModal(true)} className="bg-pink-500 text-white px-3 py-1 rounded">Add GIF</button>
          <input
            type="text"
            placeholder="Paste YouTube URL"
            className="p-1 border rounded"
            value={youtubeUrl}
            onChange={e => setYoutubeUrl(e.target.value)}
            style={{ width: 170 }}
          />
          <button onClick={handleAddYoutube} className="bg-red-500 text-white px-2 rounded">
            <Youtube size={18}/> Add Video
          </button>
          <input type="color" value={colorBlock} onChange={e => setColorBlock(e.target.value)} />
          <button onClick={handleAddColorBlock} className="bg-blue-500 text-white px-2 rounded">Add Color Block</button>
          <input type="color" value={borderBlock} onChange={e => setBorderBlock(e.target.value)} />
          <button onClick={handleAddBorderBlock} className="bg-gray-600 text-white px-2 rounded">Add Border Block</button>
        </section>

        {/* Vision Board Grid ("Grab Box") */}
        <section>
          <div
            className="mb-8 border-4 border-dashed border-indigo-400 rounded-lg min-h-[150px] flex flex-wrap items-center justify-center gap-3 p-4 bg-white"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-lg text-gray-500 w-full text-center mb-1">
              Drag here to add items, or use buttons above!
            </p>
            {visionItems.length === 0 && (
              <p className="text-center text-gray-400 italic w-full">Your board is empty. Start creating!</p>
            )}
            {visionItems.map((item, idx) => {
              if (item.type === "image" || item.type === "mood") {
                return (
                  <div key={idx} className="relative w-32 h-28 m-1 rounded-lg shadow-lg overflow-hidden border-2" style={{borderColor: item.colors?.[0] || "#aaa"}}>
                    <img src={item.image || item.src} alt="" className="object-cover w-full h-full" />
                    {item.title && <div className="absolute bottom-0 bg-black/40 w-full text-xs text-white text-center">{item.title}</div>}
                  </div>
                );
              }
              if (item.type === "gif") {
                return (
                  <img key={idx} src={item.src} alt="GIF" className="w-28 h-28 m-1 rounded" />
                );
              }
              if (item.type === "youtube") {
                const match = item.src.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                const videoId = match?.[1];
                return videoId ? (
                  <iframe
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
                  <div key={idx} className="w-16 h-16 m-1 rounded" style={{ background: item.color }}></div>
                );
              }
              if (item.type === "border") {
                return (
                  <div key={idx} className="w-16 h-16 m-1 rounded border-4" style={{ borderColor: item.color, borderStyle: "solid" }}></div>
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