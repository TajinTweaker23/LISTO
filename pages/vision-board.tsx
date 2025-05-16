import React, { useState } from 'react';
import Image from 'next/image';

export default function VisionBoard() {
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎨 Vision Board</h1>
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Paste image URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={addImage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Image
        </button>
      </div>

      {images.length === 0 ? (
        <p className="text-gray-500 italic">
          Start building your vision by adding images above!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className={`relative border rounded overflow-hidden shadow hover:shadow-xl transition-all ${
                selectedIndex === index ? 'ring-4 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={src}
                alt={`Vision ${index}`}
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="text-white bg-red-500 px-2 py-1 rounded"
                >
                  ✖
                </button>
                {index > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveImage(index, index - 1);
                    }}
                    className="bg-gray-200 px-2 py-1 rounded"
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
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    ⬇
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
