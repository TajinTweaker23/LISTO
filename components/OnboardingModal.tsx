import React, { useEffect, useRef, useState } from "react";
import AvatarPicker, { defaultAvatar } from "../components/AvatarPicker";
import { motion, AnimatePresence } from "framer-motion";

// Sound effect (put a short mp3 in /public/sounds/success.mp3)
const playSound = () => {
  const audio = new Audio("/sounds/success.mp3");
  audio.volume = 0.5;
  audio.play();
};

const steps = [
  { key: "welcome" },
  { key: "name" },
  { key: "avatar" },
  { key: "theme" },
  { key: "finish" },
];

// --- Seasonal/Easter Egg Vortex Themes ---
function getSeasonalVortexImages() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  // Halloween
  if (month === 9 && day >= 25 || month === 9 && day <= 31) {
    return ["🎃", "👻", "🦇", "🍬", "🕸️", "🧙‍♂️", "🧛‍♂️"];
  }
  // Christmas
  if (month === 11) {
    return ["🎄", "🎅", "🤶", "⛄", "❄️", "🦌", "🧦", "🎁"];
  }
  // New Year
  if (month === 0 && day <= 7) {
    return ["🎆", "🎉", "🥂", "🕛", "✨", "🎊"];
  }
  // Default/Brand
  return [
    <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#fbbf24"/><text x="24" y="30" textAnchor="middle" fontSize="24" fill="#fff">🚀</text></svg>,
    <svg width="48" height="48" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="8" fill="#6366f1"/><text x="24" y="32" textAnchor="middle" fontSize="24" fill="#fff">🎨</text></svg>,
    "🪐", "🌟", "✨", "🧠", "💡", "🎵", "📚", "🎲", "🦄", "🌈"
  ];
}

