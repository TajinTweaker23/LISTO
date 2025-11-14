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
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Medical Facts</h2>
          <Brain className="w-8 h-8 text-blue-600" />
        </div>
        
        <motion.div
          key={currentFactIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{MEDICAL_FACTS[currentFactIndex].brainRotLevel}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-600 mb-2">
                {MEDICAL_FACTS[currentFactIndex].category} • {MEDICAL_FACTS[currentFactIndex].accuracy}
              </div>
              <p className="text-lg font-medium text-gray-800 mb-3">
                {MEDICAL_FACTS[currentFactIndex].fact}
              </p>
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <p className="text-sm text-gray-700">
                  💡 {MEDICAL_FACTS[currentFactIndex].funFact}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentFactIndex(Math.max(0, currentFactIndex - 1))}
            disabled={currentFactIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">
            {currentFactIndex + 1} / {MEDICAL_FACTS.length}
          </div>
          <button
            onClick={() => setCurrentFactIndex(Math.min(MEDICAL_FACTS.length - 1, currentFactIndex + 1))}
            disabled={currentFactIndex === MEDICAL_FACTS.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}