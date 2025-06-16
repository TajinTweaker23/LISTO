import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  PlusCircle,
  Sun,
  Moon,
  Trash2,
  Globe2,
  MapPin,
  Move,
  Loader2,
} from "lucide-react";

// --- Types ---
type SearchItem = {
  link: string;
  title: string;
  snippet: string;
  displayLink: string;
  pagemap?: { cse_image?: { src: string }[] };
  location?: { lat: number; lng: number }; // For location-based features
};

type LocalProject = {
  title: string;
  desc: string;
  lat?: number;
  lng?: number;
  img?: string;
};

// --- Mocks (replace with APIs later) ---
const highlights = [
  "🧠 Learn something new today",
  "🌍 Explore world-changing ideas",
  "🧰 Build your dream life",
  "💪 Empower your purpose",
];
const mockTrending = [
  "Mental Health Resources",
  "Volunteer in Your City",
  "AI Tools for Creators",
  "How to Start a Side Hustle",
];
const mockGIFs = [
  { src: "/gifs/inspire.gif", alt: "Inspiration" },
  { src: "/gifs/volunteer.gif", alt: "Volunteering" },
  { src: "/gifs/mindset.gif", alt: "Mindset" },
];
const mockProjects: LocalProject[] = [
  {
    title: "Local Food Bank",
    desc: "Donate or volunteer to fight hunger.",
    lat: 40.7608, lng: -111.8910,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=500&q=80",
  },
  {
    title: "Tree Planting",
    desc: "Help reforest neighborhoods.",
    lat: 40.7658, lng: -111.8570,
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=500&q=80",
  },
  {
    title: "Tutoring Youth",
    desc: "Support education in your zip code.",
    lat: 40.7540, lng: -111.8710,
    img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?fit=crop&w=500&q=80",
  },
];

const mockNews = [
  {
    title: "Utah’s wildfire season kicks off",
    url: "https://www.ksl.com/",
    snippet: "Officials urge caution as hot, dry conditions persist...",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=500&q=80",
  },
  {
    title: "Salt Lake City hosts eco-fair",
    url: "https://www.slc.gov/",
    snippet: "Green startups and local artists team up for sustainability...",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=500&q=80",
  },
];

