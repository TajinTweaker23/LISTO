// pages/explore.tsx
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, PlusCircle } from "lucide-react";

type SearchItem = {
  link: string;
  title: string;
  snippet: string;
  displayLink: string;
  pagemap?: {
    cse_image?: { src: string }[];
  };
};

export default function Explore() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setErrorMessage("");
    setItems([]);
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        setErrorMessage("Search failed. Try again.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        setItems(data.items);
      } else {
        setErrorMessage("No results found.");
      }
    } catch (e) {
      console.error("Error fetching search results:", e);
      setErrorMessage("Search failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#E3E8F0]">
      {/* ─── Top Navbar ────────────────────────────────────────── */}
      <nav className="flex justify-between items-center bg-white shadow py-4 px-6">
        <Link href="/" passHref>
          <HomeIcon
            className="w-6 h-6 text-[#46675B] hover:text-[#36574B] cursor-pointer"
            aria-label="Home"
          />
        </Link>
        <h1 className="text-xl font-bold text-[#46675B]">🔍 Explore LISTO</h1>
        <Link href="/profile" passHref>
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
        </Link>
      </nav>

      {/* ─── Sticky Search Bar ──────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-[#E3E8F0] py-4 px-6 border-b border-gray-200">
        <div className="flex items-center w-full max-w-4xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search images, articles, docs…"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

      {/* ─── Main Content ───────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 1) Show suggestions when no query (hero grid) */}
        {!query && !loading && items.length === 0 && (
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
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="text-5xl mb-2">{card.emoji}</div>
                <h2 className="font-semibold text-lg text-[#2e423f]">{card.title}</h2>
                <p className="text-gray-700 mt-1">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* 2) Loading Indicator */}
        {loading && <p className="text-center mt-12 text-gray-600">Loading results…</p>}

        {/* 3) Error Message */}
        {errorMessage && !loading && (
          <p className="text-center mt-12 text-red-500 font-semibold">{errorMessage}</p>
        )}

        {/* 4) Search Results Grid */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {items.map((item, idx) => {
                const imgSrc = item.pagemap?.cse_image?.[0]?.src;
                return (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transform transition"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    {/* If image exists, show it; otherwise a gray placeholder */}
                    {imgSrc ? (
                      <div className="relative h-40 w-full">
                        <img
                          src={imgSrc}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {/* “Add to board” overlay icon */}
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity">
                          <PlusCircle className="w-6 h-6 text-indigo-600 hover:text-indigo-800 cursor-pointer" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                    {/* Title / snippet / displayLink */}
                    <div className="p-4">
                      <h3 className="font-bold text-[#46675B] mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {item.snippet}
                      </p>
                      <span className="text-xs text-indigo-400 mt-2 block">
                        {item.displayLink}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
