// vision-board.tsx — Fully Reimagined Experience
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Calendar, Users, Share2, FilePlus, Trash2, Search } from "lucide-react";
import { db } from "../firebase";
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

export default function VisionBoard() {
  const [images, setImages] = useState<any[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "visionBoard"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(data);
      setFiltered(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!search.trim()) return setFiltered(images);
    const results = images.filter((img) =>
      img.status.toLowerCase().includes(search.toLowerCase()) ||
      img.src.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, images]);

  const addImage = async () => {
    if (urlInput.trim()) {
      await addDoc(collection(db, "visionBoard"), {
        src: urlInput.trim(),
        createdAt: new Date(),
        status: "Not Started",
      });
      setUrlInput("");
    }
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
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F1] to-[#E4EAE1] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#3B4D40] tracking-wide mb-10">
          🌿 Vision Board
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <Input
            placeholder="Paste image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 border border-[#B0C3B1] rounded-md px-4 py-2 shadow-sm"
          />
          <Button
            onClick={addImage}
            className="bg-[#5E8573] hover:bg-[#486D5B] text-white px-6 py-2 rounded shadow-md"
          >
            Add Image
          </Button>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by status or link"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 italic">Loading dreams...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No results match your search or board is empty.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {filtered.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white border border-[#D6E2D4] rounded-xl overflow-hidden shadow-md hover:shadow-xl"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={img.src}
                  alt={`Vision ${index}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="p-2 text-sm text-gray-600">{img.status}</div>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button
                    className="p-1 bg-white text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(img.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {detailsOpen && selectedIndex !== null && (
            <Dialog
              open={detailsOpen}
              onClose={() => setDetailsOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
              >
                <Image
                  src={filtered[selectedIndex].src}
                  alt="Selected"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full"
                />
                <div className="mt-4 space-y-2">
                  <label className="text-sm text-gray-600">Update Status</label>
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={filtered[selectedIndex].status}
                    onChange={(e) => updateStatus(filtered[selectedIndex].id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between mt-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Location</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Date</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Invite</span>
                  <span className="flex items-center gap-1"><FilePlus className="w-4 h-4" /> Files</span>
                  <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /> Share</span>
                </div>
                <Button
                  onClick={() => setDetailsOpen(false)}
                  className="w-full mt-4 bg-[#5E8573] text-white hover:bg-[#46695B]"
                >
                  Close
                </Button>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
