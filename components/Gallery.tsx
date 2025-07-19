import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  setImages: React.Dispatch<React.SetStateAction<typeof initialImages>>,
  setModalImg: React.Dispatch<
    React.SetStateAction<(typeof initialImages)[0] | null>
  >
) => {
  setImages((imgs) =>
    imgs.map((img) => (img.url === url ? { ...img, url: fallbackImg } : img))
  );
  setModalImg(null);
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
    aria-pressed={active}
  >
    <span>{emoji}</span>
    {label}
  </button>
);

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [modalImg, setModalImg] = useState<null | (typeof initialImages)[0]>(
    null
  );
  const [liked, setLiked] = useState<{ [url: string]: boolean }>(() =>
    JSON.parse(localStorage.getItem("listoGalleryLikes") || "{}")
  );
  const [images, setImages] = useState(initialImages);
  const uploadRef = useRef<HTMLInputElement>(null);

  // Persist liked images to localStorage securely
  const updateLiked = (val: { [url: string]: boolean }) => {
    setLiked(val);
    localStorage.setItem("listoGalleryLikes", JSON.stringify(val));
  };

  // Handle file upload with validation
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      return;
    }

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

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="relative max-w-5xl mx-auto p-4">
      {/* Motivational Quote */}
      <div
        className="mb-3 text-xl font-semibold text-blue-700 bg-blue-50 rounded-lg shadow px-4 py-2 flex items-center gap-2"
        aria-live="polite"
        role="status"
      >
        <span role="img" aria-label="lightbulb">
          💡
        </span>
        {getRandomQuote()}
      </div>

      <h1
        className="text-3xl font-bold mb-2"
        style={{ fontFamily: "'Quicksand', 'Baloo 2', sans-serif" }}
      >
        Welcome to LISTO!
      </h1>
      <p className="mb-6 text-gray-600">
        Explore interests, get inspired, and organize your life. Upload your own
        photos or pick from below!
      </p>

      {/* Gallery Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            active={filter === cat}
            label={cat}
            emoji={categoryEmojis[cat]}
            onClick={() => setFilter(cat)}
          />
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
          aria-label="Upload an image"
        />
      </div>

      {/* Gallery */}
      <div className="flex flex-wrap gap-6 z-10 relative">
        {filteredImages.length === 0 && (
          <div
            className="text-center text-gray-400 w-full py-20"
            aria-live="polite"
            role="status"
          >
            No images found for this category.
          </div>
        )}
        {filteredImages.map((img, idx) => (
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
              onError={() => handleImageError(img.url, setImages, setModalImg)}
              loading="lazy"
            />
            {/* Remaining UI for each image */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
