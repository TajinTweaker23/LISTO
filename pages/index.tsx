// pages/index.tsx

import { useState, useEffect, useRef } from "react";
import { getFirestore, doc, getDoc, collection, query, where, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseApp from "../lib/firebase";
import { getAvatarSVG } from "../components/AvatarPicker";
import { motion, AnimatePresence } from "framer-motion";
// If using shadcn/ui and lucide-react:
// import { Button } from "@/components/ui/button";
// import { Paintbrush, CalendarCheck, Star, Plus } from "lucide-react";

// --- Theme colors & fonts (edit for your branding) ---
const MAIN_BG = "bg-gradient-to-br from-[#e0e7ff] via-[#fdf6f0] to-[#fee2f2] dark:from-[#15182c] dark:via-[#181924] dark:to-[#30243a]";
const CARD_BG = "bg-white/70 dark:bg-[#181924]/80 backdrop-blur-lg";
const ACCENT = "bg-indigo-500 text-white";
const ACCENT2 = "bg-pink-500 text-white";

export default function Home() {
  const [userName, setUserName] = useState("Friend");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [moodboards, setMoodboards] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [visionItems, setVisionItems] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);
  const [quickAdd, setQuickAdd] = useState("");
  const [quickAddType, setQuickAddType] = useState("goal");
  const [quickAddSuccess, setQuickAddSuccess] = useState(false);
  const quickAddInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((snap) => {
        if (snap.exists()) {
          setUserName(snap.data().name || "Friend");
          setAvatar(snap.data().avatar || null);
        }
      });

      const qMood = query(collection(db, "moodboards"), where("userId", "==", user.uid));
      const unsubMood = onSnapshot(qMood, (querySnap) => {
        setMoodboards(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      const qEvents = query(collection(db, "events"), where("userId", "==", user.uid), orderBy("date", "asc"), limit(3));
      const unsubEvents = onSnapshot(qEvents, (querySnap) => {
        setEvents(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      const qVision = query(collection(db, "visionBoardItems"), where("userId", "==", user.uid), limit(6));
      const unsubVision = onSnapshot(qVision, (querySnap) => {
        setVisionItems(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      const qAch = query(collection(db, "achievements"), where("userId", "==", user.uid), orderBy("earnedAt", "desc"), limit(4));
      const unsubAch = onSnapshot(qAch, (querySnap) => {
        setAchievements(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });

      return () => {
        unsubMood();
        unsubEvents();
        unsubVision();
        unsubAch();
      };
    }
  }, []);

  // Animations
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.5, type: "spring" as const },
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;

  const dailyFocus = "Finish onboarding UI & plan next week’s goals!";
  const quote = "The future depends on what you do today. — Mahatma Gandhi";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

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
    <div className={MAIN_BG + " min-h-screen font-inter transition-colors duration-300"}>
      {/* Sticky Navbar */}
      <nav className="w-full sticky top-0 left-0 z-40 flex items-center justify-between px-8 py-3 shadow-md backdrop-blur-lg bg-white/80 dark:bg-[#181924]/80">
        <a href="/" className="flex items-center gap-2 font-extrabold text-lg tracking-tight text-indigo-600 dark:text-pink-300">
          <span className="text-2xl">🪄</span> LISTO
        </a>
        <div className="flex gap-3 items-center">
          <a href="/explore" className="hover:text-pink-500 transition">Explore</a>
          <a href="/moodboards" className="hover:text-indigo-500 transition">Moodboards</a>
          <a href="/calendar" className="hover:text-blue-500 transition">Calendar</a>
          <a href="/vision" className="hover:text-yellow-500 transition">Vision Board</a>
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className="px-3 py-1 bg-gray-100 hover:bg-indigo-200 dark:bg-gray-800 dark:hover:bg-pink-400 rounded shadow"
          aria-label="Toggle dark mode"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center py-10 relative overflow-hidden">
        {/* Animated Background SVG */}
        <motion.svg
          className="absolute left-0 top-0 w-full h-40 opacity-20 pointer-events-none"
          viewBox="0 0 1440 320"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          exit={fadeIn.exit}
          transition={{ duration: 0.5 }}
        >
          <motion.path
            fill="#818cf8"
            fillOpacity="0.35"
            d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            animate={{ pathLength: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
        </motion.svg>

        <motion.div className="mb-5 z-10" {...fadeIn}>
          {avatar ? (
            <motion.div
              className="w-24 h-24 rounded-full shadow-2xl bg-white flex items-center justify-center ring-4 ring-indigo-200"
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
        <motion.h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1 z-10" {...fadeIn}>
          {greeting},{" "}
          <span className="text-indigo-600 dark:text-pink-300">{userName}</span>!
        </motion.h1>
        <motion.p className="text-lg text-gray-600 dark:text-gray-300 mb-6 z-10" {...fadeIn}>
          Dream. Do. Dominate. What’s your focus today?
        </motion.p>
        <motion.div className="flex gap-4 z-10" {...fadeIn}>
          <a href="/moodboards" className="px-5 py-2 rounded-full bg-indigo-500 text-white font-semibold shadow hover:scale-105 transition">Moodboard</a>
          <a href="/calendar" className="px-5 py-2 rounded-full bg-pink-500 text-white font-semibold shadow hover:scale-105 transition">Calendar</a>
          <a href="/vision" className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow hover:scale-105 transition">Vision Board</a>
        </motion.div>
      </header>

      {/* Content Grid */}
      <main className="max-w-6xl mx-auto px-2 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Moodboards */}
        <motion.section className={CARD_BG + " rounded-2xl shadow-xl p-6 flex flex-col"} {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            🎨 Your Moodboards
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {moodboards.length === 0 && <div className="text-gray-400">No moodboards yet. Start one!</div>}
            <AnimatePresence>
              {moodboards.map((mb) => (
                <motion.div
                  key={mb.id}
                  className="rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-400 to-pink-400 text-white font-semibold shadow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  {mb.title}
                </motion.div>
              ))}
            </AnimatePresence>
            <a
              href="/moodboards/new"
              className="rounded-xl px-4 py-2 bg-gray-100 text-gray-700 font-semibold shadow hover:bg-indigo-50 transition"
            >
              + New Moodboard
            </a>
          </div>
        </motion.section>

        {/* Daily Focus */}
        <motion.section className={CARD_BG + " rounded-2xl shadow-xl p-6 flex flex-col justify-between"} {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            🎯 Today’s Focus
          </h2>
          <motion.p className="text-gray-700 dark:text-gray-300 mb-4">{dailyFocus}</motion.p>
          <div className="mt-auto">
            <motion.span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-pink-200 dark:text-pink-800 rounded-full text-xs font-semibold">
              Streak: 3 days
            </motion.span>
          </div>
        </motion.section>

        {/* Calendar */}
        <motion.section className={CARD_BG + " rounded-2xl shadow-xl p-6 flex flex-col"} {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            📅 Calendar
          </h2>
          <ul className="mb-4">
            {events.length === 0 && <li className="text-gray-400">No upcoming events.</li>}
            <AnimatePresence>
              {events.map(ev => (
                <motion.li
                  key={ev.id}
                  className="mb-2 flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span>
                  <span className="font-semibold">{ev.title}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {ev.date && new Date(ev.date.seconds ? ev.date.seconds * 1000 : ev.date).toLocaleDateString()}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <a
            href="/calendar"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:scale-105 transition font-semibold w-max"
          >
            Open Calendar
          </a>
        </motion.section>

        {/* Vision Board */}
        <motion.section className={CARD_BG + " rounded-2xl shadow-xl p-6 flex flex-col"} {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            🌈 Vision Board
          </h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {visionItems.length === 0 && <div className="col-span-3 text-gray-400">No vision board items yet.</div>}
            <AnimatePresence>
              {visionItems.map(item => (
                <motion.div
                  key={item.id}
                  className="rounded-lg overflow-hidden shadow relative group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.caption || "Vision"} className="object-cover w-full h-24" />
                  ) : (
                    <div className="w-full h-24 bg-indigo-100 flex items-center justify-center text-2xl">🌟</div>
                  )}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-xs px-2 py-1 truncate">
                      {item.caption}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <a
            href="/vision"
            className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:scale-105 transition font-semibold w-max"
          >
            Go to Vision Board
          </a>
        </motion.section>

        {/* Achievements */}
        <motion.section className={CARD_BG + " rounded-2xl shadow-xl p-6 flex flex-col items-center"} {...fadeIn}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🏆 Achievements
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {achievements.length === 0 && <div className="text-gray-400">No achievements yet.</div>}
            <AnimatePresence>
              {achievements.map(ach => (
                <motion.div
                  key={ach.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-3xl animate-bounce">{ach.icon || "⭐"}</span>
                  <span className="text-sm font-semibold mt-1">{ach.name}</span>
                  <span className="text-xs text-gray-400">{ach.earnedAt && new Date(ach.earnedAt.seconds ? ach.earnedAt.seconds * 1000 : ach.earnedAt).toLocaleDateString()}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Quick Add */}
        <motion.section className={CARD_BG + " rounded-2xl shadow-xl p-6 flex flex-col"} {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            ➕ Quick Add
          </h2>
          <form className="flex gap-2 flex-wrap" onSubmit={handleQuickAdd}>
            <select
              value={quickAddType}
              onChange={e => setQuickAddType(e.target.value)}
              className="px-2 py-2 border rounded-lg shadow-sm text-sm"
            >
              <option value="goal">Goal</option>
              <option value="event">Event</option>
              <option value="idea">Idea</option>
            </select>
            <input
              ref={quickAddInputRef}
              type="text"
              value={quickAdd}
              onChange={e => setQuickAdd(e.target.value)}
              placeholder={`Add a new ${quickAddType}...`}
              className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition font-semibold"
              disabled={!quickAdd.trim()}
            >
              Add
            </button>
          </form>
          <AnimatePresence>
            {quickAddSuccess && (
              <motion.div
                className="mt-2 text-green-600 font-semibold flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <span>✔️ Added!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Motivational Quote */}
        <motion.section className="bg-gradient-to-r from-pink-200 via-yellow-100 to-indigo-200 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center col-span-1 md:col-span-2" {...fadeIn}>
          <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 text-center mb-2">
            “{quote}”
          </blockquote>
          <span className="text-sm text-gray-500 dark:text-gray-400">— LISTO Motivation</span>
        </motion.section>
      </main>

      {/* Quick Action Floating Button */}
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
    </div>
  );
}
