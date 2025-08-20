'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Clock, 
  Trophy, 
  Star, 
  AlertTriangle,
  Lightbulb,
  Camera,
  Gift,
  Laugh,
  Target,
  Zap,
  Coffee,
  Sparkles,
  Brain,
  Heart
} from 'lucide-react';

interface ChallengeCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (challenge: NewChallenge) => void;
}

interface NewChallenge {
  title: string;
  description: string;
  humor: string;
  category: string;
  difficulty: string;
  timeLimit: number;
  points: number;
  requiredItems: string[];
  tips: string[];
  warningLabels: string[];
  emoji: string;
  isSponsored: boolean;
  sponsorDetails?: {
    brand: string;
    prize: string;
  };
}

const ChallengeCreationModal: React.FC<ChallengeCreationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<NewChallenge>({
    title: '',
    description: '',
    humor: '',
    category: 'cleaning',
    difficulty: 'amateur',
    timeLimit: 300, // 5 minutes
    points: 50,
    requiredItems: [],
    tips: [],
    warningLabels: [],
    emoji: '🎯',
    isSponsored: false
  });

  const [currentItem, setCurrentItem] = useState('');
  const [currentTip, setCurrentTip] = useState('');
  const [currentWarning, setCurrentWarning] = useState('');
  const [step, setStep] = useState(1);

  const categories = [
    { id: 'cleaning', name: 'Cleaning', emoji: '🧽', examples: ['Dishes', 'Vacuuming', 'Bathroom'] },
    { id: 'cooking', name: 'Cooking', emoji: '👨‍🍳', examples: ['Meal prep', 'Baking', 'Cleanup'] },
    { id: 'organizing', name: 'Organizing', emoji: '📦', examples: ['Closet', 'Desk', 'Garage'] },
    { id: 'self-care', name: 'Self Care', emoji: '🧘‍♀️', examples: ['Skincare', 'Exercise', 'Meditation'] },
    { id: 'productivity', name: 'Productivity', emoji: '⚡', examples: ['Email', 'Planning', 'Focus'] },
    { id: 'laundry', name: 'Laundry', emoji: '👕', examples: ['Washing', 'Folding', 'Ironing'] },
    { id: 'bills', name: 'Bills & Paperwork', emoji: '📄', examples: ['Taxes', 'Banking', 'Filing'] }
  ];

  const difficulties = [
    { 
      id: 'trivial', 
      name: 'Trivial', 
      description: 'So easy a toddler could do it',
      color: 'bg-green-100 text-green-800',
      points: 25
    },
    { 
      id: 'amateur', 
      name: 'Amateur', 
      description: 'Basic adulting skills required',
      color: 'bg-blue-100 text-blue-800',
      points: 50
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'You\'ve done this before',
      color: 'bg-purple-100 text-purple-800',
      points: 100
    },
    { 
      id: 'legendary', 
      name: 'Legendary', 
      description: 'Master-level skills needed',
      color: 'bg-orange-100 text-orange-800',
      points: 200
    },
    { 
      id: 'mythical', 
      name: 'Mythical', 
      description: 'Is this even humanly possible?',
      color: 'bg-red-100 text-red-800',
      points: 500
    }
  ];

  const suggestedEmojis = [
    '🎯', '🧽', '🍳', '📦', '⚡', '🏆', '⭐', '🔥', '💪', '🚀',
    '🎪', '🎭', '🎨', '🎵', '⏰', '📱', '💻', '📚', '🧠', '❤️',
    '☕', '🌟', '💎', '🎊', '🎉', '🌈', '⚽', '🎮', '🔧', '🛠️'
  ];

  const humorPrompts = [
    "Because life's too short for...",
    "What happens when you...",
    "The ultimate test of...",
    "For when you need to prove...",
    "Because someone said it couldn't be done...",
    "The sport nobody asked for but everyone needs...",
    "When procrastination meets desperation...",
    "The adult version of..."
  ];

  const warningPrompts = [
    "May cause excessive pride in domestic skills",
    "Side effects include feeling superior to your past self", 
    "Not responsible for [specific consequence]",
    "Warning: May lead to judging other people's [habits]",
    "Could result in [funny outcome]",
    "Do not attempt if you actually care about [item]",
    "Possible [relationship] strain if using [someone's] [items]",
    "May void [item] warranty"
  ];

  const addItem = (list: string[], item: string, setter: (items: string[]) => void) => {
    if (item.trim() && !list.includes(item.trim())) {
      setter([...list, item.trim()]);
    }
  };

  const removeItem = (list: string[], index: number, setter: (items: string[]) => void) => {
    setter(list.filter((_, i) => i !== index));
  };

  const handleDifficultyChange = (difficulty: string) => {
    const difficultyData = difficulties.find(d => d.id === difficulty);
    setFormData({
      ...formData,
      difficulty,
      points: difficultyData?.points || 50
    });
  };

  const generateChallengeSuggestion = () => {
    const category = categories.find(c => c.id === formData.category);
    const suggestions = {
      cleaning: [
        "The 60-Second Room Rescue",
        "Dust Bunny Olympics", 
        "Mirror Streak-Free Championship",
        "The Great Sock Pairing"
      ],
      cooking: [
        "5-Ingredient Miracle Challenge",
        "Leftover Transformation Contest",
        "No-Recipe Cooking Chaos",
        "Midnight Snack Speedrun"
      ],
      organizing: [
        "Cable Management Mastery",
        "Junk Drawer Archaeology",
        "Closet Tetris Challenge",
        "The Great Purge Project"
      ]
    };
    
    const categoryKey = formData.category as keyof typeof suggestions;
    const options = suggestions[categoryKey] || suggestions.cleaning;
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleSubmit = () => {
    if (formData.title && formData.description && formData.humor) {
      onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        humor: '',
        category: 'cleaning',
        difficulty: 'amateur',
        timeLimit: 300,
        points: 50,
        requiredItems: [],
        tips: [],
        warningLabels: [],
        emoji: '🎯',
        isSponsored: false
      });
      setStep(1);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Challenge</h2>
            <p className="text-sm text-gray-600">Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      Challenge Basics
                    </h3>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Challenge Title *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="The Epic Bed Making Olympics"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => setFormData({ ...formData, title: generateChallengeSuggestion() })}
                        className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                        title="Get suggestion"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Emoji */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose an Emoji
                    </label>
                    <div className="grid grid-cols-10 gap-2">
                      {suggestedEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setFormData({ ...formData, emoji })}
                          className={`p-2 text-2xl rounded-lg border-2 hover:bg-gray-50 ${
                            formData.emoji === emoji ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setFormData({ ...formData, category: category.id })}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            formData.category === category.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{category.emoji}</div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-xs text-gray-500">
                            {category.examples.join(', ')}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Transform your chaotic bed into a hotel-worthy masterpiece in record time"
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Humor & Personality */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Laugh className="w-5 h-5 text-purple-600" />
                      Make It Hilarious
                    </h3>
                    <p className="text-sm text-gray-600">
                      This is what makes mundane tasks fun! Add personality and humor.
                    </p>
                  </div>

                  {/* Humor Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Funny One-Liner *
                    </label>
                    <div className="space-y-2">
                      <textarea
                        value={formData.humor}
                        onChange={(e) => setFormData({ ...formData, humor: e.target.value })}
                        placeholder="Because adulting means your bed can't look like a crime scene"
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="flex flex-wrap gap-2">
                        {humorPrompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => setFormData({ ...formData, humor: prompt + "..." })}
                            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full hover:bg-yellow-200"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Warning Labels */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ridiculous Warning Labels
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentWarning}
                          onChange={(e) => setCurrentWarning(e.target.value)}
                          placeholder="May cause excessive pride in domestic skills"
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addItem(formData.warningLabels, currentWarning, (warnings) => 
                                setFormData({ ...formData, warningLabels: warnings })
                              );
                              setCurrentWarning('');
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            addItem(formData.warningLabels, currentWarning, (warnings) => 
                              setFormData({ ...formData, warningLabels: warnings })
                            );
                            setCurrentWarning('');
                          }}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Warning suggestions */}
                      <div className="flex flex-wrap gap-2">
                        {warningPrompts.slice(0, 4).map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentWarning(prompt)}
                            className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full hover:bg-yellow-100 border border-yellow-200"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>

                      {/* Current warnings */}
                      {formData.warningLabels.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="text-xs font-medium text-yellow-800 mb-2">⚠️ Current Warnings:</div>
                          {formData.warningLabels.map((warning, index) => (
                            <div key={index} className="flex items-center justify-between text-xs text-yellow-700 mb-1">
                              <span>• {warning}</span>
                              <button
                                onClick={() => removeItem(formData.warningLabels, index, (warnings) => 
                                  setFormData({ ...formData, warningLabels: warnings })
                                )}
                                className="text-yellow-600 hover:text-yellow-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Challenge Details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      Challenge Details
                    </h3>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level *
                    </label>
                    <div className="space-y-2">
                      {difficulties.map((difficulty) => (
                        <button
                          key={difficulty.id}
                          onClick={() => handleDifficultyChange(difficulty.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            formData.difficulty === difficulty.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${difficulty.color}`}>
                                {difficulty.name.toUpperCase()}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">{difficulty.description}</div>
                            </div>
                            <div className="text-2xl font-bold text-purple-600">{difficulty.points}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Limit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Limit (minutes)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="60"
                        value={Math.floor(formData.timeLimit / 60)}
                        onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) * 60 })}
                        className="flex-1"
                      />
                      <span className="text-lg font-medium text-purple-600 min-w-[4rem]">
                        {Math.floor(formData.timeLimit / 60)}:{(formData.timeLimit % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Required Items */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Items
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentItem}
                          onChange={(e) => setCurrentItem(e.target.value)}
                          placeholder="e.g., fitted sheet, determination"
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addItem(formData.requiredItems, currentItem, (items) => 
                                setFormData({ ...formData, requiredItems: items })
                              );
                              setCurrentItem('');
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            addItem(formData.requiredItems, currentItem, (items) => 
                              setFormData({ ...formData, requiredItems: items })
                            );
                            setCurrentItem('');
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {formData.requiredItems.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.requiredItems.map((item, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                              {item}
                              <button
                                onClick={() => removeItem(formData.requiredItems, index, (items) => 
                                  setFormData({ ...formData, requiredItems: items })
                                )}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pro Tips
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentTip}
                          onChange={(e) => setCurrentTip(e.target.value)}
                          placeholder="Hospital corners are your friend"
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addItem(formData.tips, currentTip, (tips) => 
                                setFormData({ ...formData, tips })
                              );
                              setCurrentTip('');
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            addItem(formData.tips, currentTip, (tips) => 
                              setFormData({ ...formData, tips })
                            );
                            setCurrentTip('');
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Lightbulb className="w-4 h-4" />
                        </button>
                      </div>
                      {formData.tips.length > 0 && (
                        <div className="space-y-1">
                          {formData.tips.map((tip, index) => (
                            <div key={index} className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                              <span className="text-sm text-green-800">💡 {tip}</span>
                              <button
                                onClick={() => removeItem(formData.tips, index, (tips) => 
                                  setFormData({ ...formData, tips })
                                )}
                                className="text-green-600 hover:text-green-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-purple-600" />
                      Review Your Challenge
                    </h3>
                  </div>

                  {/* Challenge Preview */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{formData.emoji}</span>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{formData.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              difficulties.find(d => d.id === formData.difficulty)?.color
                            }`}>
                              {formData.difficulty.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{formData.points}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3 italic">"{formData.humor}"</p>
                    <p className="text-gray-700 mb-4">{formData.description}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.floor(formData.timeLimit / 60)}:{(formData.timeLimit % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {categories.find(c => c.id === formData.category)?.name}
                      </div>
                    </div>

                    {formData.warningLabels.length > 0 && (
                      <div className="mb-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="text-xs font-medium text-yellow-800 mb-1">⚠️ Warning Labels:</div>
                          {formData.warningLabels.map((warning, index) => (
                            <div key={index} className="text-xs text-yellow-700">• {warning}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sponsorship Option */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isSponsored}
                        onChange={(e) => setFormData({ ...formData, isSponsored: e.target.checked })}
                        className="text-green-600"
                      />
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-800">Add Prize Sponsorship</div>
                          <div className="text-sm text-green-600">Offer a prize to make your challenge more appealing</div>
                        </div>
                      </div>
                    </label>

                    {formData.isSponsored && (
                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          placeholder="Sponsor/Brand Name"
                          value={formData.sponsorDetails?.brand || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            sponsorDetails: { ...formData.sponsorDetails, brand: e.target.value, prize: formData.sponsorDetails?.prize || '' }
                          })}
                          className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          placeholder="Prize Description"
                          value={formData.sponsorDetails?.prize || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            sponsorDetails: { ...formData.sponsorDetails, prize: e.target.value, brand: formData.sponsorDetails?.brand || '' }
                          })}
                          className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium text-blue-800 mb-1">Challenge Guidelines</div>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Keep it fun and achievable for most people</li>
                          <li>• Focus on everyday tasks we all procrastinate on</li>
                          <li>• Add humor to make mundane tasks entertaining</li>
                          <li>• Be respectful and inclusive in your language</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              step === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-2 h-2 rounded-full ${
                  stepNum === step ? 'bg-purple-600' : stepNum < step ? 'bg-purple-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              Next
            </button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              disabled={!formData.title || !formData.description || !formData.humor}
              className={`px-6 py-2 rounded-lg font-medium ${
                formData.title && formData.description && formData.humor
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={formData.title && formData.description && formData.humor ? { scale: 1.05 } : {}}
              whileTap={formData.title && formData.description && formData.humor ? { scale: 0.95 } : {}}
            >
              Create Challenge
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeCreationModal;
