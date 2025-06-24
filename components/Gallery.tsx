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
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Welcome to LISTO!</h1>
      <p className="mb-6 text-gray-600">
        Explore interests, get inspired, and organize your life. Jump into your
        favorite activities or open your calendar to plan your next move.
      </p>
      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border transition ${
              filter === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Gallery */}
      <div className="flex flex-wrap gap-4">
        {filtered.map((img, idx) => (
          <motion.div
            key={img.url}
            className="relative w-64 h-40 rounded-lg overflow-hidden shadow cursor-pointer group"
            whileHover={{ scale: 1.05, rotate: -2 }}
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
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1 text-sm flex justify-between items-center px-2">
              <span>{img.caption}</span>
              <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded-full">{img.category}</span>
            </div>
            {/* Like button */}
            <button
              className={`absolute top-2 right-2 bg-white/80 rounded-full p-1 text-pink-500 shadow hover:scale-125 transition z-10 ${
                liked[img.url] ? "scale-125 bg-pink-100" : ""
              }`}
              onClick={e => {
                e.stopPropagation();
                setLiked(l => ({ ...l, [img.url]: !l[img.url] }));
              }}
              aria-label="Like"
            >
              {liked[img.url] ? "♥" : "♡"}
            </button>
            {/* Animated overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition pointer-events-none"
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
              className="bg-white rounded-lg overflow-hidden shadow-lg relative max-w-lg w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={modalImg.url}
                alt={modalImg.caption}
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
                onError={() => handleImgError(modalImg.url)}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{modalImg.caption}</h2>
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{modalImg.category}</span>
              </div>
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
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
      <div className="flex gap-4 mt-8">
        <a
          href="https://calendar.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Open Google Calendar
        </a>
        <a
          href="https://www.notion.so/product/calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800"
        >
          Open Notion Calendar
        </a>
      </div>
    </div>
  );
}