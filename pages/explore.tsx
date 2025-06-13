// pages/explore.tsx
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
} from "lucide-react";

type SearchItem = {
  link: string;
  title: string;
  snippet: string;
  displayLink: string;
  pagemap?: {
    cse_image?: { src: string }[];
  };
};

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

const mockProjects = [
  { title: "Local Food Bank", desc: "Donate or volunteer to fight hunger." },
  { title: "Tree Planting", desc: "Help reforest neighborhoods." },
  { title: "Tutoring Youth", desc: "Support education in your zip code." },
];

export default function Explore() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [highlight, setHighlight] = useState(highlights[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [grabBox, setGrabBox] = useState<SearchItem[]>([]);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight((prev) => {
        const idx = highlights.indexOf(prev);
        return highlights[(idx + 1) % highlights.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setErrorMessage("");
    setItems([]);
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed.");
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        setItems(data.items);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        setErrorMessage("No results found.");
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const addToGrabBox = (item: SearchItem) => {
    if (!grabBox.find((i) => i.link === item.link)) {
      setGrabBox([...grabBox, item]);
    }
  };

  const clearGrabBox = () => setGrabBox([]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-[#E3E8F0] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <nav className="flex justify-between items-center bg-white dark:bg-gray-800 shadow py-4 px-6">
          <Link href="/" passHref>
            <HomeIcon className="w-6 h-6 text-[#46675B] hover:text-[#2e423f] cursor-pointer" />
          </Link>
          <h1 className="text-xl font-bold">🔍 Explore LISTO</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>

        <div className="text-center py-2 text-sm bg-white dark:bg-gray-800 shadow-inner">
          {highlight}
        </div>

        <div className="sticky top-0 z-10 bg-[#E3E8F0] dark:bg-gray-900 py-4 px-6 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center max-w-4xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search images, articles, GIFs…"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-xl bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="px-5 py-2 bg-indigo-600 text-white rounded-r-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔍
            </button>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-6" ref={resultsRef}>
          {!query && !loading && items.length === 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                    whileHover={{ scale: 1.03 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <div className="text-5xl mb-2">{card.emoji}</div>
                    <h2 className="font-semibold text-lg">{card.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{card.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Local Projects */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5" /> Humanitarian Projects Near You
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {mockProjects.map((proj, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <h3 className="font-bold text-indigo-700 dark:text-indigo-300">{proj.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* GIFs */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">🔥 Trending GIFs</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockGIFs.map((gif, idx) => (
                    <div key={idx} className="overflow-hidden rounded-xl shadow-md">
                      <img src={gif.src} alt={gif.alt} className="w-full h-40 object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">📌 Trending Searches</h2>
                <div className="flex flex-wrap gap-3">
                  {mockTrending.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(term);
                        handleSearch();
                      }}
                      className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white text-sm hover:bg-indigo-200 dark:hover:bg-indigo-700"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 animate-pulse">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 h-64 rounded-xl shadow-md" />
              ))}
            </div>
          )}

          {errorMessage && !loading && (
            <p className="text-center mt-12 text-red-500 font-semibold">{errorMessage}</p>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              <AnimatePresence>
                {items.map((item, idx) => {
                  const imgSrc = item.pagemap?.cse_image?.[0]?.src;
                  return (
                    <motion.div
                      key={idx}
                      className="relative bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-all cursor-move"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      onClick={() => addToGrabBox(item)}
                    >
                      {imgSrc ? (
                        <img src={imgSrc} alt={item.title} className="w-full h-40 object-cover rounded-t-xl" />
                      ) : (
                        <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-[#46675B] dark:text-white mb-1 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{item.snippet}</p>
                        <span className="text-xs text-indigo-500 mt-2 block">{item.displayLink}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </main>

        {/* Grab Box Footer */}
        {grabBox.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-4 shadow-inner z-50">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {grabBox.map((item, idx) => (
                  <span key={idx} className="px-2 py-1 bg-indigo-200 dark:bg-indigo-700 text-xs rounded">
                    {item.title.slice(0, 25)}…
                  </span>
                ))}
              </div>
              <button
                onClick={clearGrabBox}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}