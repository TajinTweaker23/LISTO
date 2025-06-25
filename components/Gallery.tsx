import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialImages = [
  { url: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80", caption: "Self-improvement", category: "Wellness" },
  { url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", caption: "Spirituality", category: "Wellness" },
  { url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", caption: "Unplugging", category: "Wellness" },
  { url: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", caption: "Goal-setting", category: "Productivity" },
  { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80", caption: "Reading", category: "Creativity" },
  { url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=600&q=80", caption: "Biking", category: "Fitness" },
  { url: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80", caption: "Fitness", category: "Fitness" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", caption: "Cooking", category: "Creativity" },
  { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80", caption: "Beauty & Makeup", category: "Creativity" },
  { url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80", caption: "Fashion", category: "Creativity" },
];

const categories = ["All", "Wellness", "Fitness", "Creativity", "Productivity"];

const categoryEmojis: Record<string, string> = {
  Wellness: "🌱",
  Fitness: "🚴",
  Creativity: "🎨",
  Productivity: "📈",
  All: "✨",
};

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [modalImg, setModalImg] = useState<null | typeof initialImages[0]>(null);
  const [liked, setLiked] = useState<{ [url: string]: boolean }>({});
  const [images, setImages] = useState(initialImages);

  // Remove image if it fails to load
  const handleImgError = (url: string) => {
    setImages(imgs => imgs.filter(img => img.url !== url));
    if (modalImg?.url === url) setModalImg(null);
  };

  const filtered = filter === "All" ? images : images.filter(img => img.category === filter);

  return (
    <div className="relative max-w-5xl mx-auto p-4">
      {/* Floating kawaii blobs */}
      <motion.div
        className="absolute -top-16 -left-16 w-40 h-40 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <svg viewBox="0 0 160 160" fill="none">
          <ellipse cx="80" cy="80" rx="70" ry="50" fill="#a5b4fc" opacity="0.5" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 w-28 h-28 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
        animate={{ opacity: 0.15, scale: 1, rotate: -10 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg viewBox="0 0 112 112" fill="none">
          <circle cx="56" cy="56" r="48" fill="#fbbf24" opacity="0.4" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 z-0 pointer-events-none"
        style={{ translate: "-50% -50%" }}
        initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
        animate={{ opacity: 0.12, scale: 1, rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      >
        <svg viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="32" rx="24" ry="12" fill="#f472b6" opacity="0.4" />
        </svg>
      </motion.div>

      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Quicksand', 'Baloo 2', sans-serif" }}>
        Welcome to LISTO!
      </h1>
      <p className="mb-6 text-gray-600">
        Explore interests, get inspired, and organize your life. Jump into your
        favorite activities or open your calendar to plan your next move.
      </p>
      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border transition flex items-center gap-1 font-semibold shadow-sm ${
              filter === cat
                ? "bg-yellow-200 text-blue-900 border-yellow-400 shadow"
                : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
            }`}
            onClick={() => setFilter(cat)}
          >
            <span>{categoryEmojis[cat]}</span>
            {cat}
          </button>
        ))}
      </div>
      {/* Gallery */}
      <div className="flex flex-wrap gap-6 z-10 relative">
        {filtered.map((img, idx) => (
          <motion.div
            key={img.url}
            className="relative w-64 h-40 rounded-2xl overflow-hidden shadow-xl cursor-pointer group bg-white/70 backdrop-blur-md border border-blue-100 hover:shadow-2xl transition"
            whileHover={{ scale: 1.06, rotate: -2 }}
            onClick={() => setModalImg(img)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Image
              src={img.url}
              alt={img.caption}
              fill
              style={{ objectFit: "cover" }}
              sizes="256px"
              priority={idx === 0}
              onError={() => handleImgError(img.url)}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-center py-1 text-sm flex justify-between items-center px-2 rounded-b-2xl">
              <span className="flex items-center gap-1">
                <span className="text-lg">{categoryEmojis[img.category]}</span>
                {img.caption}
              </span>
              <span className="ml-2 text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full font-bold shadow">
                {img.category}
              </span>
            </div>
            {/* Like button */}
            <motion.button
              className={`absolute top-2 right-2 bg-white/80 rounded-full p-1 text-pink-500 shadow hover:scale-125 transition z-10 border-2 border-pink-200 ${
                liked[img.url] ? "scale-125 bg-pink-100" : ""
              }`}
              whileTap={{ scale: 1.3, rotate: -10 }}
              onClick={e => {
                e.stopPropagation();
                setLiked(l => ({ ...l, [img.url]: !l[img.url] }));
              }}
              aria-label="Like"
            >
              <motion.span
                animate={liked[img.url] ? { scale: [1, 1.4, 1], color: "#ec4899" } : { scale: 1, color: "#f472b6" }}
                transition={{ duration: 0.3 }}
                className="text-xl"
              >
                {liked[img.url] ? "♥" : "♡"}
              </motion.span>
            </motion.button>
            {/* Animated overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-yellow-100/10 opacity-0 group-hover:opacity-100 transition pointer-events-none rounded-2xl"
              initial={false}
              animate={{ opacity: 0.1 }}
            />
          </motion.div>
        ))}
      </div>
      {/* Modal */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImg(null)}
          >
            <motion.div
              className="bg-white rounded-3xl overflow-hidden shadow-2xl relative max-w-lg w-full border-2 border-blue-100"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Floating star in modal */}
              <motion.div
                className="absolute -top-6 left-6"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 2 L22 14 H35 L24 22 L28 34 L18 27 L8 34 L12 22 L1 14 H14 Z" fill="#fbbf24" opacity="0.8" />
                </svg>
              </motion.div>
              <Image
                src={modalImg.url}
                alt={modalImg.caption}
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
                onError={() => handleImgError(modalImg.url)}
                className="rounded-t-3xl"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ fontFamily: "'Quicksand', 'Baloo 2', sans-serif" }}>
                  <span className="text-lg">{categoryEmojis[modalImg.category]}</span>
                  {modalImg.caption}
                </h2>
                <span className="inline-block bg-pink-200 text-pink-700 text-xs px-2 py-1 rounded-full font-bold shadow">
                  {modalImg.category}
                </span>
              </div>
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100 text-xl"
                onClick={() => setModalImg(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* External Links */}
      <div className="flex gap-4 mt-8 z-10 relative">
        <a
          href="https://calendar.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 font-semibold transition"
        >
          📅 Google Calendar
        </a>
        <a
          href="https://www.notion.so/product/calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-black text-white rounded-full shadow hover:bg-gray-800 font-semibold transition"
        >
          🗓️ Notion Calendar
        </a>
      </div>
    </div>
  );
}