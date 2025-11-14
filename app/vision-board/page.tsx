'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Plus, Search, Youtube, Sparkles, X, Upload, Link, Image, FileText, Camera, Globe } from 'lucide-react';

// Moodboard Presets
const moodboardsData = [
  {
    title: "Dreamy Pastels",
    description: "Soft hues to calm your mind and spark creativity.",
    colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=180&fit=crop",
  },
  {
    title: "Bold Contrast",
    description: "Vivid shades that ignite passion and energy.",
    colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=180&fit=crop",
  },
  {
    title: "Earthy Tones",
    description: "Natural shades to ground your ambitions.",
    colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=180&fit=crop",
  },
  {
    title: "Vibrant Energy",
    description: "Bursting with zest and vigor for a productive day.",
    colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=180&fit=crop",
  },
  {
    title: "Calm Serenity",
    description: "A peaceful blend of cool tones to relax and inspire.",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=180&fit=crop",
  },
];

interface VisionItem {
  id: string;
  type: 'image' | 'article' | 'video' | 'text' | 'screenshot';
  content: string;
  title?: string;
  url?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function VisionBoard() {
  const [visionItems, setVisionItems] = useState<VisionItem[]>([]);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [selectedMoodboard, setSelectedMoodboard] = useState<any>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState<'image' | 'article' | 'screenshot' | null>(null);
  const [importUrl, setImportUrl] = useState('');
  const [importTitle, setImportTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem: VisionItem = {
          id: Date.now().toString(),
          type: importType === 'screenshot' ? 'screenshot' : 'image',
          content: e.target?.result as string,
          title: importTitle || file.name,
          position: { x: Math.random() * 300, y: Math.random() * 200 },
          size: { width: 200, height: 150 }
        };
        setVisionItems([...visionItems, newItem]);
        setShowImportModal(false);
        setImportTitle('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlImport = async () => {
    if (!importUrl) return;

    try {
      // For articles, we'll create a preview
      const newItem: VisionItem = {
        id: Date.now().toString(),
        type: 'article',
        content: importUrl,
        title: importTitle || 'Article Link',
        url: importUrl,
        position: { x: Math.random() * 300, y: Math.random() * 200 },
        size: { width: 250, height: 100 }
      };
      setVisionItems([...visionItems, newItem]);
      setShowImportModal(false);
      setImportUrl('');
      setImportTitle('');
    } catch (error) {
      console.error('Error importing URL:', error);
    }
  };

  const importOptions = [
    { type: 'image' as const, label: 'Upload Image', icon: Image, description: 'Add photos from your device' },
    { type: 'screenshot' as const, label: 'Screenshot', icon: Camera, description: 'Upload screenshots or captures' },
    { type: 'article' as const, label: 'Article/URL', icon: Link, description: 'Save articles or web links' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => router.push('/')}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            Vision Board
          </h1>
        </div>

        {/* Moodboard Presets */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Choose Your Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {moodboardsData.map((moodboard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
                onClick={() => setSelectedMoodboard(moodboard)}
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <img 
                    src={moodboard.image} 
                    alt={moodboard.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{moodboard.title}</h3>
                <p className="text-white/70 text-xs mb-3">{moodboard.description}</p>
                <div className="flex gap-1">
                  {moodboard.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Board Canvas */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 min-h-96 relative overflow-hidden">
          {selectedMoodboard ? (
            <>
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${selectedMoodboard.colors.join(', ')})` 
                }}
              />
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedMoodboard.title}</h3>
                  <p className="text-white/70">{selectedMoodboard.description}</p>
                </div>

                {/* Vision Items */}
                <div className="relative min-h-96">
                  {visionItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden cursor-move"
                      style={{
                        left: item.position.x,
                        top: item.position.y,
                        width: item.size.width,
                        height: item.size.height
                      }}
                      drag
                      dragConstraints={{ left: 0, top: 0, right: 600, bottom: 400 }}
                    >
                      {item.type === 'image' || item.type === 'screenshot' ? (
                        <img src={item.content} alt={item.title} className="w-full h-full object-cover" />
                      ) : item.type === 'article' ? (
                        <div className="p-3 h-full flex flex-col">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-medium text-slate-700 truncate">{item.title}</span>
                          </div>
                          <p className="text-xs text-slate-600 flex-1 overflow-hidden">{item.url}</p>
                        </div>
                      ) : null}
                      <button
                        onClick={() => setVisionItems(visionItems.filter(i => i.id !== item.id))}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button
                    onClick={() => setSelectedMoodboard(null)}
                    variant="default"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold mr-4"
                  >
                    Try Another Style
                  </Button>
                  <Button
                    onClick={() => setShowImportModal(true)}
                    variant="default"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    Import Content
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-white/50">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-4">Select a moodboard above to start creating your vision</p>
              <p className="text-sm">Visualize your dreams and goals with beautiful, inspiring layouts</p>
            </div>
          )}
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Import Content</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!importType ? (
                <div className="space-y-4">
                  {importOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setImportType(option.type)}
                      className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <option.icon className="w-6 h-6 text-slate-600" />
                        <div>
                          <h4 className="font-semibold text-slate-800">{option.label}</h4>
                          <p className="text-sm text-slate-600">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title (optional)
                    </label>
                    <input
                      type="text"
                      value={importTitle}
                      onChange={(e) => setImportTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter a title..."
                    />
                  </div>

                  {importType === 'article' ? (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        URL
                      </label>
                      <input
                        type="url"
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://..."
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select File
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={importType === 'image' ? 'image/*' : 'image/*'}
                        onChange={handleFileUpload}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setImportType(null)}
                      className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                      Back
                    </button>
                    {importType === 'article' ? (
                      <button
                        onClick={handleUrlImport}
                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Import
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setShowFabMenu(!showFabMenu)}
            variant="glow"
            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 p-0"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
