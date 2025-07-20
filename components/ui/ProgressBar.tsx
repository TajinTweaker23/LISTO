import { motion } from "framer-motion";
import React from "react";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  steps?: string[];
  currentStep?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = "default",
  size = "md",
  steps,
  currentStep = 0,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const variants = {
    default: "from-sage-500 to-sage-600",
    success: "from-green-500 to-green-600",
    warning: "from-yellow-500 to-yellow-600",
    error: "from-red-500 to-red-600",
  };

  const heights = {
    sm: "h-2",
    md: "h-4", 
    lg: "h-6",
  };

  if (steps && steps.length > 0) {
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-sage-700">{label}</span>
            <span className="text-sm text-sage-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                  index <= currentStep
                    ? "bg-sage-600 text-white border-sage-600"
                    : "bg-sage-100 text-sage-400 border-sage-200"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.div>
              {index < steps.length - 1 && (
                <div className="w-full h-1 bg-sage-200 mt-2">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${variants[variant]}`}
                    initial={{ width: 0 }}
                    animate={{ width: index < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-sage-600 mt-2">
          {steps.map((step, index) => (
            <span key={index} className={`text-center flex-1 ${
              index <= currentStep ? "font-medium" : "text-sage-400"
            }`}>
              {step}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-sage-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-sage-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-sage-200 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          className={`${heights[size]} bg-gradient-to-r ${variants[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
