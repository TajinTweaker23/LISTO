"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FilePlus, Moon, Sun, Settings, Square } from "lucide-react";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

// ------------------------------
// Floating Icons Component (Smaller Icons)
// ------------------------------
const FloatingIcons = () => {
  // Five small square icons with randomized placement and delay
  const icons = [
    <Square key="1" size={16} />,
    <Square key="2" size={16} />,
    <Square key="3" size={16} />,
    <Square key="4" size={16} />,
    <Square key="5" size={16} />,
  ];

  const getRandomStyle = () => ({
    top: `${Math.floor(Math.random() * 90)}%`,
    left: `${Math.floor(Math.random() * 90)}%`,
    animationDelay: `${Math.random() * 2}s`,
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-white opacity-20"
          style={getRandomStyle()}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
};

// ------------------------------
// Animated Moodboard Card with Carousel Effect
// ------------------------------
const AnimatedMoodboardCard = ({ moodboard, index }: { moodboard: any; index: number; }) => {
  // For carousel: cycle through multiple images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Using Unsplash endpoints for reliable images.
  // Append a signature parameter so that multiple requests produce variations.
  const images = [
    moodboard.image,
    `${moodboard.image}&sig=${index * 10 + 2}`,
    `${moodboard.image}&sig=${index * 10 + 3}`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Assign a border style based on moodboard title for visual distinction
  let cardStyle = {};
  if (moodboard.title.includes("Pastels")) {
    cardStyle = { border: "2px solid #FFC0CB" };
  } else if (moodboard.title.includes("Bold")) {
    cardStyle = { border: "2px solid #C70039" };
  } else if (moodboard.title.includes("Earthy")) {
    cardStyle = { border: "2px solid #8B4513" };
  } else if (moodboard.title.includes("Vibrant")) {
    cardStyle = { border: "2px solid #f77f00" };
  } else if (moodboard.title.includes("Serenity")) {
    cardStyle = { border: "2px solid #8ecae6" };
  }

  return (
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg overflow-hidden transform hover:scale-105"
      style={cardStyle}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ensure the image container has both h-56 and a minimum height */}
      <div className="relative h-56 min-h-[224px] overflow-hidden">
        {/* Updated Next.js 13 Image usage: use fill + inline objectFit */}
        <Image
          src={images[currentIndex]}
          alt={moodboard.title}
          fill
          style={{ objectFit: "cover" }}
        />
        {/* Floating icons overlay */}
        <FloatingIcons />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {moodboard.title}
        </h2>
        <p className="text-gray-600 mb-4">{moodboard.description}</p>
        <div className="flex gap-2">
          {moodboard.colors.map((color: string, idx: number) => (
            <motion.div
              key={idx}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-full border border-gray-200"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ------------------------------
// Moodboards for Landing Page
// ------------------------------
// Updated to use Unsplash URLs for reliable images.
const moodboards = [
  {
    title: "Dreamy Pastels",
    description: "Soft hues to calm your mind and spark creativity.",
    colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
    image: "https://source.unsplash.com/600x400/?pastel",
  },
  {
    title: "Bold Contrast",
    description: "Vivid shades that ignite passion and energy.",
    colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    image: "https://source.unsplash.com/600x400/?bold",
  },
  {
    title: "Earthy Tones",
    description: "Natural shades to ground your ambitions.",
    colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
    image: "https://source.unsplash.com/600x400/?earth",
  },
  {
    title: "Vibrant Energy",
    description: "Bursting with zest and vigor for a productive day.",
    colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
    image: "https://source.unsplash.com/600x400/?vibrant",
  },
  {
    title: "Calm Serenity",
    description: "A peaceful blend of cool tones to relax and inspire.",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
    image: "https://source.unsplash.com/600x400/?serene",
  },
];

// ------------------------------
// Board Categories
// ------------------------------
const boards = ["Personal", "Career", "Health", "Travel"];

// ------------------------------
// Main Vision Board Component
// ------------------------------
export default function VisionBoard() {
  // Top-Level State for Landing vs. Editor view
  const [showLanding, setShowLanding] = useState(true);
  const [currentMoodboard, setCurrentMoodboard] = useState(0);

  const nextMoodboard = () =>
    setCurrentMoodboard((prev) => (prev + 1) % moodboards.length);
  const prevMoodboard = () =>
    setCurrentMoodboard((prev) => (prev - 1 + moodboards.length) % moodboards.length);

  // Editor State
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [urlInput, setUrlInput] = useState("");
  const [showMediaSearch, setShowMediaSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [customFont, setCustomFont] = useState("Arial");
  const [customColors, setCustomColors] = useState({
    primary: "#3182ce",
    secondary: "#2d3748",
  });
  const fileInputRef = useRef<any>(null);

  // Firestore data fetching in the editor view
  useEffect(() => {
    if (!showLanding) {
      setLoading(true);
      const colRef = collection(db, `visionBoards_${selectedBoard}`);
      const q = query(colRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [selectedBoard, showLanding]);

  // ------------------------------
  // Editor Action Functions
  // ------------------------------
  const addImage = async () => {
    if (urlInput.trim()) {
      const colRef = collection(db, `visionBoards_${selectedBoard}`);
      await addDoc(colRef, {
        src: urlInput.trim(),
        createdAt: new Date(),
        status: "Not Started",
        note: "",
        progress: 0,
        type: "image",
      });
      setUrlInput("");
    }
  };

  const removeItem = async (id: string) => {
    await deleteDoc(doc(db, `visionBoards_${selectedBoard}`, id));
    setDetailModalOpen(false);
    setSelectedItem(null);
  };

  const updateItemDetails = async (id: string, updates: any) => {
    await updateDoc(doc(db, `visionBoards_${selectedBoard}`, id), updates);
  };

  const handleFileUpload = async (files: FileList) => {
    const colRef = collection(db, `visionBoards_${selectedBoard}`);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type.startsWith("image/") ? "image" : "file";
      const reader = new FileReader();
      reader.onload = async (event) => {
        const src = event.target?.result;
        await addDoc(colRef, {
          src,
          createdAt: new Date(),
          status: "Not Started",
          note: "",
          progress: 0,
          type: fileType,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
      // Optionally update the order in Firestore.
    }
  };

  const handleDetailSave = async () => {
    if (selectedItem) {
      await updateItemDetails(selectedItem.id, {
        note: selectedItem.note,
        progress: selectedItem.progress,
        status: selectedItem.status,
      });
      setDetailModalOpen(false);
      setSelectedItem(null);
    }
  };

  // ------------------------------
  // Rendering: Landing Page vs. Editor
  // ------------------------------
  if (showLanding) {
    return (
      <div className="min-h-screen relative flex flex-col overflow-hidden">
        {/* Background Floating Icons */}
        <FloatingIcons />
        {/* Futuristic Header */}
        <header
          className="w-full py-12"
          style={{
            background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-center text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            LISTO Vision Board
          </motion.h1>
        </header>
        <main className="flex-grow p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.p
              className="text-xl text-gray-200 text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Discover inspiration from curated moodboards and dynamic color palettes.
            </motion.p>
            {/* Masonry-Style Layout for Moodboards */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {moodboards.map((mb, idx) => (
                <div key={idx} className="break-inside">
                  <AnimatedMoodboardCard moodboard={mb} index={idx} />
                </div>
              ))}
            </div>
            {/* Moodboard Navigation */}
            <div className="flex justify-around mt-8">
              <Button
                onClick={prevMoodboard}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2"
              >
                Prev
              </Button>
              <Button
                onClick={nextMoodboard}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2"
              >
                Next
              </Button>
            </div>
          </div>
        </main>
        <footer className="py-8 text-center relative z-10">
          <Button
            onClick={() => setShowLanding(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl"
          >
            Create Your Vision Board
          </Button>
        </footer>
      </div>
    );
  }

  // ------------------------------
  // Editor View
  // ------------------------------
  return (
    <div
      style={{ fontFamily: customFont }}
      className={`min-h-screen p-6 relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-pink-100"
      }`}
    >
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1
            className="text-4xl font-extrabold text-center"
            style={{ color: customColors.primary }}
          >
            ✨ Vision Board
          </h1>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <label className="font-bold">Board:</label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="border p-2 rounded"
            >
              {boards.map((board, idx) => (
                <option key={idx} value={board}>
                  {board}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <Input
            placeholder="Paste image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 border border-blue-300 shadow-sm"
          />
          <Button
            onClick={addImage}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add Image
          </Button>
          <Button
            onClick={() => setShowMediaSearch(!showMediaSearch)}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            {showMediaSearch ? "Close Media" : "Browse Media"}
          </Button>
          <Button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-700 text-white"
          >
            {darkMode ? <Sun /> : <Moon />}
          </Button>
          <Button
            onClick={() => setSettingsOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Settings className="mr-1" /> Settings
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <FilePlus className="mr-1" /> Upload Files
          </Button>
          {/* Hidden File Input */}
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*,application/pdf"
            className="hidden"
          />
        </div>
        {showMediaSearch && (
          <motion.p
            className="text-center text-gray-600 italic text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🔍 Enhanced media search coming soon! Includes GIFs, videos, and motivational resources.
          </motion.p>
        )}
        <div
          className="border-2 border-dashed border-gray-300 p-4 mb-6 text-center rounded-lg hover:border-blue-400"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          Drag & drop files here to upload
        </div>
        {loading ? (
          <p className="text-center text-gray-500 italic">Loading your dreams...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Start building your vision by adding images or uploading files above!
          </p>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative border rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white"
                    onClick={() => {
                      setSelectedItem(item);
                      setDetailModalOpen(true);
                    }}
                  >
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={`Vision ${index}`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-48"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-48 bg-gray-200">
                        <p className="text-gray-600">File Preview</p>
                      </div>
                    )}
                    <div className="p-2 text-xs text-gray-600">Status: {item.status}</div>
                    <div className="w-full bg-gray-300 h-1 rounded">
                      <div
                        className="bg-blue-500 h-1 rounded"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        ✖
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
        <AnimatePresence>
          {detailModalOpen && selectedItem && (
            <Dialog
              open={detailModalOpen}
              onClose={() => setDetailModalOpen(false)}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="min-h-screen px-4 text-center">
                <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
                <span className="inline-block h-screen align-middle" aria-hidden="true">
                  &#8203;
                </span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                >
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Edit Item Details
                  </Dialog.Title>
                  <div className="mt-4">
                    {selectedItem.type === "image" ? (
                      <Image
                        src={selectedItem.src}
                        alt="Item Detail"
                        width={400}
                        height={300}
                        className="object-cover w-full h-48"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-48 bg-gray-200">
                        <p className="text-gray-600">File Preview</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={selectedItem.status}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, status: e.target.value })
                      }
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      value={selectedItem.note}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, note: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Progress: {selectedItem.progress}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedItem.progress}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          progress: Number(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <Button
                      onClick={() => setDetailModalOpen(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDetailSave}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Save
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {settingsOpen && (
            <Dialog
              open={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="min-h-screen px-4 text-center">
                <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
                <span className="inline-block h-screen align-middle" aria-hidden="true">
                  &#8203;
                </span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                >
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Customize Your Vision Board
                  </Dialog.Title>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Font</label>
                    <select
                      value={customFont}
                      onChange={(e) => setCustomFont(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                    <input
                      type="color"
                      value={customColors.primary}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, primary: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                    <input
                      type="color"
                      value={customColors.secondary}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, secondary: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => setSettingsOpen(false)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Save Settings
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
