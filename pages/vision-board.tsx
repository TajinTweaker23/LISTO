// pages/vision-board.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { db } from "../firebase";
import Navbar from "../components/ui/Navbar";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { FilePlus, ImagePlus, Loader2, Search, UploadCloud } from "lucide-react";

export default function VisionBoard() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showSearchOptions, setShowSearchOptions] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "visionBoard"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMediaItems(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const uploadImage = async () => {
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      await addDoc(collection(db, "visionBoard"), {
        src: base64,
        createdAt: serverTimestamp(),
        status: "Not Started",
      });
      setFile(null);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = async (id: string) => {
    await deleteDoc(doc(db, "visionBoard", id));
    setSelectedIndex(null);
  };

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "visionBoard", id), { status });
  };

  const statuses = ["Not Started", "In Progress", "Complete"];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f9f3] p-6 text-[#2e423f]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-10 flex justify-center items-center gap-2">
            🌿 Your Vision Board
          </h1>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <label className="bg-[#a4c3b2] hover:bg-[#8fb29e] px-5 py-2 rounded cursor-pointer text-white font-medium flex items-center gap-2">
              <UploadCloud className="w-5 h-5" /> Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <button
              onClick={() => setShowSearchOptions(!showSearchOptions)}
              className="bg-[#c0d6c3] hover:bg-[#b1cab6] px-5 py-2 rounded font-medium text-sm text-gray-800 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {showSearchOptions ? "Hide Search" : "Browse Media"}
            </button>
            {file && (
              <button
                onClick={uploadImage}
                disabled={uploading}
                className="bg-[#6c9a8b] hover:bg-[#5a887a] text-white px-5 py-2 rounded font-semibold"
              >
                {uploading ? <Loader2 className="animate-spin" /> : "Add Image"}
              </button>
            )}
          </div>

          <AnimatePresence>
            {showSearchOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-sm text-gray-600 italic mb-8"
              >
                🔍 Advanced media search (GIFs, videos, documents, images) — Coming soon!
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <p className="text-center text-gray-500 italic">Loading your dreams…</p>
          ) : mediaItems.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              Start building your vision by uploading images or browsing media.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl overflow-hidden"
                  onClick={() => setSelectedIndex(index)}
                >
                  <Image
                    src={item.src}
                    alt={`Media ${index}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 text-sm text-gray-600">Status: {item.status}</div>
                </motion.div>
              ))}
            </div>
          )}

          <AnimatePresence>
            {detailsOpen && selectedIndex !== null && (
              <Dialog
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full space-y-4"
                >
                  <Image
                    src={mediaItems[selectedIndex].src}
                    alt="Selected"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full"
                  />
                  <label className="text-sm text-gray-600">Status</label>
                  <select
                    className="border border-gray-300 rounded p-2 w-full"
                    value={mediaItems[selectedIndex].status}
                    onChange={(e) =>
                      updateStatus(mediaItems[selectedIndex].id, e.target.value)
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-3 justify-between text-gray-500 text-xs mt-2">
                    <span className="flex items-center gap-1"><FilePlus className="w-4 h-4" />Attach</span>
                    <span className="flex items-center gap-1"><ImagePlus className="w-4 h-4" />Media</span>
                  </div>
                  <button
                    onClick={() => setDetailsOpen(false)}
                    className="mt-4 w-full bg-[#6c9a8b] text-white py-2 rounded hover:bg-[#588076]"
                  >
                    Close
                  </button>
                </motion.div>
              </Dialog>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
