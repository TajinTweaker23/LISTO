import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

// --- Constants and Environment Variables ---
const initialImages = [
  {
    url: "https://placekitten.com/400/300",
    caption: "Relaxing Cat",
    category: "Wellness",
  },
  {
    url: "https://picsum.photos/400/300",
    caption: "Abstract Art",
    category: "Creativity",
  },
  {
    url: "https://placebear.com/400/300",
    caption: "Adventurous Bear",
    category: "Fitness",
  },
  {
    url: "https://baconmockup.com/400/300",
    caption: "Delicious Menu",
    category: "Productivity",
  },
  {
    url: "https://placekitten.com/400/301",
    caption: "Playful Kitten",
    category: "Wellness",
  },
];

const categories = ["All", "Wellness", "Fitness", "Creativity", "Productivity"];
const categoryEmojis: Record<string, string> = {
  Wellness: "🌱",
  Fitness: "🚴",
  Creativity: "🎨",
  Productivity: "📈",
  All: "✨",
};

const quotes = [
  "The secret of getting ahead is getting started.",
  "Small steps every day.",
  "Dream. Do. Dominate.",
  "Stay inspired, stay LISTO.",
];

// Use fallback image from environment variable
const fallbackImg = process.env.NEXT_PUBLIC_FALLBACK_IMG || "/fallback.jpg";

// --- Utility Functions ---
const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

const handleImageError = (
  url: string,
  setImages: React.Dispatch<React.SetStateAction<typeof initialImages>>
) => {
  setImages((imgs) =>
    imgs.map((img) => (img.url === url ? { ...img, url: fallbackImg } : img))
  );
};

// --- Reusable Components ---
const FilterButton = ({
  active,
  label,
  emoji,
  onClick,
}: {
  active: boolean;
  label: string;
  emoji: string;
  onClick: () => void;
}) => (
  <button
    className={`px-3 py-1 rounded-full border transition flex items-center gap-1 font-semibold shadow-sm ${
      active
        ? "bg-yellow-200 text-blue-900 border-yellow-400 shadow"
        : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
    }`}
    onClick={onClick}
    aria-pressed={active ? "true" : "false"}
  >
    <span>{emoji}</span>
    {label}
  </button>
);

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [images, setImages] = useState(initialImages);
  const uploadRef = useRef<HTMLInputElement>(null);

  // Handle file upload with validation
  const handleUpload = () => {
    const files = uploadRef.current?.files;
    if (!files?.length) return;

    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      caption: file.name,
      category: "All",
    }));

    setImages((prev) => [...prev, ...newImages]);
    setFilter("All");
    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
  };

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="relative max-w-5xl mx-auto p-4">
      {/* Motivational Quote */}
      <output
        className="mb-3 text-xl font-semibold text-blue-700 bg-blue-50 rounded-lg shadow px-4 py-2 flex items-center gap-2"
        aria-live="polite"
      >
        <span aria-label="lightbulb">
          💡
        </span>
        {getRandomQuote()}
      </output>

      <h1 className="text-3xl font-extrabold leading-tight mb-4">
        Image Gallery
      </h1>

      {/* Category Filters */}
      <div className="mb-6">
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={filter === category}
            label={category}
            emoji={categoryEmojis[category]}
            onClick={() => setFilter(category)}
          />
        ))}
      </div>

      {/* Image Upload */}
      <div className="mb-8">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={uploadRef}
          onChange={handleUpload}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md cursor-pointer transition hover:bg-blue-700"
        >
          <span>📸 Upload Image</span>
          <span className="text-sm">(or drag & drop here)</span>
        </label>
      </div>

      {/* Gallery */}
      <div className="flex flex-wrap gap-6 z-10 relative">
        {filteredImages.length === 0 && (
          <output
            className="text-center text-gray-400 w-full py-20"
            aria-live="polite"
          >
            No images found for this category.
          </output>
        )}
        {filteredImages.map((img) => (
          <motion.div
            key={img.url}
            className="relative w-64 h-40 rounded-2xl overflow-hidden shadow-xl cursor-pointer group bg-white/70 backdrop-blur-md border border-blue-100 hover:shadow-2xl transition"
            whileHover={{ scale: 1.06, rotate: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filteredImages.indexOf(img) * 0.05 }}
          >
            <Image
              src={img.url}
              alt={img.caption}
              fill
              style={{ objectFit: "cover" }}
              sizes="256px"
              priority={filteredImages.indexOf(img) === 0}
              onError={() => handleImageError(img.url, setImages)}
              loading="lazy"
            />
            {/* Remaining UI for each image */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
