import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const initialSteps = [
  { title: "Welcome", content: "Let's get you started with LISTO.", action: "Create Your First Mood Board Item" },
];

const optionalSteps = [
  "Set Preferences",
  "Explore Features",
  "Complete Setup",
];

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showOptional, setShowOptional] = useState(false);

  const nextStep = () => {
    if (currentStep < initialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOptional(true);
    }
  };

  const handleAction = () => {
    // AI-personalized action, e.g., redirect to vision-board
    window.location.href = '/vision-board';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Welcome to LISTO</h2>
      <div className="space-y-4">
        {initialSteps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.2 }}
            className={`flex items-center gap-4 p-4 rounded-lg ${idx <= currentStep ? "bg-green-50 border-l-4 border-green-500" : "bg-gray-50"}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${idx < currentStep ? "bg-green-500 text-white" : idx === currentStep ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>
              {idx < currentStep ? <FaCheck /> : idx + 1}
            </div>
            <div>
              <span className={`font-medium ${idx <= currentStep ? "text-green-800" : "text-gray-600"}`}>{step.title}</span>
              <p className="text-sm text-gray-500">{step.content}</p>
              {idx === currentStep && (
                <button onClick={handleAction} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                  {step.action}
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {showOptional && (
          <div>
            <p className="text-center text-gray-600 mb-4">Want to learn more?</p>
            <button onClick={() => window.location.href = '/settings'} className="w-full bg-gray-200 text-gray-800 py-2 rounded">
              Learn More in Settings
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OnboardingFlow;