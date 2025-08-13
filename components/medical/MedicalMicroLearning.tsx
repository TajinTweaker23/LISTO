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

export default function MedicalMicroLearning() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [learnedFacts, setLearnedFacts] = useState<number[]>([]);

  const currentFact = MEDICAL_FACTS[currentFactIndex];

  useEffect(() => {
    const saved = localStorage.getItem('learnedMedicalFacts');
    if (saved) {
      setLearnedFacts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % MEDICAL_FACTS.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const markAsLearned = (factId: number) => {
    const newLearned = [...learnedFacts, factId];
    setLearnedFacts(newLearned);
    localStorage.setItem('learnedMedicalFacts', JSON.stringify(newLearned));
  };

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % MEDICAL_FACTS.length);
  };

  const prevFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + MEDICAL_FACTS.length) % MEDICAL_FACTS.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Brain Rot Medical Learning
          </h2>
        </div>
        <p className="text-gray-600">
          Medical facts in TikTok-style format • MA-verified accuracy • Passive learning that actually sticks
        </p>
      </div>

      {/* Main Fact Card */}
      <motion.div
        key={currentFactIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentFact.category}
            </span>
            <span className="text-2xl">{currentFact.brainRotLevel}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-green-600 font-medium">{currentFact.accuracy}</div>
            <div className="text-xs text-gray-500">{currentFactIndex + 1} of {MEDICAL_FACTS.length}</div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
            {currentFact.fact}
          </h3>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
            <p className="text-gray-700 text-lg">
              {currentFact.funFact}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prevFact}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                isAutoPlay 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {isAutoPlay ? <Zap className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              {isAutoPlay ? 'Auto Playing' : 'Auto Play'}
            </button>

            {!learnedFacts.includes(currentFact.id) && (
              <button
                onClick={() => markAsLearned(currentFact.id)}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Got It!
              </button>
            )}
          </div>

          <button
            onClick={nextFact}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
          >
            Next →
          </button>
        </div>
      </motion.div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <Activity className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-800">{learnedFacts.length}</div>
          <div className="text-gray-600">Facts Learned</div>
        </div>

        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-800">{Math.round((learnedFacts.length / MEDICAL_FACTS.length) * 100)}%</div>
          <div className="text-gray-600">Completion Rate</div>
        </div>

        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-800">{MEDICAL_FACTS.length}</div>
          <div className="text-gray-600">Total Facts</div>
        </div>
      </div>
    </div>
  );
}
