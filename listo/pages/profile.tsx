// pages/profile.tsx

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/ui/Navbar";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import AvatarPicker, { getAvatarSVG } from "../components/AvatarPicker";
import { toPng } from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";

// Diverse preset avatars
const presetAvatars = [
  { name: "Sunny", avatar: { skin: "#f9dcc4", hair: "#ffe066", hairStyle: "long", vibe: "optimist" } },
  { name: "Chill", avatar: { skin: "#e0ac69", hair: "#222", hairStyle: "short", vibe: "chill" } },
  { name: "Bookworm", avatar: { skin: "#8d5524", hair: "#b0b0b0", hairStyle: "curly", vibe: "bookworm" } },
  { name: "Artist", avatar: { skin: "#e0ac69", hair: "#d2691e", hairStyle: "long", vibe: "artist" } },
  { name: "Gamer", avatar: { skin: "#f9dcc4", hair: "#222", hairStyle: "short", hat: "cap", vibe: "gamer" } },
  { name: "Gardener", avatar: { skin: "#8d5524", hair: "#8d5524", hairStyle: "curly", hat: "beanie", vibe: "gardener" } },
  { name: "Preppy", avatar: { skin: "#f9dcc4", hair: "#b0b0b0", hairStyle: "short", vibe: "preppy" } },
  { name: "Activist", avatar: { skin: "#e0ac69", hair: "#222", hairStyle: "long", vibe: "activist" } },
  { name: "Fashionista", avatar: { skin: "#f9dcc4", hair: "#ffe066", hairStyle: "long", accessory: "glasses", vibe: "fashionista" } },
  { name: "Minimalist", avatar: { skin: "#e0ac69", hair: "#b0b0b0", hairStyle: "bald", vibe: "minimalist" } },
];

// Example static community avatars (replace with backend fetch later)
const communityAvatars = [
  { user: "Alex", avatar: { skin: "#e0ac69", hair: "#222", hairStyle: "short", vibe: "gamer" } },
  { user: "Sam", avatar: { skin: "#f9dcc4", hair: "#d2691e", hairStyle: "curly", vibe: "artist" } },
  { user: "Taylor", avatar: { skin: "#8d5524", hair: "#b0b0b0", hairStyle: "long", vibe: "chill" } },
  { user: "Jordan", avatar: { skin: "#f9dcc4", hair: "#ffe066", hairStyle: "long", vibe: "optimist" } },
  { user: "Morgan", avatar: { skin: "#e0ac69", hair: "#8d5524", hairStyle: "short", vibe: "preppy" } },
];

// Themes (add more as needed)
const themes = [
  {
    name: "Blue/Teal",
    value: "bg-gradient-to-r from-blue-900 to-teal-600",
    swatch: "bg-gradient-to-r from-blue-900 to-teal-600"
  },
  {
    name: "Pink/Yellow",
    value: "bg-gradient-to-r from-pink-500 to-yellow-300",
    swatch: "bg-gradient-to-r from-pink-500 to-yellow-300"
  },
  {
    name: "Green/Blue",
    value: "bg-gradient-to-r from-green-400 to-blue-500",
    swatch: "bg-gradient-to-r from-green-400 to-blue-500"
  },
  {
    name: "Minimal",
    value: "bg-gray-100",
    swatch: "bg-gray-100"
  }
];

// Confetti animation on badge earn (just for demo, can be replaced)
const Confetti = () => (
  <motion.div
    className="fixed inset-0 z-50 pointer-events-none flex justify-center items-center"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.7 }}
    transition={{ duration: 0.7 }}
  >
    <span role="img" aria-label="confetti" className="text-7xl select-none">🎉</span>
  </motion.div>
);

