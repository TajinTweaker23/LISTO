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
import { app as firebaseApp } from "../firebase";
import { getAvatarSVG } from "../components/AvatarPicker";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [userName, setUserName] = useState("Friend");
  const [avatar, setAvatar] = useState<any>(null);
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
      // User Profile
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((snap) => {
        if (snap.exists()) {
          setUserName(snap.data().name || "Friend");
          setAvatar(snap.data().avatar || null);
        }
      });

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

  if (loading) return <div className="text-center py-20">Loading...</div>;

  const dailyFocus = "Finish onboarding UI & plan next week’s goals!";
  const quote = "The future depends on what you do today. — Mahatma Gandhi";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

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
    <div className={dark ? "dark min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-pink-900" : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50"}>
      {/* Toggle button */}
      <button
        onClick={() => setDark(d => !d)}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-200 rounded shadow z-50"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Hero Section */}
      <header className="flex flex-col items-center py-10 relative overflow-hidden">
        {/* Animated SVG background */}
        <motion.svg
          className="absolute left-0 top-0 w-full h-40 opacity-20 pointer-events-none"
          viewBox="0 0 1440 320"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          exit={fadeIn.exit}
          transition={{ duration: 0.5 }}
        >
          <motion.path
            fill="#a5b4fc"
            fillOpacity="0.4"
            d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            animate={{ pathLength: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
        </motion.svg>
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
          {greeting},{" "}
          <span className="text-blue-600">{userName}</span>!
        </motion.h1>
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
      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Moodboards Card */}
        <motion.section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col" {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span role="img" aria-label="Moodboard">🎨</span> Your Moodboards
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {moodboards.length === 0 && (
              <div className="text-gray-400">No moodboards yet. Start one!</div>
            )}
            <AnimatePresence>
              {moodboards.map((mb) => (
                <motion.div
                  key={mb.id}
                  className={`rounded-xl px-4 py-2 bg-gradient-to-r from-blue-400 to-teal-300 text-white font-semibold shadow`}
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
              className="rounded-xl px-4 py-2 bg-gray-100 text-gray-700 font-semibold shadow hover:bg-blue-100 transition"
            >
              + New Moodboard
            </a>
          </div>
        </motion.section>

        {/* Daily Focus Card */}
        <motion.section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between" {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span role="img" aria-label="Focus">🎯</span> Today’s Focus
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

        {/* Calendar Card with Real Events */}
        <motion.section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col" {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span role="img" aria-label="Calendar">📅</span> Calendar
          </h2>
          <ul className="mb-4">
            {events.length === 0 && (
              <li className="text-gray-400">No upcoming events.</li>
            )}
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
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold w-max"
          >
            Open Calendar
          </a>
        </motion.section>

        {/* Vision Board Grid */}
        <motion.section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col" {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span role="img" aria-label="Vision Board">🌈</span> Vision Board
          </h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {visionItems.length === 0 && (
              <div className="col-span-3 text-gray-400">No vision board items yet.</div>
            )}
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
                    <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-2xl">🌟</div>
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
            className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-300 transition font-semibold w-max"
          >
            Go to Vision Board
          </a>
        </motion.section>

        {/* Achievements Panel */}
        <motion.section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center" {...fadeIn}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span role="img" aria-label="Achievements">🏆</span> Achievements
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {achievements.length === 0 && (
              <div className="text-gray-400">No achievements yet.</div>
            )}
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

        {/* Quick Add Card */}
        <motion.section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col" {...fadeIn}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span role="img" aria-label="Quick Add">➕</span> Quick Add
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
              className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
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

        {/* Motivational Quote Card */}
        <motion.section className="bg-gradient-to-r from-pink-200 via-yellow-100 to-blue-200 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center col-span-1 md:col-span-2" {...fadeIn}>
          <blockquote className="text-xl italic text-gray-700 text-center mb-2">
            “{quote}”
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
    </div>
  );
}