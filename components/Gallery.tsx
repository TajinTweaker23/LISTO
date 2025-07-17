import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Demo Data & Categories ---
const initialImages = [
  // ... (keep as before for demo)
];

const categories = ["All", "Wellness", "Fitness", "Creativity", "Productivity"];
const categoryEmojis: Record<string, string> = {
  Wellness: "🌱",
  Fitness: "🚴",
  Creativity: "🎨",
  Productivity: "📈",
  All: "✨",
};

// --- Inspirational Quotes (expand as needed) ---
const quotes = [
  "The secret of getting ahead is getting started.",
  "Small steps every day.",
  "Dream. Do. Dominate.",
  "Stay inspired, stay LISTO.",
];

// --- Utility for Fallback Image ---
const fallbackImg =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80";

// --- Main Gallery Component ---
export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [modalImg, setModalImg] = useState<null | typeof initialImages[0]>(null);
  const [liked, setLiked] = useState<{ [url: string]: boolean }>(
    () => JSON.parse(localStorage.getItem("listoGalleryLikes") || "{}")
  );
  const [images, setImages] = useState(initialImages);
  const [quoteIdx] = useState(Math.floor(Math.random() * quotes.length));
  const uploadRef = useRef<HTMLInputElement>(null);

  // Persist liked images to localStorage
  const updateLiked = (val: any) => {
    setLiked(val);
    localStorage.setItem("listoGalleryLikes", JSON.stringify(val));
  };

  // Remove image on error
  const handleImgError = (url: string) => {
    setImages(imgs => imgs.map(img => img.url === url ? { ...img, url: fallbackImg } : img));
    if (modalImg?.url === url) setModalImg(null);
  };

  // Handle file upload (local preview only)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImages([
        ...images,
        {
          url: reader.result as string,
          caption: "My Upload",
          category: "Creativity",
        },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const filtered = filter === "All" ? images : images.filter(img => img.category === filter);

  return (
    <div className="relative max-w-5xl mx-auto p-4">
      {/* Floating kawaii blobs (as before) */}

      {/* Motivational Quote */}
      <div className="mb-3 text-xl font-semibold text-blue-700 bg-blue-50 rounded-lg shadow px-4 py-2 flex items-center gap-2">
        <span role="img" aria-label="sparkle">💡</span> 
        {quotes[quoteIdx]}
      </div>
      
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Quicksand', 'Baloo 2', sans-serif" }}>
        Welcome to LISTO!
      </h1>
      <p className="mb-6 text-gray-600">
        Explore interests, get inspired, and organize your life. Upload your own photos or pick from below!
      </p>

      {/* Gallery Filters */}
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
        <button
          className="px-3 py-1 rounded-full border border-blue-300 bg-blue-50 text-blue-600 shadow hover:bg-blue-100"
          onClick={() => uploadRef.current?.click()}
        >
          <span>➕</span> Upload
        </button>
        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Gallery */}
      <div className="flex flex-wrap gap-6 z-10 relative">
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 w-full py-20">No images found for this category.</div>
        )}
        {filtered.map((img, idx) => (
          <motion.div
            key={img.url + idx}
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
                const newLiked = { ...liked, [img.url]: !liked[img.url] };
                updateLiked(newLiked);
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
            {/* Delete (for user-uploaded only) */}
            {img.caption === "My Upload" && (
              <motion.button
                className="absolute bottom-2 right-2 bg-red-500/80 text-white rounded-full p-1 text-sm shadow hover:bg-red-600 z-10"
                whileTap={{ scale: 1.2 }}
                onClick={e => {
                  e.stopPropagation();
                  setImages(images.filter((i, j) => j !== images.indexOf(img)));
                }}
                aria-label="Delete"
              >
                ✕
              </motion.button>
            )}
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
