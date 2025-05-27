// pages/vision-board.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Calendar, Users, Share2, FilePlus } from 'lucide-react';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Button } from '../components/ui/button';

const VisionBoard = () => {
  const [images, setImages] = useState<any[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'visionBoard'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const uploadImage = async () => {
    if (!file) return;
    const src = URL.createObjectURL(file);
    await addDoc(collection(db, 'visionBoard'), {
      src,
      createdAt: new Date(),
      status: 'Not Started',
    });
    setFile(null);
    setShowUpload(false);
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
    <div className="min-h-screen bg-[#F7F8F2] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-[#465C4F] mb-10 tracking-tight">
          🌿 Your Vision Board
        </h1>

        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => setShowUpload(!showUpload)} className="bg-[#9FB8A7] text-white hover:bg-[#87A89D]">
            {showUpload ? 'Cancel Upload' : 'Add Image'}
          </Button>
          {showUpload && (
            <div className="flex gap-3 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm"
              />
              <Button onClick={uploadImage} className="bg-[#465C4F] text-white hover:bg-[#3A4C42]">
                Upload
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-center text-[#888] italic">Loading your dreams...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-[#888] italic">Start your vision by uploading an image above.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative border border-[#D8E1DC] rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={img.src}
                  alt={`Vision ${index}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="p-2 text-xs text-[#666]">Status: {img.status}</div>
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full space-y-4"
              >
                <Image
                  src={images[selectedIndex].src}
                  alt="Selected"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full"
                />
                <div className="space-y-3">
                  <label className="text-sm text-[#777]">Status</label>
                  <select
                    className="border border-gray-300 rounded p-2 w-full"
                    value={images[selectedIndex].status}
                    onChange={(e) => updateStatus(images[selectedIndex].id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-2 text-xs text-[#555] mt-2">
                    <MapPin className="w-4 h-4" /> Add location
                    <Calendar className="w-4 h-4" /> Add date
                    <Users className="w-4 h-4" /> Invite
                    <Share2 className="w-4 h-4" /> Share
                    <FilePlus className="w-4 h-4" /> Attach
                  </div>
                </div>
                <Button onClick={() => setDetailsOpen(false)} className="w-full bg-[#9FB8A7] text-white">
                  Close
                </Button>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VisionBoard;
