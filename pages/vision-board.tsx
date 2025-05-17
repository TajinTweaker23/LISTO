// pages/vision-board.tsx
"use client";

import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SmartImage from "../components/SmartImage";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Calendar, Users, Share2, FilePlus } from "lucide-react";

export default function VisionBoard() {
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checklists, setChecklists] = useState<string[][]>([]);
  const [notes, setNotes] = useState<string[]>([]);

  const addImage = () => {
    if (!urlInput.trim()) return;
    setImages((prev) => [...prev, urlInput.trim()]);
    setChecklists((prev) => [...prev, []]);
    setNotes((prev) => [...prev, ""]);
    setUrlInput("");
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setChecklists((prev) => prev.filter((_, i) => i !== index));
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const addChecklistItem = (index: number) => {
    const updated = [...checklists];
    updated[index].push("");
    setChecklists(updated);
  };

  const updateChecklistItem = (index: number, itemIndex: number, value: string) => {
    const updated = [...checklists];
    updated[index][itemIndex] = value;
    setChecklists(updated);
  };

  const updateNote = (index: number, value: string) => {
    const updated = [...notes];
    updated[index] = value;
    setNotes(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          ✨ Vision Board
        </h1>

        <div className="mb-6">
          <SearchBar
            onResultSelect={(url: string) => {
              setImages((prev) => [...prev, url]);
              setChecklists((prev) => [...prev, []]);
              setNotes((prev) => [...prev, ""]);
            }}
          />
        </div>

        {images.length === 0 ? (
          <p className="text-center italic text-gray-500">
            Start building your vision by adding images above!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, index) => (
              <motion.div
                key={index}
                layout
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded shadow hover:shadow-xl transition-all overflow-hidden"
              >
                <SmartImage
                  src={src}
                  alt="Vision"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />

                <div className="absolute top-2 left-2 flex gap-2">
                  <button
                    onClick={() => removeImage(index)}
                    className="bg-red-500 text-white rounded-full p-1"
                  >
                    ❌
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIndex(index);
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && selectedIndex !== null && (
            <Dialog
              as={motion.div}
              static
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
              >
                <Dialog.Title className="text-xl font-bold mb-4">Details</Dialog.Title>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Checklist</label>
                  {checklists[selectedIndex].map((item, i) => (
                    <input
                      key={i}
                      type="text"
                      value={item}
                      onChange={(e) => updateChecklistItem(selectedIndex, i, e.target.value)}
                      className="w-full mb-2 px-3 py-2 border rounded"
                    />
                  ))}
                  <button
                    onClick={() => addChecklistItem(selectedIndex)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    + Add checklist item
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Notes</label>
                  <textarea
                    value={notes[selectedIndex]}
                    onChange={(e) => updateNote(selectedIndex, e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    rows={4}
                  />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2 text-gray-500">
                    <MapPin className="w-5 h-5" />
                    <Calendar className="w-5 h-5" />
                    <Users className="w-5 h-5" />
                    <Share2 className="w-5 h-5" />
                    <FilePlus className="w-5 h-5" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-sm px-3 py-1 border rounded"
                    >
                      Cancel
                    </button>
                    <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded">
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
