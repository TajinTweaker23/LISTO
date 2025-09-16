import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaTimes } from "react-icons/fa";

const steps = [
  { title: "Welcome", content: "Let's get you started with LISTO." },
  { title: "Features", content: "Explore powerful tools for productivity." },
  { title: "Customize", content: "Tailor the app to your needs." },
  { title: "Done", content: "You're all set! Enjoy using LISTO." },
];

const EnhancedOnboardingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
            <div className="text-center">
              <motion.h2
                key={currentStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl font-bold text-gray-800 mb-4"
              >
                {steps[currentStep].title}
              </motion.h2>
              <motion.p
                key={currentStep + "content"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-gray-600 mb-8"
              >
                {steps[currentStep].content}
              </motion.p>
              <div className="flex justify-center mb-6">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full mx-1 ${idx === currentStep ? "bg-purple-500" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"} <FaArrowRight className="inline ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedOnboardingModal;