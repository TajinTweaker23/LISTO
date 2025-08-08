import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Sparkles, MessageCircle, Zap } from 'lucide-react';

interface ResonanceUser {
  id: string;
  energyLevel: number;
  mood: string;
  interests: string[];
  resonanceStrength: number;
  anonymousName: string;
  color: string;
}

interface ResonanceCirclesProps {
  currentUser?: {
    energyLevel: number;
    mood: string;
    interests: string[];
  };
  className?: string;
}

// Mock data for resonance connections
const mockResonanceUsers: ResonanceUser[] = [
  {
    id: '1',
    energyLevel: 78,
    mood: 'focused',
    interests: ['productivity', 'wellness', 'neurodivergent'],
    resonanceStrength: 92,
    anonymousName: 'Cosmic Sage',
    color: '#a78bfa'
  },
  {
    id: '2', 
    energyLevel: 65,
    mood: 'creative',
    interests: ['art', 'wellness', 'mindfulness'],
    resonanceStrength: 87,
    anonymousName: 'Ethereal Dreamer',
    color: '#0ea5e9'
  },
  {
    id: '3',
    energyLevel: 45,
    mood: 'introspective', 
    interests: ['reading', 'mental health', 'growth'],
    resonanceStrength: 75,
    anonymousName: 'Quiet Thunder',
    color: '#10b981'
  },
];

export const ResonanceCircles: React.FC<ResonanceCirclesProps> = ({ 
  currentUser, 
  className = '' 
}) => {
  const [activeConnection, setActiveConnection] = useState<ResonanceUser | null>(null);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    // Trigger pulse animation every 3 seconds
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getResonanceSize = (strength: number) => {
    return 60 + (strength / 100) * 40; // Size between 60-100px based on resonance
  };

  const getResonanceOpacity = (strength: number) => {
    return 0.3 + (strength / 100) * 0.4; // Opacity between 0.3-0.7
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Resonance Circles</h2>
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with others who share similar energy patterns and interests. 
          Your anonymity is protected while fostering meaningful connections.
        </p>
      </div>

      {/* Resonance Visualization */}
      <div className="relative h-96 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl overflow-hidden">
        {/* Background Gradient Pulses */}
        <div className="absolute inset-0">
          {mockResonanceUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, ${user.color}20, transparent)`,
                width: getResonanceSize(user.resonanceStrength) * 2,
                height: getResonanceSize(user.resonanceStrength) * 2,
                left: `${20 + index * 25}%`,
                top: `${30 + (index % 2) * 30}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: pulseAnimation ? [1, 1.2, 1] : 1,
                opacity: getResonanceOpacity(user.resonanceStrength),
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: pulseAnimation ? 0 : Infinity,
                repeatType: 'reverse'
              }}
            />
          ))}
        </div>

        {/* User Circles */}
        <div className="relative h-full flex items-center justify-center">
          {mockResonanceUsers.map((user, index) => {
            const size = getResonanceSize(user.resonanceStrength);
            
            return (
              <motion.div
                key={user.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + (index % 2) * 30}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveConnection(activeConnection?.id === user.id ? null : user)}
              >
                {/* Resonance Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed"
                  style={{
                    borderColor: user.color,
                    width: size,
                    height: size,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                />

                {/* User Avatar Circle */}
                <div
                  className="rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  style={{
                    backgroundColor: user.color,
                    width: size * 0.6,
                    height: size * 0.6,
                  }}
                >
                  <div className="text-center">
                    <div className="text-xs font-semibold">
                      {user.energyLevel}%
                    </div>
                    <div className="text-xs opacity-80">
                      {user.mood}
                    </div>
                  </div>
                </div>

                {/* Connection Strength Indicator */}
                <div className="absolute -top-1 -right-1">
                  <div className="bg-white rounded-full p-1 shadow-sm">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: user.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Central User (Current User) */}
          <motion.div
            className="absolute bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl"
            style={{
              width: 80,
              height: 80,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              boxShadow: pulseAnimation 
                ? '0 0 30px rgba(147, 51, 234, 0.6)' 
                : '0 8px 25px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="text-center">
              <Heart className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">You</div>
            </div>
          </motion.div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {mockResonanceUsers.map((user, index) => (
            <motion.line
              key={user.id}
              x1="50%"
              y1="50%"
              x2={`${20 + index * 25}%`}
              y2={`${30 + (index % 2) * 30}%`}
              stroke={user.color}
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity={activeConnection?.id === user.id ? 0.6 : 0.2}
              animate={{
                strokeDashoffset: [0, -10],
              }}
              transition={{
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Connection Details */}
      <AnimatePresence>
        {activeConnection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl border border-gray-200 border-opacity-60 p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: activeConnection.color }}
              >
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{activeConnection.anonymousName}</h3>
                <p className="text-sm text-gray-500">
                  {activeConnection.resonanceStrength}% resonance match
                </p>
              </div>
              <div className="ml-auto">
                <button className="btn-gentle flex items-center gap-2 px-4 py-2">
                  <MessageCircle className="w-4 h-4" />
                  Connect
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Energy Level</div>
                <div className="font-semibold">{activeConnection.energyLevel}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Mood</div>
                <div className="font-semibold capitalize">{activeConnection.mood}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Shared Interests</div>
              <div className="flex flex-wrap gap-2">
                {activeConnection.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResonanceCircles;
