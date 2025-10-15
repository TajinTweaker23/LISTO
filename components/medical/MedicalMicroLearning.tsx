'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, Clock, Zap, Heart, Activity } from 'lucide-react';

const MEDICAL_FACTS = [
  {
    id: 1,
    fact: "Your heart beats 100,000 times per day - that's 35 million times a year! 💓",
    category: "Cardiovascular",
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀",
    funFact: "Your heart is roughly the size of your fist and pumps 2,000 gallons of blood daily!"
  },
  {
    id: 2,
    fact: "You lose about 8 pounds of skin cells every year - that's a whole newborn baby's worth! 😱",
    category: "Dermatology", 
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀💀",
    funFact: "Your skin completely replaces itself every 28 days - you're literally a new person monthly!"
  },
  {
    id: 3,
    fact: "Your brain uses 20% of your body's total energy despite being only 2% of your weight 🤯",
    category: "Neurology",
    accuracy: "MA Verified", 
    brainRotLevel: "🧠💀💀💀",
    funFact: "That's like a smartphone using 1/5th of your entire house's electricity!"
  },
  {
    id: 4,
    fact: "You have the same number of neck vertebrae as a giraffe - exactly 7! 🦒",
    category: "Anatomy",
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀",
    funFact: "Giraffes' vertebrae are just way longer - each one can be 10 inches tall!"
  },
  {
    id: 5,
    fact: "Your stomach gets an entirely new lining every 3-4 days because stomach acid would digest it! 🔥",
    category: "Gastroenterology",
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀💀",
    funFact: "Stomach acid is so strong it can dissolve metal - pH of 1.5 to 2!"
  }
];

const MEDICAL_ADMIN_TIPS = [
  {
    id: 1,
    title: "Electronic Health Records",
    description: "Understanding EHR systems and documentation best practices for healthcare providers.",
    difficulty: "beginner",
    category: "administration",
    brainRotLevel: 2,
    medicalAccuracy: 9,
    emoji: '📋',
    timeToRead: 15
  },
  {
    id: 2,
    title: "Medical Billing Basics",
    description: "Introduction to medical coding, insurance claims, and healthcare reimbursement processes.",
    difficulty: "intermediate",
    category: "administration",
    brainRotLevel: 3,
    medicalAccuracy: 8,
    emoji: '💰',
    timeToRead: 20
  },
  {
    id: 3,
    title: "Patient Privacy (HIPAA)",
    description: "Essential guidelines for protecting patient information and maintaining healthcare privacy compliance.",
    difficulty: "beginner",
    category: "administration",
    brainRotLevel: 1,
    medicalAccuracy: 10,
    emoji: '🔒',
    timeToRead: 12
  }
];

export default function MedicalMicroLearning() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const currentFact = MEDICAL_FACTS[currentFactIndex];

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % MEDICAL_FACTS.length);
  };

  const previousFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + MEDICAL_FACTS.length) % MEDICAL_FACTS.length);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Medical Micro-Learning</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>5 min read</span>
        </div>
      </div>

      <motion.div
        key={currentFactIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-4"
      >
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
          <Activity className="w-6 h-6 text-emerald-500 mt-1" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                {currentFact.category}
              </span>
              <span className="text-xs text-gray-500">{currentFact.brainRotLevel}</span>
            </div>
            <p className="text-lg text-gray-800 mb-2">{currentFact.fact}</p>
            {currentFact.funFact && (
              <p className="text-sm text-gray-600 italic">{currentFact.funFact}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={previousFact}
            className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-600">
            {currentFactIndex + 1} of {MEDICAL_FACTS.length}
          </span>
          <button
            onClick={nextFact}
            className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