// --- Component ---
export default function Explore() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [highlight, setHighlight] = useState(highlights[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [grabBox, setGrabBox] = useState<SearchItem[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Highlight rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight((prev) => {
        const idx = highlights.indexOf(prev);
        return highlights[(idx + 1) % highlights.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation(null),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Search handler
  const handleSearch = async () => {
    if (!query.trim()) return;
    setErrorMessage(""); setItems([]); setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed.");
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        setItems(data.items);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      } else setErrorMessage("No results found.");
    } catch (e) {
      setErrorMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // Drag/Drop for itinerary ("grab box")
  const addToGrabBox = (item: SearchItem) => {
    if (!grabBox.find((i) => i.link === item.link)) setGrabBox([...grabBox, item]);
    setShowItinerary(true);
  };
  const removeFromGrabBox = (link: string) => setGrabBox(grabBox.filter(i => i.link !== link));
  const clearGrabBox = () => setGrabBox([]);

  // Helper: Find nearby projects
  const getNearbyProjects = () => {
    if (!userLocation) return mockProjects;
    // Sort projects by distance (demo: actual calc omitted for brevity)
    return [...mockProjects].sort(
      (a, b) => Math.abs((a.lat ?? 0) - userLocation.lat) + Math.abs((a.lng ?? 0) - userLocation.lng)
        - Math.abs((b.lat ?? 0) - userLocation.lat) + Math.abs((b.lng ?? 0) - userLocation.lng)
    );
  };

  // Helper: UI theme
  const accentGradient =
    "bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400 text-transparent bg-clip-text";

  // --- MAIN RENDER ---
  return (
    <div className={`${darkMode ? "dark" : ""} font-sans transition-all duration-300`}>
      <div className="min-h-screen bg-[#F5F8FB] dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-xl py-4 px-8 border-b border-gray-200 dark:border-gray-800 z-30"
        >
          <Link href="/" passHref>
            <HomeIcon className="w-7 h-7 text-[#47676A] hover:text-indigo-500 transition cursor-pointer" />
          </Link>
          <span className={`text-2xl font-bold tracking-tight ${accentGradient}`}>Explore LISTO</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </motion.nav>

        {/* Animated Highlight Bar */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center py-2 text-base bg-white dark:bg-gray-900 shadow-inner font-medium tracking-wide"
        >
          {highlight}
        </motion.div>

        {/* Search */}
        <div className="sticky top-0 z-20 bg-[#F5F8FB] dark:bg-gray-950 py-6 px-4 border-b border-gray-200 dark:border-gray-800 backdrop-blur-xl">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <motion.input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search images, articles, places, GIFs…"
              className="flex-1 px-5 py-3 rounded-l-2xl border-2 border-gray-300 dark:border-indigo-700 bg-white dark:bg-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow"
              initial={{ scale: 0.97 }}
              whileFocus={{ scale: 1.03 }}
            />
            <motion.button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="px-7 py-3 bg-indigo-600 text-white rounded-r-2xl font-semibold hover:bg-indigo-700 shadow transition disabled:opacity-60 disabled:cursor-not-allowed text-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              🔍
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-10" ref={resultsRef}>
          {/* --- Empty state (no query) --- */}
          {!query && !loading && items.length === 0 && (
            <div>
              {/* Breaking News */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-red-500 animate-pulse">📰</span>
                  Breaking News
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockNews.map((n, idx) => (
                    <a
                      key={idx}
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg flex items-center overflow-hidden hover:scale-[1.03] transition"
                    >
                      <img src={n.img} alt={n.title} className="w-32 h-28 object-cover" />
                      <div className="p-4 flex-1">
                        <div className="font-semibold text-lg group-hover:text-indigo-600">{n.title}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">{n.snippet}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Explore Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { emoji: "📰", title: "Breaking News", desc: "Global updates" },
                  { emoji: "🌿", title: "Green Living", desc: "Eco tips" },
                  { emoji: "📚", title: "Book Recs", desc: "Curated reads" },
                  { emoji: "⚽", title: "Sports", desc: "Highlights" },
                  { emoji: "🛠️", title: "DIY Projects", desc: "Hands-on" },
                  { emoji: "❤️", title: "Humanity Wins", desc: "Stories" },
                  { emoji: "💡", title: "Mindful Living", desc: "Peace & Prod" },
                  { emoji: "📢", title: "Get Involved", desc: "Volunteer" },
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all"
                    whileHover={{ scale: 1.06, rotate: 1.5 }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * idx }}
                  >
                    <div className="text-4xl mb-2">{card.emoji}</div>
                    <div className={`font-bold text-lg mb-1 ${accentGradient}`}>{card.title}</div>
                    <div className="text-gray-600 dark:text-gray-400">{card.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Humanitarian Projects Near You */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-14"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5" /> Humanitarian Projects Near You
                  {userLocation && <span className="flex items-center text-xs ml-3 text-indigo-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {`${userLocation.lat.toFixed(2)}, ${userLocation.lng.toFixed(2)}`}
                  </span>}
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {getNearbyProjects().map((proj, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-800 dark:to-indigo-900 p-5 rounded-2xl shadow-lg flex flex-col items-center text-center border hover:border-indigo-400 dark:hover:border-indigo-700 transition cursor-pointer group"
                      whileHover={{ scale: 1.04, y: -2 }}
                      onClick={() =>
                        setQuery(proj.title)
                      }
                    >
                      {proj.img && (
                        <img src={proj.img} alt={proj.title} className="w-24 h-24 object-cover rounded-xl mb-3 group-hover:scale-105 transition" />
                      )}
                      <div className="font-bold text-md text-indigo-800 dark:text-indigo-200">{proj.title}</div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">{proj.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trending GIFs */}
              <div className="mb-14">
                <h2 className="text-xl font-bold mb-4">🔥 Trending GIFs</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockGIFs.map((gif, idx) => (
                    <motion.div
                      key={idx}
                      className="overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                      whileHover={{ scale: 1.04 }}
                    >
                      <img src={gif.src} alt={gif.alt} className="w-full h-40 object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-4">📌 Trending Searches</h2>
                <div className="flex flex-wrap gap-3">
                  {mockTrending.map((term, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setQuery(term);
                        handleSearch();
                      }}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-indigo-800 dark:to-pink-900 text-indigo-800 dark:text-white text-sm hover:bg-indigo-200 dark:hover:bg-indigo-700 font-medium shadow"
                      whileHover={{ scale: 1.06 }}
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- Loading State --- */}
          {loading && (
            <div className="flex flex-col items-center mt-16 gap-8">
              <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
              <div className="text-lg text-indigo-600 font-semibold">Fetching awesome stuff…</div>
            </div>
          )}

          {/* --- Error --- */}
          {errorMessage && !loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12 text-red-500 font-semibold"
            >
              {errorMessage}
            </motion.p>
          )}

          {/* --- Results --- */}
          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
              <AnimatePresence>
                {items.map((item, idx) => {
                  const imgSrc = item.pagemap?.cse_image?.[0]?.src;
                  return (
                    <motion.div
                      key={idx}
                      className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition cursor-move group"
                      whileHover={{ scale: 