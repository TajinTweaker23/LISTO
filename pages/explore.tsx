import { useState, useEffect, useRef, useMemo } from "react";
import { Calendar, CloudSun, Globe2, Users, PartyPopper, Sparkle, HomeIcon, Sun, Moon, MapPin, Smile, BrainCircuit, Star, ChefHat, Move, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic<any>(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
import type { MarkerProps } from "react-leaflet";
const Marker = dynamic<MarkerProps>(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then(mod => mod.Popup),
  { ssr: false }
);
import { useSpring, animated } from "@react-spring/web";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
const mockWeather = {
  icon: "🌤️",
  temp: "72°F",
  desc: "Sunny with light breeze",
  suggestion: "Perfect day for a walk or volunteering outdoors!",
};

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

// Mock day plans for the Smart Plan widget
const mockDayPlans = [
  "Morning walk & coffee at a local shop",
  "Volunteer at the food bank",
  "Read a new book chapter",
  "Try a new recipe for dinner",
  "Attend a community event",
  "Plant a tree in your neighborhood",
  "Call a friend or family member",
  "Explore a new park nearby",
  "Write in your gratitude journal",
  "Support a local business",
];

// Mock micro-volunteering ideas
const mockMicroVolunteer = [
  "Pick up litter in your neighborhood",
  "Compliment a stranger",
  "Donate unused clothes",
  "Help a neighbor with groceries",
  "Write a thank-you note",
  "Plant a tree",
  "Share a positive post online",
  "Support a local business",
  "Call a friend or family member",
  "Leave a kind review for a service",
];

// Mock challenges for the Challenges section
const mockChallenges = [
  { badge: "🏆", challenge: "Do a random act of kindness" },
  { badge: "🌱", challenge: "Go plastic-free for a day" },
  { badge: "📚", challenge: "Read 10 pages of a new book" },
  { badge: "🤝", challenge: "Help a neighbor" },
  { badge: "💧", challenge: "Drink 8 glasses of water" },
  { badge: "🚲", challenge: "Bike instead of drive" },
];

const mockGIFs = [
  { src: "https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif", alt: "Inspiration" },
  { src: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif", alt: "Volunteering" },
  { src: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", alt: "Mindset" },
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

const localImages = [
  { src: "/Digital tools and devices.avif", alt: "Digital tools and devices" },
  { src: "/Dinner inspo.jpg", alt: "Dinner Inspiration" },
  { src: "/Modern Workspace.avif", alt: "Modern Workspace" },
  { src: "/Night Sky.jpg", alt: "Night Sky" },
  { src: "/Salad.jpg", alt: "Salad" },
  { src: "/Sightseeing.jpg", alt: "Sightseeing" },
  { src: "/soccer.jpg", alt: "Soccer" },
  { src: "/Studying.avif", alt: "Studying" },
  { src: "/Wellness.avif", alt: "Wellness" },
  { src: "/Work Coffee.avif", alt: "Work Coffee" },
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
  const [ecoSuggestions, setEcoSuggestions] = useState<LocalProject[]>([]);
  const [toast, setToast] = useState<string | null>(null);

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

  // Fetch real eco suggestions (replace with your API if available)
  useEffect(() => {
    async function fetchEcoSuggestions() {
      if (userLocation) {
        // Replace with your real API endpoint if available
        setEcoSuggestions(mockProjects); // fallback to mock
      }
    }
    fetchEcoSuggestions();
  }, [userLocation]);

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

  // Drag/Drop for itinerary (react-beautiful-dnd)
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(grabBox);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setGrabBox(reordered);
  };

  const addToGrabBox = (item: SearchItem) => {
    if (!grabBox.find((i) => i.link === item.link)) {
      setGrabBox([...grabBox, item]);
      setToast("Added to your kawaii itinerary! 🌸");
      setTimeout(() => setToast(null), 2000);
    }
    setShowItinerary(true);
  };
  const removeFromGrabBox = (link: string) => setGrabBox(grabBox.filter(i => i.link !== link));
  const clearGrabBox = () => setGrabBox([]);

  // Accent gradient helper
  const accentGradient = "bg-gradient-to-r from-pink-200 via-indigo-200 to-teal-200 text-transparent bg-clip-text";

  // Surprise generator
  const handleRandomizer = () => {
    setRandomIndex(Math.floor(Math.random() * mockMicroVolunteer.length));
    setHighlight("✨ Surprise: " + mockMicroVolunteer[randomIndex]);
  };

  // Eco marker icon (kawaii pastel pin)
  const ecoIcon = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    // Import leaflet only on the client
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const L = require("leaflet");
    return new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });
  }, []);

  // Animated eco impact
  const ecoImpact = grabBox.length * 1.2;
  const ecoSpring = useSpring({ number: ecoImpact, from: { number: 0 } });

  return (
    <div className={`${darkMode ? "dark" : ""} font-sans transition-all duration-300`} style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-indigo-50 to-teal-50 dark:from-indigo-950 dark:via-pink-950 dark:to-teal-950 text-gray-900 dark:text-gray-100">

        {/* NAVBAR */}
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="flex justify-between items-center bg-white/80 dark:bg-gray-900/80 shadow-xl py-4 px-8 border-b border-pink-100 dark:border-indigo-900 z-30 rounded-b-3xl"
        >
          <Link href="/">
            <HomeIcon className="w-7 h-7 text-pink-400 hover:text-indigo-500 transition cursor-pointer" />
          </Link>
          <span className={`text-2xl font-bold tracking-tight ${accentGradient} drop-shadow-lg`}>Explore LISTO</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 bg-pink-100 dark:bg-indigo-800 border border-pink-200 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-pink-900 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </motion.nav>

        {/* HIGHLIGHT BAR */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center py-2 text-base bg-white/60 dark:bg-gray-900/60 shadow-inner font-medium tracking-wide rounded-b-xl"
        >
          {highlight}
        </motion.div>

        {/* SEARCH BAR */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-pink-50 via-indigo-50 to-teal-50 dark:from-indigo-950 dark:via-pink-950 dark:to-teal-950 py-6 px-4 border-b border-pink-100 dark:border-indigo-900 backdrop-blur-xl">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <motion.input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search images, articles, places, GIFs…"
              className="flex-1 px-5 py-3 rounded-l-2xl border-2 border-pink-200 dark:border-indigo-700 bg-white/80 dark:bg-gray-900/80 text-lg focus:ring-2 focus:ring-pink-300 outline-none shadow"
              initial={{ scale: 0.97 }}
              whileFocus={{ scale: 1.03 }}
            />
            <motion.button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="px-7 py-3 bg-pink-400 text-white rounded-r-2xl font-semibold hover:bg-indigo-400 shadow transition disabled:opacity-60 disabled:cursor-not-allowed text-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              🌸
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
                <div className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center border-2 border-pink-100 dark:border-indigo-900">
                  <div className="text-3xl font-bold mb-2">{mockWeather.icon} {mockWeather.temp}</div>
                  <div className="text-lg">{mockWeather.desc}</div>
                  <div className="mt-2 text-pink-400 font-semibold">{mockWeather.suggestion}</div>
                </div>
                <div className="flex-1 bg-pink-50 dark:bg-indigo-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-2 border-pink-100 dark:border-indigo-900">
                  <Calendar className="w-7 h-7 text-pink-400 mb-2" />
                  <div className="font-bold mb-1 text-lg">Today’s Smart Plan</div>
                  <div className="text-indigo-600 dark:text-indigo-200">{mockDayPlans[recipeIndex % mockDayPlans.length]}</div>
                  <button
                    className="mt-3 px-4 py-2 bg-pink-100 dark:bg-indigo-700 text-pink-700 dark:text-white rounded-full font-medium hover:bg-pink-200 dark:hover:bg-indigo-600 transition"
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
                  <span className="text-pink-400 animate-pulse">📰</span>
                  Breaking News
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockNews.map((n, idx) => (
                    <a
                      key={idx}
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg flex items-center overflow-hidden hover:scale-[1.03] transition border-2 border-pink-100 dark:border-indigo-900"
                    >
                      <img src={n.img} alt={n.title} className="w-32 h-28 object-cover" />
                      <div className="p-4 flex-1">
                        <div className="font-semibold text-lg group-hover:text-pink-400">{n.title}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">{n.snippet}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* RANDOMIZER & CHALLENGES */}
              <div className="flex flex-col md:flex-row gap-6 mb-10">
                <div className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center border-2 border-pink-100 dark:border-indigo-900">
                  <Sparkle className="w-7 h-7 text-pink-400 mb-1" />
                  <div className="font-bold text-lg mb-2">Surprise Generator</div>
                  <div className="mb-3 text-indigo-700 dark:text-indigo-300">{mockMicroVolunteer[randomIndex]}</div>
                  <button
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-indigo-100 dark:from-indigo-800 dark:to-pink-900 text-indigo-800 dark:text-white text-sm hover:bg-pink-200 dark:hover:bg-indigo-700 font-medium shadow"
                    onClick={handleRandomizer}
                  >
                    Give me a random idea!
                  </button>
                </div>
                <div className="flex-1 bg-pink-50 dark:bg-indigo-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-2 border-pink-100 dark:border-indigo-900">
                  <PartyPopper className="w-7 h-7 text-pink-400 mb-2" />
                  <div className="font-bold mb-1 text-lg">Challenges</div>
                  <ul className="flex flex-wrap gap-2 justify-center">
                    {mockChallenges.map((c, idx) => (
                      <li key={idx} className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-sm flex items-center gap-2 font-medium border border-pink-100 dark:border-indigo-900">
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
                    className="bg-white/80 dark:bg-gray-900/80 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border-2 border-pink-100 dark:border-indigo-900 hover:border-pink-400 dark:hover:border-indigo-600 transition-all"
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

              {/* MAP: ECO-FRIENDLY LOCATIONS */}
              <div className="mb-14">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5" /> Eco-Friendly Spots Near You
                  {userLocation && <span className="flex items-center text-xs ml-3 text-pink-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {`${userLocation.lat.toFixed(2)}, ${userLocation.lng.toFixed(2)}`}
                  </span>}
                </h2>
                {userLocation && (
                  <MapContainer
                    center={[userLocation.lat, userLocation.lng]}
                    zoom={13}
                    style={{ height: "350px", width: "100%", borderRadius: "1rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
                    scrollWheelZoom={false}
                    className="mb-6"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>You are here! 🌸</Popup>
                    </Marker>
                    {ecoSuggestions.map((proj, idx) => (
                      <Marker
                        key={idx}
                        position={[proj.lat!, proj.lng!]}
                        // @ts-expect-error: icon is not in MarkerProps type but is supported by leaflet
                        icon={ecoIcon}
                        eventHandlers={{
                          click: () => setQuery(proj.title),
                        }}
                      >
                        <Popup>
                          <div className="text-center">
                            <div className="text-2xl mb-1">🌱</div>
                            <strong>{proj.title}</strong>
                            <br />
                            {proj.desc}
                            <br />
                            <button
                              className="mt-2 px-2 py-1 bg-pink-100 rounded text-pink-800 hover:bg-pink-200"
                              onClick={() => setQuery(proj.title)}
                            >
                              Add to Itinerary
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>

              {/* MICRO-VOLUNTEERING + MOOD TRACKER + ECO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 text-center border-2 border-pink-100 dark:border-indigo-900">
                  <Star className="w-6 h-6 text-yellow-300 mb-1" />
                  <div className="font-bold mb-2">Micro-Volunteering</div>
                  <div className="mb-2 text-indigo-700 dark:text-indigo-300">{mockMicroVolunteer[randomIndex]}</div>
                  <div className="text-gray-500 text-xs">Take 5 min and make a difference now.</div>
                </div>
                <div className="bg-pink-50 dark:bg-indigo-900/80 rounded-2xl shadow-lg p-6 text-center border-2 border-pink-100 dark:border-indigo-900">
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
                <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 text-center border-2 border-pink-100 dark:border-indigo-900">
                  <BrainCircuit className="w-6 h-6 text-indigo-400 mb-1" />
                  <div className="font-bold mb-2">Eco Impact Score</div>
                  <animated.div className="mb-2 text-pink-400 text-2xl font-bold">
                    <animated.span>{ecoSpring.number.to((n) => n.toFixed(1))}</animated.span> lbs CO₂ saved!
                  </animated.div>
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
                  className="flex flex-col sm:flex-row items-center gap-5 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-5 border-2 border-pink-100 dark:border-indigo-900"
                >
                  <img src="/avocado-toast.jpg" alt="Avocado Toast" className="w-32 h-32 object-cover rounded-xl mb-3" />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-pink-400 dark:text-indigo-200 mb-1">
                      {mockRecipes[recipeIndex].name}
                      <span className="ml-2 px-2 py-1 text-xs bg-pink-100 dark:bg-indigo-800 text-pink-700 dark:text-white rounded-full">{mockRecipes[recipeIndex].difficulty}</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2">{mockRecipes[recipeIndex].desc}</div>
                    <a
                      href={mockRecipes[recipeIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-indigo-500 underline font-medium"
                    >View Recipe</a>
                  </div>
                  <button
                    className="mt-3 px-3 py-2 rounded-full bg-pink-100 dark:bg-indigo-700 text-pink-700 dark:text-white font-medium hover:bg-pink-200 dark:hover:bg-indigo-600 transition"
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
                      className="overflow-hidden rounded-xl shadow-lg border-2 border-pink-100 dark:border-indigo-900"
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
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-indigo-100 dark:from-indigo-800 dark:to-pink-900 text-indigo-800 dark:text-white text-sm hover:bg-pink-200 dark:hover:bg-indigo-700 font-medium shadow"
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
              <Loader2 className="animate-spin w-12 h-12 text-pink-400" />
              <div className="text-lg text-pink-400 font-semibold">Fetching kawaii stuff…</div>
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
                      className="relative bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-pink-100 dark:border-indigo-900 transition cursor-move group"
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
                        <div className="h-40 w-full bg-pink-100 dark:bg-indigo-900 flex items-center justify-center text-pink-400">
                          No Image
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-indigo-700 dark:text-white mb-1 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{item.snippet}</p>
                        <span className="text-xs text-pink-400 mt-2 block">{item.displayLink}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </main>

        {/* GRAB BOX FOOTER + ITINERARY (Drag-and-drop) */}
        {grabBox.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 border-t-2 border-pink-100 dark:border-indigo-900 p-4 shadow-inner z-50 rounded-t-3xl">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="grabBox" direction="horizontal">
                  {(provided) => (
                    <div
                      className="flex flex-wrap gap-2"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {grabBox.map((item, idx) => (
                        <Draggable key={item.link} draggableId={item.link} index={idx}>
                          {(provided) => (
                            <span
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="px-2 py-1 bg-pink-200 dark:bg-indigo-700 text-xs rounded flex items-center gap-1 shadow border border-pink-300 dark:border-indigo-900"
                            >
                              <Move className="w-3 h-3 opacity-60" />
                              {item.title.slice(0, 25)}…
                              <button
                                className="ml-1 text-xs text-red-400 hover:text-red-600"
                                onClick={() => removeFromGrabBox(item.link)}
                              >✕</button>
                            </span>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={clearGrabBox}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
            <button
              className="absolute top-2 right-4 text-pink-400 hover:text-indigo-500 font-semibold"
              onClick={() => setShowItinerary(!showItinerary)}
            >
              {showItinerary ? "Hide Itinerary" : "Show Itinerary"}
            </button>
            {showItinerary && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-pink-50 dark:bg-indigo-900/80 rounded-xl shadow border-2 border-pink-100 dark:border-indigo-900"
              >
                <div className="font-bold mb-2 text-lg text-pink-400 dark:text-indigo-300">
                  🗺️ Your Drag & Drop Itinerary
                </div>
                <ul className="flex flex-wrap gap-3">
                  {grabBox.map((item, idx) => (
                    <li key={idx} className="bg-white/80 dark:bg-gray-800 px-3 py-2 rounded shadow text-sm flex items-center gap-2 border border-pink-100 dark:border-indigo-900">
                      <span className="font-medium">{item.title.slice(0, 30)}</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-indigo-500 underline"
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
        <motion.button
          className="fixed bottom-8 right-8 z-50 bg-indigo-500 hover:bg-pink-400 text-white rounded-full shadow-xl p-5 text-3xl border-4 border-white dark:border-indigo-900"
          whileHover={{ scale: 1.15, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label="Quick Action"
        >
          +
        </motion.button>

        {/* Toast Notification */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-36 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-indigo-900/90 px-6 py-3 rounded-full shadow-xl border-2 border-pink-200 text-pink-500 font-bold z-50"
          >
            {toast}
          </motion.div>
        )}
      </div>
    </div>
  );
}
