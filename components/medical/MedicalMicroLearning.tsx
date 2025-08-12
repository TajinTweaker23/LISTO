const MEDICAL_MICRO_CONTENT = [
  {
    id: 1,
    category: 'Menstrual Health',
    title: 'Menstrual Cramps: More Than Just Discomfort',
    content: 'Menstrual cramps, also known as dysmenorrhea, can be a sign of underlying health issues like endometriosis or fibroids. It\'s not just pain; it\'s your body telling you something. Don\'t ignore it.',
    funFact: 'Some women have stronger uterine contractions during periods than during actual childbirth.',
    relatedToHealth: ['menstrual-pain', 'pain-management', 'reproductive-health'],
    brainRotLevel: 3,
    medicalAccuracy: 10,
    emoji: '😤',
    timeToRead: 30
  },
  {
    id: 2,
    category: 'Mental Health',
    title: 'Depression Isn\'t Just Sadness',
    content: 'Clinical depression literally changes your brain structure. The hippocampus shrinks, affecting memory. The prefrontal cortex gets sluggish, making decisions harder. It\'s not weakness; it\'s neurobiology.',
    funFact: 'Antidepressants work by helping your brain grow new neural connections (neuroplasticity).',
    relatedToHealth: ['depression', 'brain-health', 'mental-wellness'],
    brainRotLevel: 4,
    medicalAccuracy: 9,
    emoji: '🧠',
    timeToRead: 32
  },
  {
    id: 3,
    category: 'Nutrition',
    title: 'Your Gut Has More Neurons Than Your Spine',
    content: 'The enteric nervous system has 500 million neurons. That "gut feeling"? It\'s real. Your gut produces 95% of your serotonin. No wonder anxiety hits your stomach first.',
    funFact: 'Your gut bacteria can influence your mood, cravings, and even personality traits.',
    relatedToHealth: ['gut-health', 'mental-health', 'nutrition'],
    brainRotLevel: 5,
    medicalAccuracy: 10,
    emoji: '🦠',
    timeToRead: 28
  },
  {
    id: 4,
    category: 'Sleep',
    title: 'Sleep Debt Is Like Financial Debt',
    content: 'You can\'t just "catch up" on weekends. Sleep debt accumulates and compounds. Your brain literally shrinks when you\'re chronically sleep-deprived. The glymphatic system needs 7+ hours to clean out brain toxins.',
    funFact: 'After 17-19 hours without sleep, your performance equals someone legally drunk.',
    relatedToHealth: ['sleep-hygiene', 'brain-health', 'cognitive-function'],
    brainRotLevel: 4,
    medicalAccuracy: 10,
    emoji: '😴',
    timeToRead: 30
  },
  {
    id: 5,
    category: 'Pain Management',
    title: 'Chronic Pain Changes Your Brain Map',
    content: 'Neuroplasticity works both ways. Chronic pain rewires your brain, making you more sensitive to ALL pain. But the reverse is true too - the right treatments can retrain your brain to feel less pain.',
    funFact: 'Phantom limb pain proves pain is processed in the brain, not just at injury sites.',
    relatedToHealth: ['chronic-pain', 'neuroplasticity', 'pain-management'],
    brainRotLevel: 5,
    medicalAccuracy: 9,
    emoji: '⚡',
    timeToRead: 35
  },
  {
    id: 6,
    category: 'Hormones',
    title: 'Stress Hormones Are Prehistoric Software',
    content: 'Cortisol was designed for running from tigers, not dealing with your boss. Chronic activation shuts down digestion, immunity, and reproductive function. Your body thinks it\'s in constant danger.',
    funFact: 'Chronic stress can shrink your prefrontal cortex while enlarging your amygdala (fear center).',
    relatedToHealth: ['stress-management', 'hormones', 'mental-health'],
    brainRotLevel: 4,
    medicalAccuracy: 10,
    emoji: '🏃‍♀️',
    timeToRead: 29
  },
  {
    id: 7,
    category: 'Disease Prevention',
    title: 'Heart Disease Isn\'t Just Clogged Pipes',
    content: 'Sure, cholesterol matters. But chronic inflammation from stress, bad sleep, and processed foods is the real arsonist that lights the fire. Your arteries aren\'t just pipes, they\'re living tissue. Treat them well.',
    funFact: 'A 10-minute walk after meals can lower blood sugar and reduce inflammation. It\'s not about running a marathon, it\'s about consistency.',
    relatedToHealth: ['heart-health', 'inflammation', 'stress'],
    brainRotLevel: 4,
    medicalAccuracy: 9,
    emoji: '🔥',
    timeToRead: 25
  },
  {
    id: 8,
    category: 'Disease Prevention',
    title: 'Preventing Type 2 Diabetes Isn\'t Just About Sugar',
    content: 'It\'s about insulin resistance. Your cells get \'deaf\' to insulin\'s call. Lifting heavy things (even your own body) makes your muscles more sensitive to insulin, so they suck up sugar from your blood instead of letting it run wild.',
    funFact: 'Cinnamon in your coffee can improve insulin sensitivity. Small, consistent habits matter more than occasional crash diets.',
    relatedToHealth: ['diabetes-prevention', 'insulin-resistance', 'exercise'],
    brainRotLevel: 5,
    medicalAccuracy: 10,
    emoji: '💪',
    timeToRead: 28
  },
  {
    id: 9,
    category: 'Disease Prevention',
    title: 'Your Immune System Is Not a Fortress',
    content: 'It\'s a garden. You can\'t just build higher walls. You need to cultivate diverse, good bacteria (probiotics) and feed them with fiber (prebiotics). A healthy gut microbiome is your best defense, not just vitamin C.',
    funFact: '70-80% of your immune cells are located in your gut. A happy gut is a happy immune system.',
    relatedToHealth: ['immune-health', 'gut-health', 'nutrition'],
    brainRotLevel: 4,
    medicalAccuracy: 9,
    emoji: '🌿',
    timeToRead: 26
  }
];

