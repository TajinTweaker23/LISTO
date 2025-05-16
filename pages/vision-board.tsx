// Enhanced Vision Board UI (Phase 1)
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisionBoard() {
  const [images, setImages] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addImage = () => {
    if (urlInput.trim()) {
      setImages([...images, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setSelectedIndex(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">✨ Vision Board</h1>

        <div className="flex gap-4 mb-6">
          <input
            className="flex-1 rounded-lg px-4 py-2 shadow-inner focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Paste image URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            onClick={addImage}
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            Add Image
          </button>
        </div>

        {images.length === 0 ? (
          <p className="text-center italic text-gray-500">Start building your vision by adding images above!</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {images.map((src, index) => (
              <motion.div
                key={index}
                layout
                className="relative group cursor-pointer rounded-xl overflow-hidden border-2 border-transparent hover:border-purple-500 shadow-lg hover:scale-105 transition-all"
                onClick={() => {
                  setSelectedIndex(index);
                  setShowModal(true);
                }}
              >
                <Image src={src} alt={`Vision ${index}`} width={300} height={200} className="object-cover w-full h-48" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded shadow hover:bg-red-600 transition-all opacity-90 group-hover:opacity-100"
                >
                  ✖
                </button>
                <span className="absolute bottom-2 right-2 text-xs bg-white px-2 py-1 rounded shadow text-gray-700 opacity-0 group-hover:opacity-100">Details</span>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {showModal && selectedIndex !== null && (
            <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" open={showModal} onClose={() => setShowModal(false)}>
              <Dialog.Overlay className="fixed inset-0 bg-black/40" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-xl w-full z-50"
              >
                <Dialog.Title className="text-lg font-bold text-gray-800 mb-4">Details</Dialog.Title>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Checklist</label>
                  <input className="w-full border px-3 py-2 rounded shadow-inner" placeholder="e.g. Buy supplies" />
                  <button className="text-blue-600 text-sm mt-1 hover:underline">+ Add checklist item</button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea className="w-full border px-3 py-2 rounded shadow-inner min-h-[100px]" />
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Save</button>
                </div>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
