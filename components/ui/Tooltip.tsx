import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactElement;
  position?: "top" | "bottom" | "left" | "right" | "auto";
  delay?: number;
  maxWidth?: string;
  variant?: "default" | "info" | "warning" | "error" | "success";
  interactive?: boolean;
  arrow?: boolean;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "auto",
  delay = 300,
  maxWidth = "240px",
  variant = "default",
  interactive = false,
  arrow = true,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const variants = {
    default: "bg-gray-900 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-600 text-white", 
    error: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
  };

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (!interactive) {
      setIsVisible(false);
    }
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let finalPosition = position;
    
    if (position === "auto") {
      // Auto-position logic
      const spaceTop = triggerRect.top;
      const spaceBottom = viewport.height - triggerRect.bottom;
      const spaceRight = viewport.width - triggerRect.right;
      
      if (spaceTop >= tooltipRect.height + 8) {
        finalPosition = "top";
      } else if (spaceBottom >= tooltipRect.height + 8) {
        finalPosition = "bottom";
      } else if (spaceRight >= tooltipRect.width + 8) {
        finalPosition = "right";
      } else {
        finalPosition = "left";
      }
    }

    let x = 0, y = 0;

    switch (finalPosition) {
      case "top":
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case "bottom":
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.bottom + 8;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      case "right":
        x = triggerRect.right + 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
    }

    // Keep tooltip within viewport
    x = Math.max(8, Math.min(x, viewport.width - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, viewport.height - tooltipRect.height - 8));

    setCoords({ x, y });
    setCurrentPosition(finalPosition);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      
      const handleResize = () => calculatePosition();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleResize);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 transform rotate-45";
    let colorClass = "";
    if (variants[variant].includes("bg-gray-900")) {
      colorClass = "bg-gray-900";
    } else if (variants[variant].includes("bg-blue-600")) {
      colorClass = "bg-blue-600";
    } else if (variants[variant].includes("bg-yellow-600")) {
      colorClass = "bg-yellow-600";
    } else if (variants[variant].includes("bg-red-600")) {
      colorClass = "bg-red-600";
    } else {
      colorClass = "bg-green-600";
    }
    
    switch (currentPosition) {
      case "top":
        return `${baseClasses} ${colorClass} -bottom-1 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${baseClasses} ${colorClass} -top-1 left-1/2 -translate-x-1/2`;
      case "left":
        return `${baseClasses} ${colorClass} -right-1 top-1/2 -translate-y-1/2`;
      case "right":
        return `${baseClasses} ${colorClass} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return "";
    }
  };

  const childProps = {
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip();
      (children as any).props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      (children as any).props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip();
      (children as any).props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip();
      (children as any).props.onBlur?.(e);
    },
  };

  return (
    <>
      <span ref={triggerRef} style={{ display: "inline-block" }}>
        {React.cloneElement(children, childProps)}
      </span>
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className={`
                fixed z-50 px-3 py-2 text-sm font-medium rounded-lg shadow-lg
                ${variants[variant]}
                pointer-events-${interactive ? "auto" : "none"}
              `}
              style={{
                left: coords.x,
                top: coords.y,
                maxWidth,
              }}
              onMouseEnter={() => interactive && showTooltip()}
              onMouseLeave={() => interactive && hideTooltip()}
            >
              {content}
              {arrow && <div className={getArrowClasses()} />}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

// Progressive Onboarding Tooltip System
interface OnboardingStep {
  id: string;
  target: string;
  content: string | React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  action?: () => void;
}

interface OnboardingTooltipProps {
  steps: OnboardingStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  steps,
  currentStep,
  onNext,
  onPrev,
  onComplete,
  onSkip,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (!step) return;

    const targetElement = document.querySelector(step.target);
    if (!targetElement || !tooltipRef.current) return;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
    let y = step.position === "top" 
      ? targetRect.top - tooltipRect.height - 16
      : targetRect.bottom + 16;

    // Keep within viewport
    x = Math.max(16, Math.min(x, window.innerWidth - tooltipRect.width - 16));
    y = Math.max(16, Math.min(y, window.innerHeight - tooltipRect.height - 16));

    setCoords({ x, y });

    // Add highlight to target element
    const targetEl = targetElement as HTMLElement;
    targetEl.style.position = "relative";
    targetEl.style.zIndex = "51";
    targetEl.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.5)";
    targetEl.style.borderRadius = "8px";

    return () => {
      targetEl.style.position = "";
      targetEl.style.zIndex = "";
      targetEl.style.boxShadow = "";
      targetEl.style.borderRadius = "";
    };
  }, [step, currentStep]);

  if (!step) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onSkip}
      />
      
      {/* Tooltip */}
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm"
        style={{ left: coords.x, top: coords.y }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            Step {currentStep + 1} of {steps.length}
          </h3>
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            Skip tour
          </button>
        </div>
        
        <div className="mb-6 text-gray-700">
          {step.content}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            {!isFirstStep && (
              <button
                onClick={onPrev}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Previous
              </button>
            )}
            <button
              onClick={isLastStep ? onComplete : onNext}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Tooltip;
