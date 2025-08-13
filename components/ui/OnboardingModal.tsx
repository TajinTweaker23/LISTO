import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from './Mascot';

const steps = [
  {
    title: "Welcome to LISTO!",
    text: "Your new futuristic, personalized workspace. Let's take a quick tour.",
    icon: "🚀"
  },
  {
    title: "Command Palette",
    text: "Press Ctrl+K to open the command palette. Instantly access any feature.",
    icon: "⌨️"
  },
  {
    title: "Focus Mode",
    text: "Eliminate distractions and get in the zone. Toggle it with the top-left button.",
    icon: "🧘"
  },
  {
    title: "Customize Everything",
    text: "Click the settings gear to change fonts, colors, sounds, and more!",
    icon: "⚙️"
  }
];

type OnboardingModalProps = {
  show: boolean;
  onClose: () => void;
};

const OnboardingModal: React.FC<OnboardingModalProps> = ({ show, onClose }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white/10 dark:bg-[#232946]/60 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-cyan-400/20 dark:border-fuchsia-400/30 p-8 w-full max-w-md text-center relative"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <Mascot action="idle" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mt-10"
              >
                <div className="text-5xl mb-4">{steps[step].icon}</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{steps[step].title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{steps[step].text}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full mx-1 transition-all ${i === step ? 'bg-blue-500 scale-125' : 'bg-gray-400'}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold hover:scale-105 transition-transform"
            >
              {step === steps.length - 1 ? "Let's Go!" : "Next"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
