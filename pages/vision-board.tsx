// pages/vision-board.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Calendar, Users, Share2, FilePlus } from 'lucide-react';
import { db } from '../lib/firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

export default function VisionBoard() {
  const [images, setImages] = useState<any[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMediaSearch, setShowMediaSearch] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'visionBoard'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addImage = async () => {
    if (urlInput.trim()) {
      await addDoc(collection(db, 'visionBoard'), {
        src: urlInput.trim(),
        createdAt: new Date(),
        status: 'Not Started',
      });
      setUrlInput('');
    }
  };

  const removeImage = async (id: string) => {
    await deleteDoc(doc(db, 'visionBoard', id));
    setSelectedIndex(null);
  };

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'visionBoard', id), { status });
  };

  const statuses = ['Not Started', 'In Progress', 'Complete'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          ✨ Vision Board
        </h1>

        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Paste image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 border border-blue-300 shadow-sm"
          />
          <Button onClick={addImage} className="bg-blue-500 hover:bg-blue-600 text-white">
            Add Image
          </Button>
          <Button
            onClick={() => setShowMediaSearch(!showMediaSearch)}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            {showMediaSearch ? 'Close Media' : 'Browse Media'}
          </Button>
        </div>

        {showMediaSearch && (
          <p className="text-center text-gray-600 italic text-sm">
            🔍 Media search coming soon! This will include GIFs, videos, docs, and images.
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-500 italic">Loading your dreams...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Start building your vision by adding images above!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative border rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={img.src}
                  alt={`Vision ${index}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="p-2 text-xs text-gray-600">Status: {img.status}</div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
  className="p-1 text-red-600 hover:text-red-800"
  onClick={(e) => {
    e.stopPropagation();
    removeImage(img.id);
  }}
>
  ✖
</Button>
<Button
  className="p-1 text-blue-600 hover:text-blue-800"
  onClick={(e) => {
    e.stopPropagation();
    setDetailsOpen(true);
    setSelectedIndex(index);
  }}
>
  🔍
</Button>

                </div>
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
                  src={images[selectedIndex].src}
                  alt="Selected"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full"
                />
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-gray-600">Status</label>
                  <select
                    className="border border-gray-300 rounded p-2"
                    value={images[selectedIndex].status}
                    onChange={(e) =>
                      updateStatus(images[selectedIndex].id, e.target.value)
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2 text-sm mt-2 text-gray-600">
                    <MapPin className="w-4 h-4" /> Add location
                    <Calendar className="w-4 h-4" /> Add date
                    <Users className="w-4 h-4" /> Invite others
                    <Share2 className="w-4 h-4" /> Share goal
                    <FilePlus className="w-4 h-4" /> Attach file
                  </div>
                </div>
                <Button
                  onClick={() => setDetailsOpen(false)}
                  className="w-full bg-blue-600 text-white"
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
