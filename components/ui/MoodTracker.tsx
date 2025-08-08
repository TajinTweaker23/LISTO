import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MoodData {
  id: string;
  emoji: string;
  label: string;
  color: string;
  intensity: number;
}

interface MoodTrackerProps {
  onMoodSelect?: (mood: MoodData) => void;
  selectedMood?: MoodData | null;
  className?: string;
}

const moodOptions: MoodData[] = [
  { id: 'excited', emoji: '🤩', label: 'Excited', color: '#10b981', intensity: 90 },
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#f59e0b', intensity: 80 },
  { id: 'content', emoji: '😌', label: 'Content', color: '#0ea5e9', intensity: 70 },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#6b7280', intensity: 50 },
  { id: 'tired', emoji: '😴', label: 'Tired', color: '#8b5cf6', intensity: 30 },
  { id: 'stressed', emoji: '😰', label: 'Stressed', color: '#f59e0b', intensity: 40 },
  { id: 'sad', emoji: '😢', label: 'Sad', color: '#0ea5e9', intensity: 20 },
  { id: 'frustrated', emoji: '😤', label: 'Frustrated', color: '#ef4444', intensity: 35 },
];

export const MoodTracker: React.FC<MoodTrackerProps> = ({ 
  onMoodSelect, 
  selectedMood,
  className = '' 
}) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: MoodData) => {
    onMoodSelect?.(mood);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">How are you feeling?</h3>
          <p className="text-sm text-gray-500">Tap to track your mood</p>
        </div>
        {selectedMood && (
          <div className="text-right">
            <div className="text-2xl mb-1">{selectedMood.emoji}</div>
            <div className="text-sm font-medium text-gray-700">{selectedMood.label}</div>
          </div>
        )}
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-4 gap-3">
        {moodOptions.map((mood) => {
          const isSelected = selectedMood?.id === mood.id;
          const isHovered = hoveredMood === mood.id;

          return (
            <motion.button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
              className={`
                relative p-4 rounded-2xl border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select ${mood.label} mood`}
            >
              {/* Background Color Indicator */}
              {(isSelected || isHovered) && (
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-10"
                  style={{ backgroundColor: mood.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSelected ? 0.2 : 0.1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Emoji */}
              <div className="text-3xl mb-2 relative z-10">{mood.emoji}</div>
              
              {/* Label */}
              <div className="text-xs font-medium text-gray-700 relative z-10">
                {mood.label}
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  className="absolute top-1 right-1 w-3 h-3 bg-primary-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mood Insights */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">{selectedMood.emoji}</div>
            <div>
              <h4 className="font-semibold text-gray-800">You're feeling {selectedMood.label.toLowerCase()}</h4>
              <p className="text-sm text-gray-600">
                {getMoodInsight(selectedMood)}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button className="btn-gentle text-xs px-3 py-1.5 rounded-lg">
              Add Note
            </button>
            <button className="btn-gentle text-xs px-3 py-1.5 rounded-lg">
              View Trends
            </button>
            <button className="btn-gentle text-xs px-3 py-1.5 rounded-lg">
              Get Suggestions
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Helper function for mood insights
const getMoodInsight = (mood: MoodData): string => {
  const insights: Record<string, string> = {
    excited: "High energy state - good for challenging tasks.",
    happy: "Positive state - suitable for creative work and social activities.",
    content: "Balanced feeling - optimal for steady, focused work.",
    neutral: "Stable baseline - maintain current activities.",
    tired: "Energy levels low. Consider rest or lighter activities.",
    stressed: "Elevated stress detected. Consider breathing exercises or breaks.",
    sad: "Low mood noted. Be patient with yourself today.",
    frustrated: "Frustration present. Consider alternative approaches or breaks.",
  };
  return insights[mood.id] || "All emotional states are temporary and valid.";
};

export default MoodTracker;