import React, { useState, useEffect } from 'react';

export const MedicalMicroLearning: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userProgress, setUserProgress] = useState(new Set<number>());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % MEDICAL_MICRO_CONTENT.length);
      }, 15000); // 15 seconds per tip
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentContent = MEDICAL_MICRO_CONTENT[currentTip];

  const markAsRead = () => {
    const newProgress = new Set(userProgress);
    newProgress.add(currentContent.id);
    setUserProgress(newProgress);
    localStorage.setItem('medical-learning-progress', JSON.stringify(Array.from(newProgress)));
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % MEDICAL_MICRO_CONTENT.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + MEDICAL_MICRO_CONTENT.length) % MEDICAL_MICRO_CONTENT.length);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Brain Rot Medical Ed</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            MA Approved ✓
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              isPlaying ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className={`bg-purple-500 h-2 rounded-full transition-all duration-300`}
          style={{ width: `${(userProgress.size / MEDICAL_MICRO_CONTENT.length) * 100}%` }}
        />
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-lg p-4 shadow-md mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">{currentContent.emoji}</span>
          <div className="text-right">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {currentContent.category}
            </span>
            <div className="text-xs text-gray-500 mt-1">
              {currentContent.timeToRead}s read
            </div>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          {currentContent.title}
        </h3>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          {currentContent.content}
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
          <p className="text-xs text-yellow-700">
            <strong>🧠 Fun Fact:</strong> {currentContent.funFact}
          </p>
        </div>

        {/* Accuracy Rating */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <span>Medical Accuracy:</span>
            <div className="flex">
              {Array.from({ length: 10 }, (_, index) => (
                <span 
                  key={`accuracy-star-${currentContent.id}-${index}`} 
                  className={`w-2 h-2 rounded-full ${
                    index < currentContent.medicalAccuracy ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span>Brain Rot:</span>
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <span 
                  key={`brain-rot-${currentContent.id}-${index}`}
                  className={`text-sm ${
                    index < currentContent.brainRotLevel ? '🧠' : '🤍'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevTip}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
        >
          ← Previous
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {currentTip + 1} / {MEDICAL_MICRO_CONTENT.length}
          </span>
          {!userProgress.has(currentContent.id) && (
            <button
              onClick={markAsRead}
              className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-xs"
            >
              Mark Read
            </button>
          )}
        </div>
        
        <button
          onClick={nextTip}
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
        >
          Next →
        </button>
      </div>

      {/* Related Health Topics */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Related to your health tracking:</p>
        <div className="flex flex-wrap gap-1">
          {currentContent.relatedToHealth.map((topic) => (
            <span 
              key={topic}
              className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalMicroLearning;