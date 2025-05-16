import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

export default function VisionBoard() {
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadImages = async () => {
      if (!user) return;
      const docRef = doc(db, 'visionBoards', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImages(docSnap.data().images || []);
      }
    };
    loadImages();
  }, [user]);

  useEffect(() => {
    const saveImages = async () => {
      if (!user) return;
      await setDoc(doc(db, 'visionBoards', user.uid), { images });
    };
    if (user) saveImages();
  }, [images, user]);

  const addImage = () => {
    if (urlInput.trim()) {
      setImages([...images, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setSelectedIndex(null);
  };

  const moveImage = (from: number, to: number) => {
    const updated = [...images];
    const moved = updated.splice(from, 1)[0];
    updated.splice(to, 0, moved);
    setImages(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-sm">
          ✨ Vision Board
        </h1>
        {user ? (
          <>
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-8">
              <input
                placeholder="Paste image URL..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={addImage}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
              >
                Add Image
              </button>
            </div>

            {images.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                Start building your vision by adding images above!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden backdrop-blur-md bg-white/70 shadow-lg hover:shadow-2xl transition-all ${
                      selectedIndex === index ? 'ring-4 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <Image
                      src={src}
                      alt={`Vision ${index}`}
                      width={400}
                      height={250}
                      className="object-cover w-full h-56 rounded-t-xl"
                    />
                    <div className="absolute top-3 right-3 flex gap-1 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-600"
                      >
                        ✖
                      </button>
                      {index > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveImage(index, index - 1);
                          }}
                          className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                        >
                          ⬆
                        </button>
                      )}
                      {index < images.length - 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveImage(index, index + 1);
                          }}
                          className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                        >
                          ⬇
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">Please log in to use your vision board.</p>
        )}
      </div>
    </div>
  );
}
