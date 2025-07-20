import React, { useState, useEffect, useRef } from "react";
import AvatarPicker, { AvatarPickerProps } from "../components/ui/AvatarPicker";
import Navbar from "../components/ui/Navbar";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { toPng } from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";

// ---- Example getAvatarSVG function (add/adjust as needed) ----
function getAvatarSVG(avatar: any) {
  // Implement this according to your Avatar system!
  // Example: return <svg>...</svg>;
  return avatar ? <img src={avatar.url || ""} alt="Avatar" /> : <span>🧑</span>;
}

// (Presets and communityAvatars here, unchanged)
const presetAvatars = [
  // Add your preset avatar objects here.
];
const communityAvatars = [
  // Add your community avatar objects here.
];

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
  const [theme, setTheme] = useState(
    "bg-gradient-to-r from-blue-900 to-teal-600"
  );
  const avatarRef = useRef<HTMLDivElement>(null);

  // ---- NEW STATE ----
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [pendingAvatar, setPendingAvatar] = useState<any>(null);

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
    setPendingAvatar(stored ? JSON.parse(stored) : null);
    const unlockedItems = localStorage.getItem("listoUnlocked");
    if (unlockedItems) setUnlocked(JSON.parse(unlockedItems));
    setTheme(
      localStorage.getItem("listoTheme") ||
        "bg-gradient-to-r from-blue-900 to-teal-600"
    );
  }, []);

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
          new File([await (await fetch(dataUrl)).blob()], "avatar.png", {
            type: "image/png",
          }),
        ],
      });
    } else {
      alert(
        "Sharing is not supported on this device. Please download instead."
      );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-700 mb-4">You are not logged in.</p>
        <Link href="/login" passHref legacyBehavior>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-gray-50 to-sage-100">
      <Navbar theme="light" />
      
      {/* Sophisticated background elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-sage-200/20 to-sage-300/10 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-warm-gray-200/30 to-sage-200/20 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <main className="max-w-5xl mx-auto px-6 py-8 pt-28 relative z-10">
        <motion.h1 
          className="text-4xl font-bold text-sage-800 mb-8 text-center"
          style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ✨ My Profile
        </motion.h1>

        {/* User Info Card */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <h2 className="text-2xl font-bold text-sage-800 mb-6 flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Account Details</span>
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-sage-50 rounded-2xl border border-sage-100">
              <span className="text-sage-600 font-medium">Email:</span>
              <span className="ml-3 text-sage-800 font-semibold">{user.email}</span>
            </div>
            <div className="p-4 bg-sage-50 rounded-2xl border border-sage-100">
              <span className="text-sage-600 font-medium">User ID:</span>
              <span className="ml-3 text-sage-800 font-mono text-sm">{user.uid}</span>
            </div>
          </div>
        </motion.div>

        {/* Avatar Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-sage-200/50 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(109, 124, 109, 0.15)" }}
        >
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-sage-800 mb-8 flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              <span style={{ fontFamily: 'Inter, SF Pro Display, system-ui, sans-serif' }}>Avatar Customization</span>
            </h2>

            <motion.div
              ref={avatarRef}
              className="mb-6 p-6 bg-sage-50 rounded-3xl border border-sage-200 shadow-lg"
              aria-label="Your avatar"
              role="img"
              tabIndex={0}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {getAvatarSVG(avatar)}
            </motion.div>

            <motion.button
              className="px-8 py-4 bg-sage-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:bg-sage-700 transition-all duration-300 font-semibold mb-6"
              onClick={() => {
                setPendingAvatar(avatar);
                setShowAvatarEditor(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎭 Edit Avatar
            </motion.button>
            {/* Animate presence for avatar editor modal */}
            <AnimatePresence>
              {showAvatarEditor && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg max-w-lg w-full flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">
                      Update Your Avatar
                    </h2>
                    <AvatarPicker
                      {...({
                        value: avatar,
                        onChange: (av: any) => setAvatar(av),
                        unlocked: unlocked,
                        "aria-label": "Avatar customization",
                      } as AvatarPickerProps)}
                    />

                    <div className="flex gap-4 mt-4">
                      <button
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition"
                        onClick={() => {
                          setAvatar(pendingAvatar);
                          localStorage.setItem(
                            "listoAvatar",
                            JSON.stringify(pendingAvatar)
                          );
                          setShowAvatarEditor(false);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                        onClick={() => setShowAvatarEditor(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Username editor */}
            <div className="text-lg font-semibold flex items-center gap-2">
              {editingName ? (
                <>
                  <input
                    className="border rounded px-2 py-1"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
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
            {/* Bio editor */}
            <div className="mt-2 w-full text-center">
              {editingBio ? (
                <>
                  <textarea
                    className="border rounded px-2 py-1 w-full"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
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
                  <p className="text-gray-700">{bio || "Add a short bio..."}</p>
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
                onChange={(e) =>
                  setSocial((s) => ({ ...s, twitter: e.target.value }))
                }
                aria-label="Twitter"
              />
              <input
                className="border rounded px-2 py-1"
                placeholder="Instagram handle"
                value={social.instagram}
                onChange={(e) =>
                  setSocial((s) => ({ ...s, instagram: e.target.value }))
                }
                aria-label="Instagram"
              />
            </div>
          </div>
          {/* Preset Avatars */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Try a Preset Avatar</h2>
            <div className="flex gap-4 flex-wrap justify-center">
              {presetAvatars.map((preset) => (
                <button
                  key={preset.name}
                  className="flex flex-col items-center border rounded p-2 hover:bg-blue-50"
                  onClick={() => setAvatar(preset.avatar)}
                  aria-label={`Use preset avatar: ${preset.name}`}
                >
                  <div style={{ width: 48, height: 72 }}>
                    {getAvatarSVG(preset.avatar)}
                  </div>
                  <span className="text-xs mt-1">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Avatar Export/Share */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Download or Share Your Avatar
            </h2>
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
          {/* Community Gallery */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Community Gallery</h2>
            <div className="flex gap-4 flex-wrap justify-center">
              {communityAvatars.map((entry, idx) => (
                <div
                  key={entry.user + idx}
                  className="flex flex-col items-center border rounded p-2 bg-gray-50"
                  aria-label={`Community avatar: ${entry.user}`}
                >
                  <div style={{ width: 48, height: 72 }}>
                    {getAvatarSVG(entry.avatar)}
                  </div>
                  <span className="text-xs mt-1">{entry.user}</span>
                  <span className="text-xs text-gray-500">
                    {entry.avatar.vibe}
                  </span>
                </div>
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
              <button
                className={`px-3 py-1 rounded ${
                  theme === "bg-gradient-to-r from-blue-900 to-teal-600"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                }`}
                onClick={() =>
                  setTheme("bg-gradient-to-r from-blue-900 to-teal-600")
                }
              >
                Blue/Teal
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  theme === "bg-gradient-to-r from-pink-500 to-yellow-300"
                    ? "bg-pink-500 text-white"
                    : "bg-white text-pink-500"
                }`}
                onClick={() =>
                  setTheme("bg-gradient-to-r from-pink-500 to-yellow-300")
                }
              >
                Pink/Yellow
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  theme === "bg-gradient-to-r from-green-400 to-blue-500"
                    ? "bg-green-500 text-white"
                    : "bg-white text-green-500"
                }`}
                onClick={() =>
                  setTheme("bg-gradient-to-r from-green-400 to-blue-500")
                }
              >
                Green/Blue
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  theme === "bg-gray-100"
                    ? "bg-gray-400 text-white"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setTheme("bg-gray-100")}
              >
                Minimal
              </button>
            </div>
          </div>
          {/* Achievements/Badges */}
          <div className="bg-white rounded shadow p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Achievements</h2>
            <div className="flex gap-2 flex-wrap">
              {unlocked.includes("cap") && (
                <span className="inline-block px-2 py-1 bg-yellow-200 rounded text-xs">
                  🧢 Cap Unlocked
                </span>
              )}
              {unlocked.includes("beanie") && (
                <span className="inline-block px-2 py-1 bg-yellow-200 rounded text-xs">
                  🧢 Beanie Unlocked
                </span>
              )}
              {unlocked.includes("glasses") && (
                <span className="inline-block px-2 py-1 bg-blue-200 rounded text-xs">
                  👓 Glasses Unlocked
                </span>
              )}
              {unlocked.includes("hoodie") && (
                <span className="inline-block px-2 py-1 bg-green-200 rounded text-xs">
                  🧥 Hoodie Unlocked
                </span>
              )}
              {unlocked.includes("fedora") && (
                <span className="inline-block px-2 py-1 bg-purple-200 rounded text-xs">
                  🎩 Fedora Unlocked
                </span>
              )}
              {avatar && (
                <span className="inline-block px-2 py-1 bg-pink-200 rounded text-xs">
                  🎨 Avatar Saved
                </span>
              )}
              {bio && (
                <span className="inline-block px-2 py-1 bg-orange-200 rounded text-xs">
                  📝 Bio Added
                </span>
              )}
              {userName && (
                <span className="inline-block px-2 py-1 bg-blue-100 rounded text-xs">
                  🙋 Name Set
                </span>
              )}
              {unlocked.length >= 5 && (
                <span className="inline-block px-2 py-1 bg-indigo-200 rounded text-xs">
                  🏆 5+ Items Unlocked
                </span>
              )}
            </div>
          </div>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition w-full"
            onClick={handleSave}
            aria-label="Save profile changes"
          >
            Save Changes
          </button>
        </motion.div>
      </main>
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
