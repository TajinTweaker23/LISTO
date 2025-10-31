'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Youtube, 
  Sparkles, 
  X, 
  Image as ImageIcon,
  Type,
  Target,
  Heart,
  Star,
  TrendingUp,
  Calendar,
  Download,
  Share2,
  Trash2
} from 'lucide-react';

// Vision Item Types
interface VisionItem {
  id: string;
  type: 'text' | 'image' | 'goal' | 'affirmation';
  content: string;
  position: { x: number; y: number };
  color?: string;
  size?: 'small' | 'medium' | 'large';
  completed?: boolean;
}

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

// Affirmation Prompts
const affirmationPrompts = [
  "I am capable of achieving my dreams",
  "Every day I grow stronger and wiser",
  "I attract positive energy and success",
  "My goals are within reach",
  "I embrace challenges as opportunities",
  "I am worthy of all good things",
  "My potential is limitless",
  "I create my own reality"
];

// Sample Goals
const sampleGoals = [
  { icon: "💼", text: "Launch my business", category: "Career" },
  { icon: "🏃", text: "Run a 5K marathon", category: "Health" },
  { icon: "📚", text: "Read 12 books this year", category: "Personal Growth" },
  { icon: "🎨", text: "Learn a new creative skill", category: "Hobby" },
  { icon: "💰", text: "Save $5,000", category: "Finance" },
  { icon: "🌍", text: "Travel to 3 new places", category: "Adventure" },
];

