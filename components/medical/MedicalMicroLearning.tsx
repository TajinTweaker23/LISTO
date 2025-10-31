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

// Simple component wrapper
export default function MedicalMicroLearning() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const currentFact = MEDICAL_FACTS[currentFactIndex];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elegant p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Brain Rot Medical Learning</h3>
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">{currentFact.brainRotLevel}</span>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-900 mb-2">{currentFact.fact}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{currentFact.accuracy}</span>
                <span className="text-gray-400">•</span>
                <span>{currentFact.category}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 rounded-xl p-4 mt-4">
            <p className="text-sm text-gray-700">
              <strong>Fun Fact:</strong> {currentFact.funFact}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentFactIndex((prev) => (prev > 0 ? prev - 1 : MEDICAL_FACTS.length - 1))}
            className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentFactIndex((prev) => (prev + 1) % MEDICAL_FACTS.length)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-lg"
          >
            Next Fact
          </button>
        </div>
        
        <div className="flex justify-center gap-1 mt-4">
          {MEDICAL_FACTS.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === currentFactIndex ? 'w-6 bg-purple-600' : 'w-1 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}