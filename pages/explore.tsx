import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  Sun,
  Moon,
  Trash2,
  Globe2,
  MapPin,
  Loader2,
  Move,
  Sparkle,
  Smile,
  Star,
  CloudSun,
  Calendar,
  PartyPopper,
  Users,
  ChefHat,
  PlusCircle,
  BrainCircuit,
} from "lucide-react";

// --- Types
type SearchItem = {
  link: string;
  title: string;
  snippet: string;
  displayLink: string;
  pagemap?: { cse_image?: { src: string }[] };
  location?: { lat: number; lng: number };
};

type LocalProject = {
  title: string;
  desc: string;
  lat?: number;
  lng?: number;
  img?: string;
};

type Recipe = {
  name: string;
  desc: string;
  img: string;
  difficulty: string;
  link: string;
};

// --- Mocks & Demo Data ---
const highlights = [
  "🧠 Learn something new today",
  "🌍 Explore world-changing ideas",
  "🧰 Build your dream life",
  "💪 Empower your purpose",
  "🧑‍🍳 Try a new recipe tonight",
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

const mockEvents = [
  {
    title: "Free Yoga in the Park",
    date: "Sat 8:30am",
    where: "Liberty Park",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=300&q=80",
  },
  {
    title: "Night Market & Food Fest",
    date: "Fri 6pm",
    where: "Main Street",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=300&q=80",
  },
  {
    title: "Volunteer Trail Clean-Up",
    date: "Sun 9am",
    where: "Emigration Canyon",
    img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?fit=crop&w=300&q=80",
  },
];

const mockChallenges = [
  { challenge: "Do a random act of kindness", badge: "🌟" },
  { challenge: "Call or text a family member", badge: "📱" },
  { challenge: "Walk or bike instead of drive", badge: "🚴" },
  { challenge: "Try a plant-based meal", badge: "🥗" },
  { challenge: "Donate 30 min to a local cause", badge: "⏱️" },
];

const mockMicroVolunteer = [
  "Write a thank-you note for a teacher online",
  "Pick up 5 pieces of litter on your walk",
  "Suggest a book to a friend",
  "Comment a compliment on a local artist’s page",
  "Share an emergency number/resource on social media",
];

const mockIcebreakers = [
  "Find someone with the same shoes as you & say hi!",
  "Ask a stranger what they’re listening to right now.",
  "Offer to take a group’s photo at a local event.",
  "Strike up a convo at a local coffee shop.",
];

const mockWeather = {
  icon: <CloudSun className="w-7 h-7 inline-block text-yellow-300 animate-bounce" />,
  temp: "77°F",
  desc: "Sunny, mild breeze",
  suggestion: "Perfect weather for a picnic or outdoor activity.",
};

const mockDayPlans = [
  "Morning: Coffee at a local café → Farmer’s Market → Walk in the park.",
  "Afternoon: Thrift store browsing → Try a new food truck → Public art walk.",
  "Evening: Community game night → Sunset viewpoint → Dessert shop stop.",
];

const mockRecipes: Recipe[] = [
  {
    name: "15-min Avocado Toast Remix",
    desc: "Sourdough, smashed avo, chili flakes, drizzle of honey.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=400&q=80",
    difficulty: "Easy",
    link: "https://www.allrecipes.com/recipe/240708/avocado-toast/",
  },
  {
    name: "One-Pan Lemon Garlic Chicken",
    desc: "Juicy chicken breast, roasted with lemon and garlic.",
    img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?fit=crop&w=400&q=80",
    difficulty: "Beginner",
    link: "https://www.delish.com/cooking/recipe-ideas/a22889405/lemon-garlic-chicken-recipe/",
  },
  {
    name: "Creamy Vegan Pasta",
    desc: "Cashew cream, spinach, tomatoes, penne.",
    img: "https://images.unsplash.com/photo-1512058564366-c9e2b1e01b63?fit=crop&w=400&q=80",
    difficulty: "Medium",
    link: "https://minimalistbaker.com/creamy-vegan-garlic-pasta/",
  },
];

// --- Main Component
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
  const [mood, setMood] = useState<string | null>(null);
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Animate highlight bar
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight((prev) => {
        const idx = highlights.indexOf(prev);
        return highlights[(idx + 1) % highlights.length];
      });
      setRecipeIndex((i) => (i + 1) % mockRecipes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get user's location
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

  // Drag/Drop for itinerary
  const addToGrabBox = (item: SearchItem) => {
    if (!grabBox.find((i) => i.link === item.link)) setGrabBox([...grabBox, item]);
    setShowItinerary(true);
  };
  const removeFromGrabBox = (link: string) => setGrabBox(grabBox.filter(i => i.link !== link));
  const clearGrabBox = () => setGrabBox([]);

  // Nearby projects
  const getNearbyProjects = () => {
    if (!userLocation) return mockProjects;
    return [...mockProjects].sort(
      (a, b) =>
        Math.abs((a.lat ?? 0) - userLocation.lat) + Math.abs((a.lng ?? 0) - userLocation.lng) -
        (Math.abs((b.lat ?? 0) - userLocation.lat) + Math.abs((b.lng ?? 0) - userLocation.lng))
    );
  };

  // Accent gradient helper
  const accentGradient = "bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400 text-transparent bg-clip-text";

  // Surprise generator
  const handleRandomizer = () => {
    setRandomIndex(Math.floor(Math.random() * mockMicroVolunteer.length));
    setHighlight("✨ Surprise: " + mockMicroVolunteer[randomIndex]);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} font-sans transition-all duration-300`}>
      <div className="min-h-screen bg-[#F5F8FB] dark:bg-gray-950 text-gray-900 dark:text-gray-100">

        {/* NAVBAR */}
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

        {/* HIGHLIGHT BAR */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center py-2 text-base bg-white dark:bg-gray-900 shadow-inner font-medium tracking-wide"
        >
          {highlight}
        </motion.div>

        {/* SEARCH BAR */}
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

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 py-10" ref={resultsRef}>
          {/* ---- ENHANCED EMPTY STATE ---- */}
          {!query && !loading && items.length === 0 && (
            <div>
              {/* WEATHER + DAY PLANNER */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-bold mb-2">{mockWeather.icon} {mockWeather.temp}</div>
                  <div className="text-lg">{mockWeather.desc}</div>
                  <div className="mt-2 text-indigo-500 font-semibold">{mockWeather.suggestion}</div>
                </div>
                <div className="flex-1 bg-indigo-50 dark:bg-indigo-900 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                  <Calendar className="w-7 h-7 text-indigo-400 mb-2" />
                  <div className="font-bold mb-1 text-lg">Today’s Smart Plan</div>
                  <div className="text-indigo-600 dark:text-indigo-200">{mockDayPlans[recipeIndex % mockDayPlans.length]}</div>
                  <button
                    className="mt-3 px-4 py-2 bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white rounded-full font-medium hover:bg-indigo-200 dark:hover:bg-indigo-600 transition"
                    onClick={() => setRecipeIndex((i) => (i + 1) % mockDayPlans.length)}
                  >
                    Shuffle Plan
                  </button>
                </div>
              </div>

              {/* BREAKING NEWS */}
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

              {/* RANDOMIZER & CHALLENGES */}
              <div className="flex flex-col md:flex-row gap-6 mb-10">
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
                  <Sparkle className="w-7 h-7 text-pink-400 mb-1" />
                  <div className="font-bold text-lg mb-2">Surprise Generator</div>
                  <div className="mb-3 text-indigo-700 dark:text-indigo-300">{mockMicroVolunteer[randomIndex]}</div>
                  <button
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-indigo-800 dark:to-pink-900 text-indigo-800 dark:text-white text-sm hover:bg-indigo-200 dark:hover:bg-indigo-700 font-medium shadow"
                    onClick={handleRandomizer}
                  >
                    Give me a random idea!
                  </button>
                </div>
                <div className="flex-1 bg-indigo-50 dark:bg-indigo-900 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                  <PartyPopper className="w-7 h-7 text-indigo-400 mb-2" />
                  <div className="font-bold mb-1 text-lg">Challenges</div>
                  <ul className="flex flex-wrap gap-2 justify-center">
                    {mockChallenges.map((c, idx) => (
                      <li key={idx} className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-sm flex items-center gap-2 font-medium">
                        <span>{c.badge}</span> {c.challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* QUICK EXPLORE CARDS */}
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

              {/* LOCAL EVENTS + MEET SOMEONE */}
              <div className="flex flex-col md:flex-row gap-6 mb-10">
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                  <Users className="w-6 h-6 text-indigo-400 mb-1" />
                  <div className="font-bold text-lg mb-3">Meet Someone New</div>
                  <div className="text-indigo-600 dark:text-indigo-300 mb-3">{mockIcebreakers[randomIndex % mockIcebreakers.length]}</div>
                  <div className="text-gray-500 text-sm">Get out of your comfort zone, safely.</div>
                </div>
                <div className="flex-1 bg-indigo-50 dark:bg-indigo-900 rounded-2xl shadow-lg p-6">
                  <Calendar className="w-6 h-6 text-indigo-400 mb-1" />
                  <div className="font-bold text-lg mb-3">Local Events</div>
                  <ul className="flex flex-col gap-2">
                    {mockEvents.map((ev, idx) => (
                      <li key={idx} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow px-2 py-2">
                        <img src={ev.img} alt={ev.title} className="w-12 h-12 object-cover rounded-md" />
                        <div>
                          <div className="font-semibold text-indigo-800 dark:text-indigo-200">{ev.title}</div>
                          <div className="text-xs text-gray-500">{ev.date} @ {ev.where}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* HUMANITARIAN PROJECTS NEAR YOU */}
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
                      onClick={() => setQuery(proj.title)}
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

              {/* MICRO-VOLUNTEERING + MOOD TRACKER + ECO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-center">
                  <Star className="w-6 h-6 text-yellow-300 mb-1" />
                  <div className="font-bold mb-2">Micro-Volunteering</div>
                  <div className="mb-2 text-indigo-700 dark:text-indigo-300">{mockMicroVolunteer[randomIndex]}</div>
                  <div className="text-gray-500 text-xs">Take 5 min and make a difference now.</div>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900 rounded-2xl shadow-lg p-6 text-center">
                  <Smile className="w-6 h-6 text-pink-400 mb-1" />
                  <div className="font-bold mb-2">Mood Tracker</div>
                  <div className="mb-2 text-indigo-700 dark:text-indigo-200">
                    {mood ? `Your current mood: ${mood}` : "How are you feeling today?"}
                  </div>
                  <div className="flex gap-2 justify-center">
                    {["😃", "🙂", "😐", "😢", "😡"].map((emoji, idx) => (
                      <button key={idx} className="text-2xl hover:scale-125 transition" onClick={() => setMood(emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-center">
                  <BrainCircuit className="w-6 h-6 text-indigo-400 mb-1" />
                  <div className="font-bold mb-2">Eco Impact Score</div>
                  <div className="mb-2 text-indigo-700 dark:text-indigo-300">Combining these tasks saves an estimated 1.2 lbs CO₂!</div>
                  <div className="text-gray-500 text-xs">Optimize your day, reduce your footprint.</div>
                </div>
              </div>

              {/* LEARN TO COOK WIDGET */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-14"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ChefHat className="w-5 h-5" /> Learn to Cook: Easy Recipe of the Day
                </h2>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col sm:flex-row items-center gap-5 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5"
                >
                  <img src={mockRecipes[recipeIndex].img} alt={mockRecipes[recipeIndex].name} className="w-32 h-32 object-cover rounded-xl mb-3" />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-indigo-700 dark:text-indigo-200 mb-1">
                      {mockRecipes[recipeIndex].name}
                      <span className="ml-2 px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white rounded-full">{mockRecipes[recipeIndex].difficulty}</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2">{mockRecipes[recipeIndex].desc}</div>
                    <a
                      href={mockRecipes[recipeIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-pink-500 underline font-medium"
                    >View Recipe</a>
                  </div>
                  <button
                    className="mt-3 px-3 py-2 rounded-full bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white font-medium hover:bg-indigo-200 dark:hover:bg-indigo-600 transition"
                    onClick={() => setRecipeIndex((i) => (i + 1) % mockRecipes.length)}
                  >
                    Next Recipe
                  </button>
                </motion.div>
              </motion.div>

              {/* TRENDING GIFS */}
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

              {/* TRENDING SEARCHES */}
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

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center mt-16 gap-8">
              <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
              <div className="text-lg text-indigo-600 font-semibold">Fetching awesome stuff…</div>
            </div>
          )}

          {/* ERROR */}
          {errorMessage && !loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12 text-red-500 font-semibold"
            >
              {errorMessage}
            </motion.p>
          )}

          {/* SEARCH RESULTS */}
          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
              <AnimatePresence>
                {items.map((item, idx) => {
                  const imgSrc = item.pagemap?.cse_image?.[0]?.src;
                  return (
                    <motion.div
                      key={idx}
                      className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition cursor-move group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      onClick={() => addToGrabBox(item)}
                      tabIndex={0}
                    >
                      {imgSrc ? (
                        <img src={imgSrc} alt={item.title} className="w-full h-40 object-cover rounded-t-2xl" />
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

        {/* GRAB BOX FOOTER + ITINERARY */}
        {grabBox.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-4 shadow-inner z-50">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {grabBox.map((item, idx) => (
                  <span key={idx} className="px-2 py-1 bg-indigo-200 dark:bg-indigo-700 text-xs rounded flex items-center gap-1">
                    <Move className="w-3 h-3 opacity-60" />
                    {item.title.slice(0, 25)}…
                    <button
                      className="ml-1 text-xs text-red-400 hover:text-red-600"
                      onClick={() => removeFromGrabBox(item.link)}
                    >✕</button>
                  </span>
                ))}
              </div>
              <button
                onClick={clearGrabBox}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
            <button
              className="absolute top-2 right-4 text-indigo-500 hover:text-pink-500 font-semibold"
              onClick={() => setShowItinerary(!showItinerary)}
            >
              {showItinerary ? "Hide Itinerary" : "Show Itinerary"}
            </button>
            {showItinerary && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-xl shadow"
              >
                <div className="font-bold mb-2 text-lg text-indigo-700 dark:text-indigo-300">
                  🗺️ Your Drag & Drop Itinerary
                </div>
                <ul className="flex flex-wrap gap-3">
                  {grabBox.map((item, idx) => (
                    <li key={idx} className="bg-white dark:bg-gray-800 px-3 py-2 rounded shadow text-sm flex items-center gap-2">
                      <span className="font-medium">{item.title.slice(0, 30)}</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:text-pink-500 underline"
                      >Visit</a>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-300">
                  * Drag items here as you explore. Plan your day to reduce extra travel & make the most of your trip!
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}