export default function VisionBoard() {
  const [visionItems, setVisionItems] = useState<VisionItem[]>([]);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [selectedMoodboard, setSelectedMoodboard] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [newItemContent, setNewItemContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#8b5cf6');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const router = useRouter();

  // Add vision item
  const handleAddItem = (type: VisionItem['type']) => {
    if (!newItemContent.trim() && type !== 'goal') return;

    const newItem: VisionItem = {
      id: Math.random().toString(36).substring(7),
      type,
      content: newItemContent || (type === 'goal' ? 'New Goal' : 'New Item'),
      position: { 
        x: Math.random() * 60 + 10, 
        y: Math.random() * 60 + 10 
      },
      color: selectedColor,
      size: 'medium',
      completed: false
    };

    setVisionItems([...visionItems, newItem]);
    setNewItemContent('');
    setShowAddModal(null);
  };

  // Delete vision item
  const handleDeleteItem = (id: string) => {
    setVisionItems(visionItems.filter(item => item.id !== id));
  };

  // Toggle goal completion
  const handleToggleGoal = (id: string) => {
    setVisionItems(visionItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Quick add affirmation
  const handleQuickAddAffirmation = (affirmation: string) => {
    handleAddItem('affirmation');
    setNewItemContent(affirmation);
  };

  // Quick add goal
  const handleQuickAddGoal = (goal: typeof sampleGoals[0]) => {
    const newItem: VisionItem = {
      id: Math.random().toString(36).substring(7),
      type: 'goal',
      content: `${goal.icon} ${goal.text}`,
      position: { 
        x: Math.random() * 60 + 10, 
        y: Math.random() * 60 + 10 
      },
      color: '#10b981',
      size: 'medium',
      completed: false
    };
    setVisionItems([...visionItems, newItem]);
  };

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

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setShowAddModal('text')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            <Type className="w-4 h-4" />
            Add Text
          </button>
          <button
            onClick={() => setShowAddModal('goal')}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg transition"
          >
            <Target className="w-4 h-4" />
            Add Goal
          </button>
          <button
            onClick={() => setShowAddModal('affirmation')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg transition"
          >
            <Sparkles className="w-4 h-4" />
            Add Affirmation
          </button>
          <button
            onClick={() => alert('Download feature coming soon!')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition ml-auto"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Vision Board Canvas */}
        <div 
          className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden"
          style={{ 
            minHeight: '600px',
            background: selectedMoodboard 
              ? `linear-gradient(135deg, ${selectedMoodboard.colors[0]}20, ${selectedMoodboard.colors[2]}20)`
              : undefined
          }}
        >
          {/* Vision Items */}
          <AnimatePresence>
            {visionItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                drag
                dragMomentum={false}
                className="absolute cursor-move"
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`,
                }}
              >
                <div
                  className={`
                    p-4 rounded-xl border-2 backdrop-blur-sm shadow-lg
                    ${item.type === 'goal' && item.completed ? 'opacity-60' : ''}
                  `}
                  style={{
                    backgroundColor: `${item.color}40`,
                    borderColor: item.color,
                    maxWidth: item.size === 'large' ? '300px' : item.size === 'medium' ? '200px' : '150px'
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {item.type === 'goal' && (
                      <button
                        onClick={() => handleToggleGoal(item.id)}
                        className="flex-shrink-0"
                      >
                        {item.completed ? (
                          <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-white rounded-full" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="flex-shrink-0 text-red-300 hover:text-red-500 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className={`text-white font-medium ${item.completed ? 'line-through' : ''}`}>
                    {item.content}
                  </p>
                  
                  {item.type === 'affirmation' && (
                    <div className="mt-2 flex items-center gap-1 text-purple-300">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-xs">Affirmation</span>
                    </div>
                  )}
                  
                  {item.type === 'goal' && (
                    <div className="mt-2 flex items-center gap-1 text-emerald-300">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Goal</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {visionItems.length === 0 && (
            <div className="text-center text-white/50 py-20">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Your vision board awaits</p>
              <p className="text-sm mb-6">Add goals, affirmations, and inspiring text to visualize your dreams</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowAddModal('goal')}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                >
                  Add Your First Goal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions */}
        {visionItems.length === 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Affirmations */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Quick Affirmations
              </h3>
              <div className="space-y-2">
                {affirmationPrompts.slice(0, 4).map((affirmation, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newItem: VisionItem = {
                        id: Math.random().toString(36).substring(7),
                        type: 'affirmation',
                        content: affirmation,
                        position: { x: 20 + index * 15, y: 20 + index * 10 },
                        color: '#8b5cf6',
                        size: 'medium',
                      };
                      setVisionItems([...visionItems, newItem]);
                    }}
                    className="w-full text-left px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-white/80 hover:text-white rounded-lg transition"
                  >
                    {affirmation}
                  </button>
                ))}
              </div>
            </div>

            {/* Sample Goals */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Popular Goals
              </h3>
              <div className="space-y-2">
                {sampleGoals.slice(0, 4).map((goal, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAddGoal(goal)}
                    className="w-full text-left px-4 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-white/80 hover:text-white rounded-lg transition flex items-center gap-3"
                  >
                    <span className="text-2xl">{goal.icon}</span>
                    <div>
                      <p className="font-medium">{goal.text}</p>
                      <p className="text-xs text-white/60">{goal.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  {showAddModal === 'text' && <><Type className="w-6 h-6" /> Add Text</>}
                  {showAddModal === 'goal' && <><Target className="w-6 h-6" /> Add Goal</>}
                  {showAddModal === 'affirmation' && <><Sparkles className="w-6 h-6" /> Add Affirmation</>}
                </h3>

                <textarea
                  value={newItemContent}
                  onChange={e => setNewItemContent(e.target.value)}
                  placeholder={
                    showAddModal === 'goal' ? 'What do you want to achieve?' :
                    showAddModal === 'affirmation' ? 'Write your affirmation...' :
                    'Enter your text...'
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                  rows={4}
                  autoFocus
                />

                {/* Color Picker */}
                <div className="mb-6">
                  <p className="text-sm text-white/60 mb-2">Choose a color:</p>
                  <div className="flex gap-2">
                    {['#8b5cf6', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#ec4899'].map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg transition ${
                          selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddModal(null)}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddItem(showAddModal as VisionItem['type'])}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition"
                  >
                    Add to Board
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
