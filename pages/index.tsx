// pages/index.tsx

import { useEffect, useState, useRef } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "../lib/firebase";
import { getAvatarSVG } from "../components/ui/AvatarPicker";
import { motion, AnimatePresence } from "framer-motion";
import FaqSection from '@/components/FaqSection';
import '../styles/faq.css';
import { Link as LinkIcon } from 'lucide-react'; // Import an icon

export default function Home() {
  const [userName, setUserName] = useState("Friend");
  const [avatar, setAvatar] = useState<any>(null);
  const [moodboards, setMoodboards] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [visionItems, setVisionItems] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]); // <-- Add state for articles
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);
  const [quickAdd, setQuickAdd] = useState("");
  const [quickAddType, setQuickAddType] = useState("goal");
  const [quickAddSuccess, setQuickAddSuccess] = useState(false);
  const [weatherGreeting, setWeatherGreeting] = useState<string>("");
  const [motivationQuote, setMotivationQuote] = useState<string>("The future depends on what you do today. — Mahatma Gandhi");
  const quickAddInputRef = useRef<HTMLInputElement>(null);

  // Quotes for the widget
  const quotes = [
    "The future depends on what you do today. — Mahatma Gandhi",
    "You are the sky. Everything else is just the weather. — Pema Chödrön",
    "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
    "I'm not a businessman, I'm a business, man. — Jay-Z",
    "I am deliberate and afraid of nothing. — Audre Lorde",
    "Today’s grind is tomorrow’s shine. — LISTO",
    "You’re closer than you think. — LISTO",
    "Let your hustle be louder than your doubts. — LISTO",
    "One day or day one. You decide. — LISTO"
  ];

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const user = auth.currentUser;

    if (user) {
      // User Profile
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((snap) => {
        if (snap.exists()) {
          setUserName(snap.data().name || "Friend");
          setAvatar(snap.data().avatar || null);
        }
      });

      // Fetch Daily News Articles
      const fetchArticles = async () => {
        try {
          const response = await fetch('/api/daily-news');
          const data = await response.json();
          if (data && Array.isArray(data)) {
            setArticles(data);
          }
        } catch (error) {
          console.error("Failed to fetch articles:", error);
        }
      };
      fetchArticles();

      // Real-time Moodboards
      const qMood = query(collection(db, "moodboards"), where("userId", "==", user.uid));
      const unsubMood = onSnapshot(qMood, (querySnap) => {
        setMoodboards(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      // Real-time Events
      const qEvents = query(
        collection(db, "events"),
        where("userId", "==", user.uid),
        orderBy("date", "asc"),
        limit(3)
      );
      const unsubEvents = onSnapshot(qEvents, (querySnap) => {
        setEvents(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      // Real-time Vision Board
      const qVision = query(
        collection(db, "visionBoardItems"),
        where("userId", "==", user.uid),
        limit(6)
      );
      const unsubVision = onSnapshot(qVision, (querySnap) => {
        setVisionItems(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      // Real-time Achievements
      const qAch = query(
        collection(db, "achievements"),
        where("userId", "==", user.uid),
        orderBy("earnedAt", "desc"),
        limit(4)
      );
      const unsubAch = onSnapshot(qAch, (querySnap) => {
        setAchievements(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });

      // Weather + motivational greeting/quote
      const hour = new Date().getHours();
      let baseGreeting;
      if (hour < 12) {
        baseGreeting = "Good morning";
      } else if (hour < 18) {
        baseGreeting = "Good afternoon";
      } else {
        baseGreeting = "Good evening";
      }

      // Weather API — FIXED AS AN EXPRESSION!
      const fetchWeather = async () => {
        try {
          // Salt Lake City default. (Change lat/lon for your city)
          const response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=40.7608&lon=-111.8910&units=imperial&appid=abffd9926f11af59e8cea4b63b40e3d7"
          );
          const data = await response.json();
          const weather = data.weather?.[0]?.main;
          const temp = Math.round(data.main?.temp);
          let weatherMsg = "";
          if (weather === "Rain") {
            weatherMsg = "Stay cozy, perfect day to reflect 🌧️";
          } else if (weather === "Clear") {
            weatherMsg = "Let’s make it a bright one ☀️";
          } else if (weather === "Clouds") {
            weatherMsg = "A calm day to dream ☁️";
          } else if (weather === "Snow") {
            weatherMsg = "Bundle up and build big dreams ❄️";
          } else if (weather === "Thunderstorm") {
            weatherMsg = "Channel the energy! ⚡";
          } else {
            weatherMsg = "Let’s make it count 🌟";
          }
          setWeatherGreeting(`${baseGreeting}, ${userName}! ${weatherMsg} (${temp}°F)`);
        } catch {
          setWeatherGreeting(`${baseGreeting}, ${userName}!`);
        }
      };
      fetchWeather();

      // Rotating motivational quote widget (different each day)
      const dateSeed = new Date().toDateString();
      const hash = dateSeed
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      setMotivationQuote(quotes[hash % quotes.length]);

      return () => {
        unsubMood();
        unsubEvents();
        unsubVision();
        unsubAch();
      };
    }
    // include userName in deps so weather greeting updates
  }, [userName]);

  // Animations
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.5, type: "spring" as const },
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  const dailyFocus = "Finish onboarding UI & plan next week’s goals!";

  // Quick Add Logic
  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const user = auth.currentUser;
    if (!user || !quickAdd.trim()) return;
    let col = "";
    let data: any = {
      userId: user.uid,
      createdAt: serverTimestamp(),
    };
    if (quickAddType === "goal") {
      col = "goals";
      data.text = quickAdd.trim();
      data.completed = false;
    } else if (quickAddType === "event") {
      col = "events";
      data.title = quickAdd.trim();
      data.date = serverTimestamp();
    } else if (quickAddType === "idea") {
      col = "ideas";
      data.text = quickAdd.trim();
    }
    await addDoc(collection(db, col), data);
    setQuickAdd("");
    setQuickAddSuccess(true);
    setTimeout(() => setQuickAddSuccess(false), 1200);
    quickAddInputRef.current?.focus();
  };

  return (
    <div className={dark ? "dark min-h-screen bg-warm-gray-900" : "min-h-screen bg-gradient-to-br from-sage-50 via-warm-gray-50 to-sage-100"}>
      {/* Sophisticated toggle button */}
      <motion.button
        onClick={() => setDark(d => !d)}
        className="absolute top-6 right-6 px-4 py-2 backdrop-blur-xl bg-white/20 border border-sage-200/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sage-700 font-medium flex items-center gap-2">
          {dark ? "☀️ Light" : "🌙 Dark"}
        </span>
      </motion.button>

      {/* Hero Section */}
      <header className="flex flex-col items-center py-10 relative overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop')"}}>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/30 dark:bg-warm-gray-900/50 backdrop-blur-sm"></div>
        
        <motion.div className="mb-4 z-10" {...fadeIn}>
          {avatar ? (
            <motion.div
              className="w-24 h-24 rounded-full shadow-lg bg-white flex items-center justify-center ring-4 ring-blue-200"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.7 }}
            >
              {getAvatarSVG(avatar)}
            </motion.div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200" />
          )}
        </motion.div>
        <motion.h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 z-10" {...fadeIn}>
          {weatherGreeting || `Good day, ${userName}!`}
        </motion.h1>
        <motion.p className="text-lg text-gray-600 mb-2 z-10 font-medium" {...fadeIn}>
          {motivationQuote}
        </motion.p>
        <motion.p className="text-lg text-gray-600 mb-6 z-10" {...fadeIn}>
          Dream. Do. Dominate. What’s your focus today?
        </motion.p>
        <motion.div className="flex gap-4 z-10" {...fadeIn}>
          <a
            href="/moodboards"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
          >
            Create Moodboard
          </a>
          <a
            href="/calendar"
            className="px-6 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition font-semibold"
          >
            Calendar
          </a>
          <a
            href="/vision"
            className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-300 transition font-semibold"
          >
            Vision Board
          </a>
        </motion.div>
        {/* Decorative animated shapes */}
        <motion.div
          className="absolute right-10 top-10 w-16 h-16 bg-pink-400 rounded-full opacity-30"
          initial={{ scale: 0.7, y: -30 }}
          animate={{ scale: [0.7, 1.1, 0.7], y: [-30, 10, -30] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-10 bottom-0 w-24 h-24 bg-blue-300 rounded-full opacity-20"
          initial={{ scale: 0.8, y: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        />
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pb-20">
        {/* Moodboards Card */}
        <motion.section 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8 flex flex-col"
          {...fadeIn}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-sage-800">
            <span className="text-2xl">🎨</span> 
            <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Your Moodboards</span>
          </h2>
          <div className="flex flex-wrap gap-3 mb-6 flex-grow">
            {moodboards.length === 0 && (
              <div className="text-sage-400 font-medium">No moodboards yet. Start creating!</div>
            )}
            <AnimatePresence>
              {moodboards.map((mb) => (
                <motion.div
                  key={mb.id}
                  className="rounded-xl px-4 py-2 bg-gradient-to-r from-sage-500 to-sage-600 text-white font-semibold shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {mb.title}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.a
            href="/moodboards/new"
            className="rounded-2xl px-6 py-3 bg-sage-100 text-sage-700 font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-center"
            whileHover={{ scale: 1.02, backgroundColor: '#e8ebe8' }}
            whileTap={{ scale: 0.98 }}
          >
            ✨ New Moodboard
          </motion.a>
        </motion.section>

        {/* Daily Focus Card */}
        <motion.section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between" {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><text y='32' font-size='32'>🎯</text></svg>" alt="Focus" className="inline w-8 h-8 align-middle" /> Today’s Focus
          </h2>
          <motion.p className="text-gray-700 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {dailyFocus}
          </motion.p>
          <div className="mt-auto">
            <motion.span
              className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Streak: 3 days
            </motion.span>
          </div>
        </motion.section>

        {/* Daily Briefing Card */}
        <motion.section
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8 flex flex-col lg:col-span-2"
          {...fadeIn}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-sage-800">
            <span className="text-2xl">📰</span>
            <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Daily Briefing</span>
          </h2>
          <ul className="space-y-3 flex-grow">
            {articles.length === 0 && (
              <li className="text-sage-400 font-medium">Loading top stories...</li>
            )}
            <AnimatePresence>
              {articles.map((article, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-sage-50 transition-colors duration-200 group"
                  >
                    <LinkIcon className="w-5 h-5 text-sage-400 group-hover:text-sage-600 transition-colors" />
                    <span className="font-semibold text-sage-700 flex-grow">{article.title}</span>
                    <span className="text-xs font-bold text-white bg-sage-400 group-hover:bg-sage-500 px-2 py-1 rounded-full transition-colors">
                      {article.source}
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.section>

        {/* Calendar Card with Real Events */}
        <motion.section 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8 flex flex-col"
          {...fadeIn}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-sage-800">
            <span className="text-2xl">📅</span> 
            <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Calendar</span>
          </h2>
          <ul className="mb-6 flex-grow space-y-3">
            {events.length === 0 && (
              <li className="text-sage-400 font-medium text-center py-4">
                <div className="text-4xl mb-2">🗓️</div>
                No upcoming events.
                <br />
                <span className="text-sm">Add one using the Quick Add below!</span>
              </li>
            )}
            <AnimatePresence>
              {events.map(ev => (
                <motion.li
                  key={ev.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-sage-50 border border-sage-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="inline-block w-3 h-3 bg-sage-400 rounded-full"></span>
                  <span className="font-semibold text-sage-700 flex-grow">{ev.title}</span>
                  <span className="text-xs text-sage-500">
                    {ev.date && new Date(ev.date.seconds ? ev.date.seconds * 1000 : ev.date).toLocaleDateString()}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <motion.a
            href="/calendar"
            className="px-6 py-3 bg-sage-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-center"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Open Calendar
          </motion.a>
        </motion.section>

        {/* Vision Board Grid */}
        <motion.section 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8 flex flex-col lg:col-span-2"
          {...fadeIn}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-sage-800">
            <span className="text-2xl">🌈</span> 
            <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Vision Board</span>
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-6 flex-grow">
            {visionItems.length === 0 && (
              <div className="col-span-3 text-white font-bold text-center py-8 flex flex-col items-center justify-center rounded-2xl bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1200&auto=format&fit=crop')"}}>
                <div className="bg-black/30 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl mb-2">✨</div>
                  Visualize your dreams.
                  <br />
                  <span className="text-sm font-normal">Add your first vision board item.</span>
                </div>
              </div>
            )}
            <AnimatePresence>
              {visionItems.map(item => (
                <motion.div
                  key={item.id}
                  className="rounded-2xl overflow-hidden shadow-lg relative group bg-sage-50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.caption || "Vision"} className="object-cover w-full h-28" />
                  ) : (
                    <div className="w-full h-28 bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center text-3xl">🌟</div>
                  )}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-sage-900/70 backdrop-blur-sm text-white text-xs px-3 py-2 truncate">
                      {item.caption}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.a
            href="/vision"
            className="px-6 py-3 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-center"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Go to Vision Board
          </motion.a>
        </motion.section>

        {/* Achievements Panel */}
        <motion.section 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8 flex flex-col"
          {...fadeIn}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-sage-800">
            <span className="text-2xl">🏆</span> 
            <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Achievements</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center flex-grow">
            {achievements.length === 0 && (
              <div className="text-sage-400 font-medium text-center py-4">No achievements yet. Keep going!</div>
            )}
            <AnimatePresence>
              {achievements.map(ach => (
                <motion.div
                  key={ach.id}
                  className="flex flex-col items-center p-4 rounded-2xl bg-sage-50 border border-sage-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="text-4xl mb-2">{ach.icon || "⭐"}</span>
                  <span className="text-sm font-semibold text-sage-700 text-center">{ach.name}</span>
                  <span className="text-xs text-sage-400 mt-1">
                    {ach.earnedAt && new Date(ach.earnedAt.seconds ? ach.earnedAt.seconds * 1000 : ach.earnedAt).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Quick Add Card */}
        <motion.section 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8 flex flex-col lg:col-span-2"
          {...fadeIn}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-sage-800">
            <span className="text-2xl">➕</span> 
            <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Quick Add</span>
          </h2>
          <form className="flex gap-4 flex-wrap" onSubmit={handleQuickAdd}>
            <select
              value={quickAddType}
              onChange={e => setQuickAddType(e.target.value)}
              className="px-4 py-3 border border-sage-200 rounded-2xl shadow-sm text-sm font-medium text-sage-700 bg-white focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-all"
            >
              <option value="goal">🎯 Goal</option>
              <option value="event">📅 Event</option>
              <option value="idea">💡 Idea</option>
            </select>
            <input
              ref={quickAddInputRef}
              type="text"
              value={quickAdd}
              onChange={e => setQuickAdd(e.target.value)}
              placeholder={`Add a new ${quickAddType}...`}
              className="flex-1 px-4 py-3 border border-sage-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-all bg-white text-sage-700"
            />
            <motion.button
              type="submit"
              className="px-6 py-3 bg-sage-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!quickAdd.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add ✨
            </motion.button>
          </form>
          <AnimatePresence>
            {quickAddSuccess && (
              <motion.div
                className="mt-4 text-sage-600 font-semibold flex items-center gap-3 p-3 bg-sage-100 rounded-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-lg">✅</span> Successfully added!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Motivational Quote Card */}
        <motion.section className="bg-gradient-to-r from-pink-200 via-yellow-100 to-blue-200 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center col-span-1 md:col-span-2" {...fadeIn}>
          <blockquote className="text-xl italic text-gray-700 text-center mb-2">
            “{motivationQuote}”
          </blockquote>
          <span className="text-sm text-gray-500">— LISTO Motivation</span>
        </motion.section>

        {/* Animated Decorative Block */}
        <motion.section
          className="col-span-1 md:col-span-2 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring" }}
        >
          <motion.div
            className="w-40 h-24 rounded-2xl bg-gradient-to-br from-blue-400 via-pink-400 to-yellow-300 shadow-xl flex items-center justify-center text-4xl font-extrabold text-white"
            initial={{ rotate: -8 }}
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          >
            🚀 Keep Going!
          </motion.div>
        </motion.section>
      </main>

      <FaqSection />

      {/* Sophisticated Quick Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-sage-600 hover:bg-sage-700 text-white rounded-full shadow-2xl p-6 text-2xl border-4 border-white/50 backdrop-blur-sm"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        aria-label="Quick Action"
      >
        ✨
      </motion.button>
    </div>
  );
}