export default function Profile() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [social, setSocial] = useState({ twitter: "", instagram: "" });
  const [unlocked, setUnlocked] = useState<string[]>(["cap", "beanie"]);
  const [theme, setTheme] = useState(themes[0].value);
  const [showConfetti, setShowConfetti] = useState(false);
  const [avatarSaved, setAvatarSaved] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const avatarRef = useRef<HTMLDivElement>(null);

  // Sync avatar to localStorage automatically
  useEffect(() => {
    if (avatar) {
      localStorage.setItem("listoAvatar", JSON.stringify(avatar));
      // Confetti on first avatar save
      if (!avatarSaved) {
        setShowConfetti(true);
        setAvatarSaved(true);
        setTimeout(() => setShowConfetti(false), 1300);
      }
    }
  }, [avatar]);

  // Load all profile info from localStorage on mount
  useEffect(() => {
    setUserName(localStorage.getItem("listoUserName") || "");
    setNewName(localStorage.getItem("listoUserName") || "");
    setBio(localStorage.getItem("listoBio") || "");
    setSocial({
      twitter: localStorage.getItem("listoTwitter") || "",
      instagram: localStorage.getItem("listoInstagram") || "",
    });
    const stored = localStorage.getItem("listoAvatar");
    setAvatar(stored ? JSON.parse(stored) : null);
    const unlockedItems = localStorage.getItem("listoUnlocked");
    if (unlockedItems) setUnlocked(JSON.parse(unlockedItems));
    setTheme(localStorage.getItem("listoTheme") || themes[0].value);
  }, []);

  // Save on major profile changes
  const handleSave = () => {
    localStorage.setItem("listoAvatar", JSON.stringify(avatar));
    localStorage.setItem("listoUserName", userName);
    localStorage.setItem("listoBio", bio);
    localStorage.setItem("listoTwitter", social.twitter);
    localStorage.setItem("listoInstagram", social.instagram);
    localStorage.setItem("listoTheme", theme);
    alert("Profile updated!");
  };

  const handleNameEdit = () => {
    setUserName(newName);
    setEditingName(false);
    localStorage.setItem("listoUserName", newName);
  };

  const handleBioEdit = () => {
    setBio(bio);
    setEditingBio(false);
    localStorage.setItem("listoBio", bio);
  };

  const handleExport = async () => {
    if (!avatarRef.current) return;
    const dataUrl = await toPng(avatarRef.current, { cacheBust: true });
    const link = document.createElement("a");
    link.download = "my-listo-avatar.png";
    link.href = dataUrl;
    link.click();
  };

  const handleShare = async () => {
    if (!avatarRef.current) return;
    const dataUrl = await toPng(avatarRef.current, { cacheBust: true });
    if (navigator.share) {
      await navigator.share({
        title: "Check out my LISTO avatar!",
        text: "This is my custom avatar from LISTO.",
        files: [
          new File([await (await fetch(dataUrl)).blob()], "avatar.png", { type: "image/png" }),
        ],
      });
    } else {
      alert("Sharing is not supported on this device. Please download instead.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-700 mb-4">You are not logged in.</p>
        <Link href="/login" passHref>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme} transition-colors duration-500`}>
      <Navbar theme={theme} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>My Profile</span>
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-2xl"
            role="img"
            aria-label="sparkle"
          >
            ✨
          </motion.span>
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-white p-6 rounded shadow flex flex-col gap-2">
            <p>
              <strong className="text-gray-700">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="text-gray-700">UID:</strong> {user.uid}
            </p>
            <div className="flex items-center mt-2 gap-2">
              <span className="text-gray-500 text-xs">Theme preview:</span>
              <span className={`inline-block w-6 h-6 rounded-full border-2 border-gray-300 ${theme}`} />
            </div>
          </div>

          {/* Fun Stats/Info Cards (example, can be replaced by real stats) */}
          <div className="flex gap-4 justify-around">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-indigo-600">6</span>
              <span className="text-xs text-gray-500">Badges</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-600">5</span>
              <span className="text-xs text-gray-500">Avatars Used</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-pink-600">24</span>
              <span className="text-xs text-gray-500">Edits</span>
            </div>
          </div>
        </section>

        <div className="max-w-2xl mx-auto p-6">
          <div className="flex flex-col items-center mb-6">
            <motion.div
              ref={avatarRef}
              className="mb-2"
              aria-label="Your avatar"
              role="img"
              tabIndex={0}
              key={JSON.stringify(avatar)}
              initial={{ scale: 0.95, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {getAvatarSVG(avatar)}
            </motion.div>

            <div className="text-lg font-semibold flex items-center gap-2">
              {editingName ? (
                <>
                  <input
                    className="border rounded px-2 py-1"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    aria-label="Edit name"
                  />
                  <button
                    className="ml-2 px-2 py-1 bg-green-600 text-white rounded"
                    onClick={handleNameEdit}
                  >
                    Save
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-gray-300 rounded"
                    onClick={() => setEditingName(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{userName}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
                    onClick={() => setEditingName(true)}
                    aria-label="Edit name"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>

            {/* Bio */}
            <div className="mt-2 w-full text-center">
              {editingBio ? (
                <>
                  <textarea
                    className="border rounded px-2 py-1 w-full"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    aria-label="Edit bio"
                  />
                  <button
                    className="mt-1 px-2 py-1 bg-green-600 text-white rounded"
                    onClick={handleBioEdit}
                  >
                    Save
                  </button>
                  <button
                    className="mt-1 px-2 py-1 bg-gray-300 rounded"
                    onClick={() => setEditingBio(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <motion.p
                    className="text-gray-700"
                    initial={{ opacity: 0.7, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {bio || "Add a short bio..."}
                  </motion.p>
                  <button
                    className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
                    onClick={() => setEditingBio(true)}
                    aria-label="Edit bio"
                  >
                    Edit Bio
                  </button>
                </>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-2 flex flex-col items-center gap-2">
              <input
                className="border rounded px-2 py-1"
                placeholder="Twitter handle"
                value={social.twitter}
                onChange={e => setSocial(s => ({ ...s, twitter: e.target.value }))}
                aria-label="Twitter"
              />
              <input
                className="border rounded px-2 py-1"
                placeholder="Instagram handle"
                value={social.instagram}
                onChange={e => setSocial(s => ({ ...s, instagram: e.target.value }))}
                aria-label="Instagram"
              />
            </div>
          </div>

          {/* Avatar Picker */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>Customize Your Avatar</span>
              <span className="text-yellow-400 text-lg" title="Express yourself!">🖌️</span>
            </h2>
            <AvatarPicker
              value={avatar}
              onChange={av => {
                setAvatar(av);
                localStorage.setItem("listoAvatar", JSON.stringify(av));
                setAvatarSaved(true);
              }}
              aria-label="Avatar customization"
              unlocked={unlocked}
            />
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
                onClick={handleExport}
                aria-label="Download avatar as PNG"
              >
                Download Avatar
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
                onClick={handleShare}
                aria-label="Share avatar"
              >
                Share Avatar
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">
              <span>Unlocked items: {unlocked.join(", ") || "None yet"}</span>
            </div>
          </div>

          {/* Preset Avatars */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Try a Preset Avatar</h2>
            <div className="flex gap-4 flex-wrap justify-center">
              {presetAvatars.map((preset) => (
                <motion.button
                  key={preset.name}
                  className={`flex flex-col items-center border rounded p-2 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300 transition ${selectedPreset === preset.name ? "ring-4 ring-blue-400" : ""}`}
                  onClick={() => {
                    setAvatar(preset.avatar);
                    setSelectedPreset(preset.name);
                    setTimeout(() => setSelectedPreset(null), 1200);
                  }}
                  aria-label={`Use preset avatar: ${preset.name}`}
                  whileTap={{ scale: 1.08 }}
                >
                  <div style={{ width: 48, height: 72 }}>{getAvatarSVG(preset.avatar)}</div>
                  <span className="text-xs mt-1">{preset.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Community Gallery */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Community Gallery</h2>
            <div className="flex gap-4 flex-wrap justify-center">
              {communityAvatars.map((entry, idx) => (
                <motion.div
                  key={entry.user + idx}
                  className="flex flex-col items-center border rounded p-2 bg-gray-50"
                  aria-label={`Community avatar: ${entry.user}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div style={{ width: 48, height: 72 }}>{getAvatarSVG(entry.avatar)}</div>
                  <span className="text-xs mt-1">{entry.user}</span>
                  <span className="text-xs text-gray-500">{entry.avatar.vibe}</span>
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2 text-center">
              Want to see your avatar here? (Coming soon!)
            </div>
          </div>

          {/* Theme Picker */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Profile Theme</h2>
            <div className="flex gap-2 flex-wrap">
              {themes.map((t) => (
                <button
                  key={t.value}
                  className={`flex items-center gap-1 px-3 py-1 rounded transition border ${theme === t.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"}`}
                  onClick={() => setTheme(t.value)}
                >
                  <span className={`inline-block w-5 h-5 rounded-full ${t.swatch} border`} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Achievements/Badges */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Achievements</h2>
            <div className="flex gap-2 flex-wrap">
              {unlocked.includes("cap") && (
                <motion.span
                  className="inline-block px-2 py-1 bg-yellow-200 rounded text-xs"
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >🧢 Cap Unlocked</motion.span>
              )}
              {unlocked.includes("beanie") && (
                <motion.span className="inline-block px-2 py-1 bg-yellow-200 rounded text-xs" initial={{ scale: 0.8, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>🧢 Beanie Unlocked</motion.span>
              )}
              {unlocked.includes("glasses") && (
                <motion.span className="inline-block px-2 py-1 bg-blue-200 rounded text-xs" initial={{ scale: 0.8, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>👓 Glasses Unlocked</motion.span>
              )}
              {unlocked.includes("hoodie") && (
                <motion.span className="inline-block px-2 py-1 bg-green-200 rounded text-xs" initial={{ scale: 0.8, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>🧥 Hoodie Unlocked</motion.span>
              )}
              {unlocked.includes("fedora") && (
                <motion.span className="inline-block px-2 py-1 bg-purple-200 rounded text-xs" initial={{ scale: 0.8, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>🎩 Fedora Unlocked</motion.span>
              )}
              {avatar && (
                <motion.span className="inline-block px-2 py-1 bg-pink-200 rounded text-xs" initial={{ scale: 0.7, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>🎨 Avatar Saved</motion.span>
              )}
              {bio && (
                <motion.span className="inline-block px-2 py-1 bg-orange-200 rounded text-xs" initial={{ scale: 0.7, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>📝 Bio Added</motion.span>
              )}
              {userName && (
                <motion.span className="inline-block px-2 py-1 bg-blue-100 rounded text-xs" initial={{ scale: 0.7, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>🙋 Name Set</motion.span>
              )}
              {unlocked.length >= 5 && (
                <motion.span className="inline-block px-2 py-1 bg-indigo-200 rounded text-xs" initial={{ scale: 0.7, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>🏆 5+ Items Unlocked</motion.span>
              )}
            </div>
          </div>
          <motion.button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition w-full"
            onClick={handleSave}
            aria-label="Save profile changes"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Save Changes
          </motion.button>
        </div>
      </main>

      {/* Confetti on first avatar save */}
      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>

      {/* Floating Action Button */}
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