// --- Vortex Background with Gamified Progress & Accessibility ---
function VortexBackground({ step, finished, reduceMotion }: { step: number; finished: boolean; reduceMotion: boolean }) {
  const [tick, setTick] = useState(0);
  const [burst, setBurst] = useState(false);
  const vortexImages = getSeasonalVortexImages();

  // Gamified: More images as you progress
  const imagesToShow = finished ? vortexImages.length : Math.max(3, Math.floor(((step + 1) / steps.length) * vortexImages.length));

  useEffect(() => {
    if (finished) {
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
    }
  }, [finished]);

  useEffect(() => {
    if (!reduceMotion) {
      const interval = setInterval(() => setTick(t => t + 1), 40);
      return () => clearInterval(interval);
    }
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      style={{ filter: "blur(0.5px)" }}
    >
      {vortexImages.slice(0, imagesToShow).map((img, i) => {
        const t = (tick + i * 20) / 60;
        const angle = t + (i / vortexImages.length) * 2 * Math.PI;
        const radius = burst
          ? 320 + 120 * Math.sin(t + i)
          : 180 + 60 * Math.sin(t + i);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const scale = burst
          ? 1.5 + 0.7 * Math.sin(t + i)
          : 1 + 0.4 * Math.sin(t + i);
        const blur = 1 + 2 * Math.abs(Math.cos(angle));
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50vw + ${x}px - 32px)`,
              top: `calc(50vh + ${y}px - 32px)`,
              fontSize: 64 + (i % 3) * 12,
              opacity: 0.13 + 0.07 * Math.sin(t + i),
              filter: `blur(${blur}px)`,
              transform: `scale(${scale})`,
              zIndex: 0,
              userSelect: "none",
              pointerEvents: "none",
              transition: "filter 0.2s, opacity 0.2s, transform 0.2s"
            }}
          >
            {img}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function OnboardingModal({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: (avatar: any | null, theme?: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [theme, setTheme] = useState("bg-gradient-to-r from-blue-900 to-teal-600");
  const [finished, setFinished] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Show only once: check localStorage
  useEffect(() => {
    if (localStorage.getItem("seenOnboarding") === "true") {
      onClose();
    }
  }, [onClose]);

  // Accessibility: focus management
  useEffect(() => {
    if (steps[step].key === "name") inputRef.current?.focus();
  }, [step]);

  // Sound on finish
  useEffect(() => {
    if (finished && !reduceMotion) {
      playSound();
      setTimeout(() => setFinished(false), 1800);
    }
  }, [finished, reduceMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Trap focus inside modal
  useEffect(() => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    const handleTab = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors.join(','));
      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  // Step handlers
  const handleNext = () => {
    if (steps[step].key === "name") {
      if (name.trim().length < 2) {
        setError("Please enter your name.");
        inputRef.current?.focus();
        return;
      }
      setError("");
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = () => {
    localStorage.setItem("listoUserName", name.trim());
    if (avatar) localStorage.setItem("listoAvatar", JSON.stringify(avatar));
    localStorage.setItem("listoTheme", theme);
    localStorage.setItem("seenOnboarding", "true");
    setFinished(true);
    setTimeout(() => {
      onComplete(avatar, theme);
      onClose();
    }, 1200);
  };

  const handleSkip = () => {
    localStorage.setItem("seenOnboarding", "true");
    onComplete(null, theme);
    onClose();
  };

  // Progress calculation
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      {/* Vortex background */}
      <VortexBackground step={step} finished={finished} reduceMotion={reduceMotion} />

      <motion.div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full px-10 py-8 flex flex-col items-center relative z-50"
        role="document"
        initial={{ opacity: 0, scale: 0.92, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 60 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        {/* Accessibility Toggle */}
        <button
          className="absolute top-4 right-4 px-3 py-1 bg-gray-100 text-gray-700 rounded shadow text-xs hover:bg-gray-200 transition"
          onClick={() => setReduceMotion(r => !r)}
          aria-label={reduceMotion ? "Enable animations" : "Reduce motion / disable vortex"}
        >
          {reduceMotion ? "Enable Animations" : "Reduce Motion"}
        </button>
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {steps[step].key === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-8 text-center"
              aria-labelledby="onboarding-title"
              aria-describedby="onboarding-desc"
            >
              <h2
                id="onboarding-title"
                className="text-4xl font-poppins font-extrabold mb-3 tracking-tight bg-gradient-to-r from-blue-700 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
              >
                Welcome to LISTO!
              </h2>
              <p
                id="onboarding-desc"
                className="mb-8 text-lg text-gray-700 font-medium tracking-wide"
              >
                Let’s get you set up for your journey.
              </p>
              <div className="flex gap-4 w-full justify-center mb-4">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-lg"
                  onClick={handleNext}
                  aria-label="Start onboarding"
                >
                  Get Started
                </button>
                <button
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition font-semibold text-lg"
                  onClick={handleSkip}
                  aria-label="Skip onboarding"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}
          {/* Name Step */}
          {steps[step].key === "name" && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-8"
            >
              <label
                htmlFor="onboard-name"
                className="block text-2xl font-poppins font-bold mb-2 text-center text-blue-700 tracking-tight"
              >
                What should we call you?
              </label>
              <input
                ref={inputRef}
                id="onboard-name"
                type="text"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-center font-medium tracking-wide"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                aria-label="Your name"
                maxLength={32}
                onKeyDown={e => {
                  if (e.key === "Enter") handleNext();
                }}
              />
              {error && (
                <div className="text-red-500 text-sm mt-1 text-center">{error}</div>
              )}
              <div className="flex gap-4 justify-center mt-8">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  Next
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleBack}
                  aria-label="Back"
                  disabled={step === 0}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleSkip}
                  aria-label="Skip onboarding"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}
          {/* Avatar Step */}
          {steps[step].key === "avatar" && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="mb-6">
                <div className="flex flex-col items-center">
                  <p className="mb-2 font-semibold text-gray-800">
                    Choose your avatar{" "}
                    <span className="text-gray-500 font-normal">(optional)</span>
                  </p>
                  <div className="w-full flex flex-col items-center">
                    <AvatarPicker value={avatar} onChange={setAvatar} />
                    {!avatar && (
                      <div className="text-center text-gray-400 text-sm mt-4">
                        <span className="text-3xl block mb-2">🙂</span>
                        <span>
                          No avatar yet. You can always create one later from your
                          profile page!
                        </span>
                      </div>
                    )}
                    {avatar && (
                      <div className="mt-4 flex flex-col items-center">
                        <span className="text-3xl block mb-2">
                          {getAvatarSVG(avatar)}
                        </span>
                        <span className="text-xs text-gray-500">Looking good!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  Next
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleSkip}
                  aria-label="Skip onboarding"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}
          {/* Theme Step */}
          {steps[step].key === "theme" && (
            <motion.div
              key="theme"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-center">Pick a Profile Theme</h3>
              <div className="flex gap-2 flex-wrap justify-center mb-4">
                <button
                  className={`px-3 py-1 rounded ${theme === "bg-gradient-to-r from-blue-900 to-teal-600" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
                  onClick={() => setTheme("bg-gradient-to-r from-blue-900 to-teal-600")}
                  aria-label="Blue/Teal theme"
                >
                  Blue/Teal
                </button>
                <button
                  className={`px-3 py-1 rounded ${theme === "bg-gradient-to-r from-pink-500 to-yellow-300" ? "bg-pink-500 text-white" : "bg-white text-pink-500"}`}
                  onClick={() => setTheme("bg-gradient-to-r from-pink-500 to-yellow-300")}
                  aria-label="Pink/Yellow theme"
                >
                  Pink/Yellow
                </button>
                <button
                  className={`px-3 py-1 rounded ${theme === "bg-gradient-to-r from-green-400 to-blue-500" ? "bg-green-500 text-white" : "bg-white text-green-500"}`}
                  onClick={() => setTheme("bg-gradient-to-r from-green-400 to-blue-500")}
                  aria-label="Green/Blue theme"
                >
                  Green/Blue
                </button>
                <button
                  className={`px-3 py-1 rounded ${theme === "bg-gray-100" ? "bg-gray-400 text-white" : "bg-white text-gray-600"}`}
                  onClick={() => setTheme("bg-gray-100")}
                  aria-label="Minimal theme"
                >
                  Minimal
                </button>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  Next
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleSkip}
                  aria-label="Skip onboarding"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}
          {/* Finish Step */}
          {steps[step].key === "finish" && (
            <motion.div
              key="finish"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-poppins font-extrabold mb-2 bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                You're all set!
              </h2>
              <p className="mb-4 text-lg text-gray-700 font-medium">
                Welcome to <span className="font-bold text-blue-700">{name || "friend"}</span>!
              </p>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="flex justify-center mb-4"
              >
                {getAvatarSVG(avatar)}
              </motion.div>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold"
                onClick={handleFinish}
                aria-label="Finish onboarding"
              >
                Go to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Confetti overlay (optional, for visual delight) */}
        {finished && !reduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <span className="text-6xl animate-bounce">🎉</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}


